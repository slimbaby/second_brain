@echo off
echo ===================================
echo Second Brain - 项目初始化脚本
echo ===================================
echo.

echo [1/5] 安装依赖...
call npm install
if %errorlevel% neq 0 (
    echo ❌ 依赖安装失败
    exit /b 1
)
echo ✅ 依赖安装完成
echo.

echo [2/5] 检查 PostgreSQL 连接...
echo 请确保：
echo   1. PostgreSQL 已安装并运行
echo   2. 已创建数据库：CREATE DATABASE second_brain;
echo   3. 已启用扩展：CREATE EXTENSION vector;
echo.
set /p CONTINUE="继续请按 Enter，或按 Ctrl+C 取消"
echo.

echo [3/5] 复制环境变量文件...
if exist .env.local (
    echo ⚠️  .env.local 已存在，跳过
) else (
    copy .env.local.example .env.local
    echo ✅ 已创建 .env.local
    echo ⚠️  请编辑 .env.local 配置数据库连接和 API 密钥
)
echo.

echo [4/5] 推送数据库 Schema...
call npm run db:push
if %errorlevel% neq 0 (
    echo ⚠️  数据库推送失败，请检查 .env.local 配置
) else (
    echo ✅ 数据库 Schema 推送完成
)
echo.

echo [5/5] 初始化完成！
echo.
echo ===================================
echo 下一步：
echo   1. 编辑 .env.local 配置 DEEPSEEK_API_KEY
echo   2. 运行 npm run dev 启动开发服务器
echo   3. 访问 http://localhost:3000
echo ===================================
echo.

pause
