# Second Brain - 个人知识库对话系统

基于 Next.js 16、PostgreSQL + pgvector 和 DeepSeek 的 AI 驱动个人知识库系统。

## 🚀 功能特性

- 📄 **文档上传与管理** - 支持 PDF、Word、TXT、CSV 等格式
- 🔍 **向量语义搜索** - 基于 pgvector 的智能语义搜索
- 🤖 **AI 智能问答** - 基于 DeepSeek 的 RAG 问答系统
- 💻 **现代化 UI** - 基于 shadcn/ui 和 Tailwind CSS

## 🛠️ 技术栈

| 分类 | 技术 | 版本 |
|------|------|------|
| **前端框架** | Next.js | 16.2.0 |
| **UI 框架** | React | 19.0.0 |
| **样式** | Tailwind CSS | 3.4.17 |
| **组件库** | shadcn/ui | - |
| **数据库** | PostgreSQL + pgvector | - |
| **ORM** | Drizzle ORM | 0.38.0 |
| **AI 服务** | DeepSeek API | - |
| **向量处理** | LangChain | 0.3.0 |
| **构建工具** | Turbopack | - |

## 📦 安装

### 1. 克隆项目

```bash
git clone https://github.com/slimbaby/second_brain.git
cd second_brain
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 配置环境变量

复制 `.env.local.example` 为 `.env.local` 并配置：

```bash
copy .env.local.example .env.local  # Windows
# 或
cp .env.local.example .env.local     # Linux/Mac
```

编辑 `.env.local`:

```env
# 数据库配置
DATABASE_URL=postgresql://postgres:123456@localhost:5432/chatbot

# AI 配置
DEEPSEEK_API_KEY=your-deepseek-api-key
DEEPSEEK_BASE_URL=https://api.deepseek.com

# 可选配置
AI_MODEL=deepseek-chat
EMBEDDING_MODEL=text-embedding-3-small
```

### 4. 设置数据库（Docker）

使用带 pgvector 的 PostgreSQL 容器：

```bash
docker run -d \
  --name chatbot-postgres \
  -e POSTGRES_PASSWORD=123456 \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=chatbot \
  -p 5432:5432 \
  pgvector/pgvector:pg16
```

启用 pgvector 扩展：

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

### 5. 运行数据库迁移

```bash
pnpm db:generate  # 生成迁移文件（首次）
pnpm db:migrate   # 执行迁移
```

### 6. 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:3000

## 📁 项目结构

```
second_brain/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API Routes
│   │   │   ├── chat/       # Chat API
│   │   │   ├── conversations/  # Conversation API
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
│   │   ├── file-uploader.tsx
│   │   └── providers.tsx
│   ├── db/                  # Database
│   │   ├── index.ts        # DB connection
│   │   └── schema.ts       # Drizzle schema
│   └── lib/                 # Utilities
│       ├── ai.ts           # DeepSeek integration
│       ├── embedding.ts    # Text embedding
│       ├── vector-store.ts # Vector search
│       ├── text-processing.ts
│       ├── file-storage.ts
│       └── utils.ts
├── .claude/rules/           # Project rules
├── drizzle.config.ts        # Drizzle configuration
├── next.config.js           # Next.js configuration
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🎯 使用流程

1. **访问首页** - http://localhost:3000
2. **上传文档** - 访问 `/knowledge` 上传 PDF、TXT 等文档
3. **等待处理** - 系统自动提取文本、向量化存储
4. **开始问答** - 访问 `/chat` 向 AI 提问

## 🔧 开发命令

```bash
pnpm dev          # 启动开发服务器（Turbopack）
pnpm build        # 构建生产版本
pnpm start        # 启动生产服务器
pnpm lint         # 运行 ESLint
pnpm db:generate  # 生成 Drizzle 迁移
pnpm db:migrate   # 执行数据库迁移
pnpm db:push      # 推送 schema 到数据库
pnpm db:studio    # 打开 Drizzle Studio
```

## 📝 环境变量说明

| 变量 | 说明 | 必填 |
|------|------|------|
| `DATABASE_URL` | PostgreSQL 连接字符串 | ✅ |
| `DEEPSEEK_API_KEY` | DeepSeek API 密钥 | ✅ |
| `DEEPSEEK_BASE_URL` | DeepSeek API 地址 | ✅ |
| `EMBEDDING_MODEL` | 嵌入模型名称 | ❌ |
| `AI_MODEL` | 聊天模型名称 | ❌ |

## 📋 项目规则

项目规则文件位于 `.claude/rules/` 目录：

- `coding-style.md` - 代码风格规则
- `testing.md` - 测试规则
- `git-workflow.md` - Git 工作流规则
- `frontend.md` - 前端开发规则
- `backend.md` - 后端开发规则

## 🔄 后续升级

- [ ] 支持切换不同的 LLM 提供商
- [ ] 支持更多文档格式（Excel、Markdown 等）
- [ ] 添加用户认证系统
- [ ] 支持多会话管理
- [ ] 添加文档预览功能

## 📄 License

MIT