# 测试规则

## Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

## 测试最佳实践

- 编写测试用例前，明确测试目标和预期结果
- 使用描述性的测试名称
- 保持测试独立，避免测试间的依赖
- 测试应覆盖正常路径和边界条件
- 测试失败时提供清晰的错误信息