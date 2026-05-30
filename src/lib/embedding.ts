import { OpenAIEmbeddings } from '@langchain/openai'

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.DEEPSEEK_API_KEY,
  baseUrl: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com',
  model: process.env.EMBEDDING_MODEL || 'text-embedding-3-small',
})

export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const embedding = await embeddings.embedQuery(text)
    return embedding
  } catch (error) {
    console.error('Embedding generation error:', error)
    throw new Error('Failed to generate embedding')
  }
}

export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  try {
    const results = await embeddings.embedDocuments(texts)
    return results
  } catch (error) {
    console.error('Batch embedding generation error:', error)
    throw new Error('Failed to generate embeddings')
  }
}

export { embeddings }
