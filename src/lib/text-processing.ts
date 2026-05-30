const CHUNK_SIZE = 500
const CHUNK_OVERLAP = 50

export interface TextChunk {
  content: string
  chunkIndex: number
  metadata?: Record<string, any>
}

export function chunkText(text: string, metadata?: Record<string, any>): TextChunk[] {
  const chunks: TextChunk[] = []
  const cleanedText = cleanText(text)

  if (cleanedText.length <= CHUNK_SIZE) {
    return [
      {
        content: cleanedText,
        chunkIndex: 0,
        metadata,
      },
    ]
  }

  const words = cleanedText.split(/\s+/)
  let currentChunk = ''
  let chunkIndex = 0

  for (let i = 0; i < words.length; i++) {
    const word = words[i]
    const potentialChunk = currentChunk ? `${currentChunk} ${word}` : word

    if (potentialChunk.length >= CHUNK_SIZE) {
      if (currentChunk) {
        chunks.push({
          content: currentChunk,
          chunkIndex,
          metadata,
        })
        chunkIndex++

        const lastWords = currentChunk.split(/\s+/).slice(-Math.floor(CHUNK_OVERLAP / 5))
        currentChunk = lastWords.join(' ') + ' ' + word
      } else {
        chunks.push({
          content: potentialChunk,
          chunkIndex,
          metadata,
        })
        chunkIndex++
        currentChunk = ''
      }
    } else {
      currentChunk = potentialChunk
    }
  }

  if (currentChunk.trim()) {
    chunks.push({
      content: currentChunk.trim(),
      chunkIndex,
      metadata,
    })
  }

  return chunks
}

function cleanText(text: string): string {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+/g, ' ')
    .trim()
}

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    const pdfParse = (await import('pdf-parse')).default
    const data = await pdfParse(buffer)
    return data.text
  } catch (error) {
    console.error('PDF parsing error:', error)
    throw new Error('Failed to parse PDF')
  }
}

export async function extractTextFromFile(
  buffer: Buffer,
  mimeType: string
): Promise<string> {
  switch (mimeType) {
    case 'application/pdf':
      return await extractTextFromPDF(buffer)

    case 'text/plain':
      return buffer.toString('utf-8')

    case 'text/csv':
      return buffer.toString('utf-8')

    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return buffer.toString('utf-8')

    default:
      return buffer.toString('utf-8')
  }
}
