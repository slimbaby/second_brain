import { db, schema } from '@/db'
import { eq, desc } from 'drizzle-orm'
import { generateEmbeddings } from './embedding'

const { documents, documentChunks } = schema

export interface SearchResult {
  chunkId: string
  documentId: string
  documentName: string
  content: string
  similarity: number
}

export async function searchRelevantChunks(
  query: string,
  topK: number = 5
): Promise<SearchResult[]> {
  const queryEmbedding = await generateEmbeddings([query])
  const queryVector = queryEmbedding[0]

  const results = await db
    .select()
    .from(documentChunks)
    .innerJoin(documents, eq(documentChunks.documentId, documents.id))
    .where(eq(documents.status, 'ready'))
    .orderBy(desc(documentChunks.createdAt))
    .limit(100)

  const chunksWithSimilarity = results
    .map((row) => {
      const embedding = row.document_chunks.embedding as number[]
      const similarity = cosineSimilarity(queryVector, embedding)
      return {
        chunkId: row.document_chunks.id,
        documentId: row.document_chunks.documentId,
        documentName: row.documents.name,
        content: row.document_chunks.content,
        similarity,
      }
    })
    .filter((r) => r.similarity > 0.5)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topK)

  return chunksWithSimilarity
}

function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0

  let dotProduct = 0
  let normA = 0
  let normB = 0

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
}

export async function getDocumentById(id: string) {
  const result = await db
    .select()
    .from(documents)
    .where(eq(documents.id, id))
    .limit(1)

  return result[0] || null
}

export async function getAllDocuments() {
  return await db.select().from(documents).orderBy(desc(documents.createdAt))
}

export async function deleteDocument(id: string) {
  await db.delete(documents).where(eq(documents.id, id))
}
