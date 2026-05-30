"use client"

import { ChatInterface } from "@/components/chat-interface"
import { Brain, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ChatPage() {
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
        <div className="mb-8 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold mb-2">AI 问答</h1>
            <p className="text-muted-foreground">
              基于您的知识库，向 AI 助手提问
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <ChatInterface />
        </div>
      </main>
    </div>
  )
}
