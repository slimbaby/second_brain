import fs from 'fs/promises'
import path from 'path'

export async function saveFile(
  buffer: Buffer,
  filename: string,
  directory: string = 'uploads'
): Promise<string> {
  const uploadDir = path.join(process.cwd(), directory)
  await fs.mkdir(uploadDir, { recursive: true })

  const uniqueFilename = `${Date.now()}-${filename}`
  const filePath = path.join(uploadDir, uniqueFilename)
  await fs.writeFile(filePath, buffer)

  return path.join(directory, uniqueFilename)
}

export async function deleteFile(filePath: string): Promise<void> {
  const fullPath = path.join(process.cwd(), filePath)
  await fs.unlink(fullPath)
}

export async function readFile(filePath: string): Promise<Buffer> {
  const fullPath = path.join(process.cwd(), filePath)
  return await fs.readFile(fullPath)
}
