"use client"

import Link from "next/link"
import { Brain, FileText, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="border-b bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Second Brain</span>
          </div>
          <div className="flex gap-4">
            <Link href="/knowledge">
              <Button variant="outline">知识库管理</Button>
            </Link>
            <Link href="/chat">
              <Button>开始使用</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
            您的第二大脑
          </h1>
          <p className="text-2xl text-muted-foreground mb-12">
            基于 AI 的个人知识库系统，让您的知识活起来
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <FileText className="h-12 w-12 text-primary mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">智能文档管理</h3>
              <p className="text-muted-foreground">
                支持多种文档格式，自动化处理和向量化
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Brain className="h-12 w-12 text-primary mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">向量语义搜索</h3>
              <p className="text-muted-foreground">
                理解语义而非关键词，找到最相关的知识
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <MessageCircle className="h-12 w-12 text-primary mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">AI 智能问答</h3>
              <p className="text-muted-foreground">
                基于 DeepSeek V3 的强大语言模型
              </p>
            </div>
          </div>

          <div className="mt-16">
            <Link href="/chat">
              <Button size="lg" className="text-lg px-8">
                立即开始体验
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t bg-white/50 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>Second Brain - 您的个人 AI 知识助手</p>
        </div>
      </footer>
    </div>
  )
}
