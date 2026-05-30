# 前端开发规则

## 技术栈

- **框架**: Next.js 16 with App Router
- **语言**: TypeScript
- **样式**: TailwindCSS 3
- **组件库**: shadcn/ui
- **图标**: Lucide React

## 文件结构

```
src/app/           # Next.js App Router routes
src/components/    # UI components
src/lib/           # Utility functions
```

## 组件开发规范

- 使用 TypeScript 进行类型定义
- 组件应具有良好的可复用性
- 使用 TailwindCSS 进行样式设计
- 遵循 shadcn/ui 组件模式

## 性能优化

- 使用 React.memo 优化不必要的重渲染
- 合理使用 Server Components
- 图片使用 Next.js Image 组件

## 代码风格

- 使用 PascalCase 命名组件
- 使用 camelCase 命名变量和函数
- 保持组件职责单一