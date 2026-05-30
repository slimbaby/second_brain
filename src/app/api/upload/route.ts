import { NextRequest, NextResponse } from 'next/server'
import { db, schema } from '@/db'
import { saveFile } from '@/lib/file-storage'
import { extractTextFromFile, chunkText } from '@/lib/text-processing'
import { generateEmbeddings } from '@/lib/embedding'
import { eq } from 'drizzle-orm'

const { documents, documentChunks } = schema

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const storagePath = await saveFile(buffer, file.name)

    const [doc] = await db
      .insert(documents)
      .values({
        name: file.name,
        type: file.type || 'application/octet-stream',
        size: file.size,
        storagePath,
        status: 'processing',
      })
      .returning()

    try {
      const text = await extractTextFromFile(buffer, file.type)
      const chunks = chunkText(text, { documentId: doc.id, filename: file.name })

      const [storedDoc] = await db
        .insert(documents)
        .values({
          id: doc.id,
          content: text.slice(0, 10000),
          status: 'processing',
        })
        .returning()

      const embeddings = await generateEmbeddings(chunks.map((c) => c.content))

      for (let i = 0; i < chunks.length; i++) {
        await db.insert(documentChunks).values({
          documentId: doc.id,
          content: chunks[i].content,
          chunkIndex: chunks[i].chunkIndex,
          embedding: embeddings[i],
          metadata: JSON.stringify(chunks[i].metadata),
        })
      }

      await db
        .update(documents)
        .set({ status: 'ready', updatedAt: new Date() })
        .where(eq(documents.id, doc.id))

      return NextResponse.json({
        success: true,
        document: {
          id: doc.id,
          name: file.name,
          chunks: chunks.length,
        },
      })
    } catch (processError) {
      await db
        .update(documents)
        .set({ status: 'failed', updatedAt: new Date() })
        .where(eq(documents.id, doc.id))

      throw processError
    }
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    )
  }
}
