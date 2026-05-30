# Git 工作流规则

## 提交代码

### 提交前检查

- 确保所有测试通过
- 检查代码格式符合项目规范
- 更新相关文档

### 提交信息规范

提交信息应清晰描述改动内容：
- 使用主动语态
- 简洁但信息完整
- 包含相关 issue 编号（如有）

示例：`fix: handle null reference in user service`

## 推送代码到 GitHub

**When pushing code to GitHub, always update README.md first.**

Before executing `git push`:
1. Analyze the current codebase structure and changes
2. Update README.md with:
   - Project description and features
   - Tech stack (dependencies and versions from package.json)
   - Directory structure and file purposes
   - Setup/installation instructions
   - Environment variables required
   - Available npm scripts
3. Commit the README.md update
4. Then proceed with push

This ensures documentation stays synchronized with code.

## 分支管理

- 使用 feature 分支开发新功能
- 定期从 main 分支同步更新
- 合并前进行代码审查