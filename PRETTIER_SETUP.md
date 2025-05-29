# Prettier 代码格式化配置

本项目已经配置了 Prettier 代码格式化工具，确保代码风格的统一性。

## 配置文件

- `.prettierrc` - Prettier 配置文件
- `.prettierignore` - 忽略格式化的文件和目录
- `.vscode/settings.json` - VS Code 编辑器设置，启用保存时自动格式化
- `.husky/pre-commit` - Git 提交前钩子，自动格式化代码

## 使用方法

### 手动格式化

```bash
# 格式化整个项目
npm run format

# 检查代码格式（不修改文件）
npm run format:check
```

### 自动格式化

1. **VS Code 保存时自动格式化**

   - 确保安装了 `Prettier - Code formatter` 插件
   - 保存文件时会自动格式化

2. **Git 提交前自动格式化**
   - 每次执行 `git commit` 时会自动运行格式化
   - 格式化后的代码会自动添加到提交中

## Prettier 配置详情

当前配置:

- 使用分号结尾 (`semi: true`)
- 使用单引号 (`singleQuote: true`)
- 缩进 2 个空格 (`tabWidth: 2`)
- ES5 尾随逗号 (`trailingComma: "es5"`)
- 每行最大长度 100 字符 (`printWidth: 100`)
- 括号内空格 (`bracketSpacing: true`)
- 箭头函数参数括号避免单参数时使用 (`arrowParens: "avoid"`)
- Unix 换行符 (`endOfLine: "lf"`)
- JSX 中使用双引号 (`jsxSingleQuote: false`)
- JSX 标签闭合括号不与最后一行对齐 (`bracketSameLine: false`)

## 注意事项

- 所有新生成的代码都会自动应用这些格式化规则
- 提交代码前请确保运行了格式化
- 团队成员应该使用相同的 Prettier 配置以保持代码风格一致
