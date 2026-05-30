# 后端开发规则

## 技术栈

- **框架**: Next.js API Routes
- **数据库**: PostgreSQL with pgvector
- **ORM**: Drizzle ORM
- **AI**: OpenAI API (DeepSeek)
- **向量检索**: LangChain

## 文件结构

```
src/app/api/       # API routes
src/db/            # Database schema and connection
src/lib/           # Core logic (AI, embedding, vector store)
```

## 数据库规范

- 使用 Drizzle ORM 进行数据库操作
- 数据库模式定义在 `src/db/schema.ts`
- 使用 migrations 管理数据库变更
- 向量数据存储使用 pgvector 扩展

## API 开发规范

- 使用 Next.js API Routes
- 遵循 RESTful 设计原则
- 输入验证使用 Zod
- 错误处理和适当的 HTTP 状态码

## 安全注意事项

- 不要泄露敏感信息到日志
- API 密钥通过环境变量管理
- 验证用户输入，防止 SQL 注入
- 使用参数化查询

## 性能考虑

- 合理使用数据库索引
- 向量检索使用 pgvector 进行相似度匹配
- 考虑缓存策略减少 API 调用