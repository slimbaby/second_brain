import { NextRequest, NextResponse } from 'next/server'
import { db, schema } from '@/db'
import { searchRelevantChunks } from '@/lib/vector-store'
import { createChatCompletion } from '@/lib/ai'
import { desc, eq } from 'drizzle-orm'

const { conversations, messages } = schema

export async function POST(request: NextRequest) {
  try {
    const { message, conversationId } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    let convId = conversationId

    if (!convId) {
      const [newConv] = await db
        .insert(conversations)
        .values({ title: message.slice(0, 50) })
        .returning()
      convId = newConv.id
    }

    const relevantChunks = await searchRelevantChunks(message, 5)

    const context = relevantChunks
      .map((chunk) => `[${chunk.documentName}]: ${chunk.content}`)
      .join('\n\n')

    const systemMessage = `You are a helpful AI assistant answering questions based on the user's private knowledge base.
If the context contains relevant information, use it to answer the question.
If the context doesn't contain relevant information, say that you don't have enough information from the knowledge base.
Always be helpful and accurate.

Context from knowledge base:
${context || 'No relevant documents found in knowledge base.'}`

    const [userMsg] = await db
      .insert(messages)
      .values({
        conversationId: convId,
        role: 'user',
        content: message,
        contextDocuments: context ? JSON.stringify(relevantChunks) : null,
      })
      .returning()

    const allMessages = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, convId))
      .orderBy(messages.createdAt)

    const chatMessages = [
      { role: 'system', content: systemMessage },
      ...allMessages.map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    ]

    const completion = await createChatCompletion(chatMessages)
    const assistantContent = completion.choices[0]?.message?.content || ''

    const [assistantMsg] = await db
      .insert(messages)
      .values({
        conversationId: convId,
        role: 'assistant',
        content: assistantContent,
      })
      .returning()

    return NextResponse.json({
      response: assistantContent,
      conversationId: convId,
      messageId: assistantMsg.id,
      contextUsed: relevantChunks.length > 0,
    })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Chat failed' },
      { status: 500 }
    )
  }
}
