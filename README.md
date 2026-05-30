# Second Brain - 个人知识库对话系统

基于 Next.js 14、PostgreSQL + pgvector 和 DeepSeek V3 的 AI 驱动个人知识库系统。

## 🚀 功能特性

- 📄 **文档上传与管理** - 支持 PDF、Word、TXT、CSV 等格式
- 🔍 **向量语义搜索** - 基于 pgvector 的智能语义搜索
- 🤖 **AI 智能问答** - 基于 DeepSeek V3 的 RAG 问答系统
- 💻 **现代化 UI** - 基于 shadcn/ui 和 Tailwind CSS

## 🛠️ 技术栈

- **前端**: Next.js 14 (App Router), React 18, Tailwind CSS, shadcn/ui
- **后端**: Next.js API Routes, Drizzle ORM
- **数据库**: PostgreSQL + pgvector
- **AI**: DeepSeek V3, LangChain
- **部署**: Vercel Ready

## 📦 安装

### 1. 克隆项目

```bash
cd second_brain
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制 `.env.local.example` 为 `.env.local` 并配置：

```bash
cp .env.local.example .env.local
```

编辑 `.env.local`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/second_brain
DEEPSEEK_API_KEY=your-deepseek-api-key
DEEPSEEK_BASE_URL=https://api.deepseek.com
EMBEDDING_MODEL=text-embedding-3-small
AI_MODEL=deepseek-chat
```

### 4. 设置数据库

确保 PostgreSQL 已安装并运行，然后创建数据库：

```sql
CREATE DATABASE second_brain;
```

启用 pgvector 扩展：

```sql
\c second_brain
CREATE EXTENSION vector;
```

### 5. 运行数据库迁移

```bash
npm run db:push
```

### 6. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

## 📁 项目结构

```
second_brain/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API Routes
│   │   │   ├── chat/       # Chat API
│   │   │   ├── documents/  # Document management API
│   │   │   └── upload/     # File upload API
│   │   ├── (main)/         # Main pages
│   │   │   ├── chat/       # Chat page
│   │   │   ├── knowledge/  # Knowledge base page
│   │   │   └── page.tsx    # Landing page
│   │   ├── globals.css     # Global styles
│   │   └── layout.tsx      # Root layout
│   ├── components/         # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── chat-interface.tsx
│   │   ├── document-list.tsx
│   │   └── file-uploader.tsx
│   ├── db/                  # Database
│   │   ├── index.ts        # DB connection
│   │   └── schema.ts       # Drizzle schema
│   └── lib/                 # Utilities
│       ├── ai.ts           # DeepSeek integration
│       ├── embedding.ts    # Text embedding
│       ├── vector-store.ts # Vector search
│       └── text-processing.ts
├── drizzle.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🎯 使用流程

1. **访问首页** - http://localhost:3000
2. **上传文档** - 访问 /knowledge 上传 PDF、TXT 等文档
3. **等待处理** - 系统自动提取文本、向量化存储
4. **开始问答** - 访问 /chat 向 AI 提问

## 🔧 开发命令

```bash
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run start        # 启动生产服务器
npm run lint         # 运行 ESLint
npm run db:generate  # 生成 Drizzle 迁移
npm run db:push      # 推送 schema 到数据库
npm run db:studio    # 打开 Drizzle Studio
```

## 📝 环境变量说明

| 变量 | 说明 | 必填 |
|------|------|------|
| `DATABASE_URL` | PostgreSQL 连接字符串 | ✅ |
| `DEEPSEEK_API_KEY` | DeepSeek API 密钥 | ✅ |
| `DEEPSEEK_BASE_URL` | DeepSeek API 地址 | ✅ |
| `EMBEDDING_MODEL` |  embedding 模型 | ❌ |
| `AI_MODEL` | 聊天模型 | ❌ |

## 🔄 后续升级

- 支持切换不同的 LLM 提供商
- 支持更多文档格式
- 添加用户认证系统
- 支持多会话管理

## 📄 License

MIT
