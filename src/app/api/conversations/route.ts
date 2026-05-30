import { NextRequest, NextResponse } from 'next/server'
import { db, schema } from '@/db'
import { eq, desc } from 'drizzle-orm'

const { conversations, messages } = schema

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      const allConversations = await db
        .select()
        .from(conversations)
        .orderBy(desc(conversations.updatedAt))

      return NextResponse.json({ conversations: allConversations })
    }

    const conversationMessages = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, id))
      .orderBy(messages.createdAt)

    const [conversation] = await db
      .select()
      .from(conversations)
      .where(eq(conversations.id, id))
      .limit(1)

    return NextResponse.json({
      conversation,
      messages: conversationMessages,
    })
  } catch (error) {
    console.error('Get conversations error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to get conversations' },
      { status: 500 }
    )
  }
}
