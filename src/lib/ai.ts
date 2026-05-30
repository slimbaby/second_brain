import OpenAI from 'openai'

const deepseek = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com',
})

export async function createChatCompletion(
  messages: OpenAI.Chat.ChatCompletionMessageParam[],
  model: string = process.env.AI_MODEL || 'deepseek-chat'
) {
  const completion = await deepseek.chat.completions.create({
    messages,
    model,
  })

  return completion
}

export async function createStreamingChatCompletion(
  messages: OpenAI.Chat.ChatCompletionMessageParam[],
  model: string = process.env.AI_MODEL || 'deepseek-chat',
  onChunk: (chunk: string) => void
) {
  const stream = await deepseek.chat.completions.create({
    messages,
    model,
    stream: true,
  })

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content
    if (content) {
      onChunk(content)
    }
  }
}

export { deepseek }
