import { NextRequest, NextResponse } from 'next/server'
import { getAllDocuments, deleteDocument as deleteDoc } from '@/lib/vector-store'

export async function GET() {
  try {
    const docs = await getAllDocuments()
    return NextResponse.json({ documents: docs })
  } catch (error) {
    console.error('Get documents error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to get documents' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Document ID required' }, { status: 400 })
    }

    await deleteDoc(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete document error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete document' },
      { status: 500 }
    )
  }
}
