import { Brain, FileUp, MessageCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
            Second Brain
          </h1>
          <p className="text-xl text-muted-foreground">
            您的 AI 驱动的个人知识库与问答系统
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <FileUp className="h-10 w-10 text-primary mb-2" />
              <CardTitle>文档上传</CardTitle>
              <CardDescription>
                支持 PDF、Word、TXT 等多种格式，一键上传即可
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Brain className="h-10 w-10 text-primary mb-2" />
              <CardTitle>向量存储</CardTitle>
              <CardDescription>
                先进的向量化技术，让搜索更智能、更准确
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <MessageCircle className="h-10 w-10 text-primary mb-2" />
              <CardTitle>AI 问答</CardTitle>
              <CardDescription>
                基于 DeepSeek V3 的智能问答，理解您的每一个问题
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            点击右上角的"开始使用"按钮，或访问 /knowledge 管理知识库
          </p>
        </div>
      </div>
    </div>
  )
}
