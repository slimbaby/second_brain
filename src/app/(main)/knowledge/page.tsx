"use client"

import { FileUploader } from "@/components/file-uploader"
import { DocumentList } from "@/components/document-list"
import { Brain, Upload, Files } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function KnowledgePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Second Brain</span>
          </Link>
          <div className="flex gap-4">
            <Link href="/knowledge">
              <Button variant="outline">知识库</Button>
            </Link>
            <Link href="/chat">
              <Button>AI 问答</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">知识库管理</h1>
          <p className="text-muted-foreground">
            上传和管理您的文档，构建个人知识库
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              <h2 className="text-xl font-semibold">上传文档</h2>
            </div>
            <FileUploader />
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Files className="h-5 w-5" />
              <h2 className="text-xl font-semibold">文档列表</h2>
            </div>
            <DocumentList />
          </div>
        </div>
      </main>
    </div>
  )
}
