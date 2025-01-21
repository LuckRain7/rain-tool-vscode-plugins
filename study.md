# my study

## 学习

### 1. 如何提前测试你的插件

> [Packaging extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#packaging-extensions)

1. `vsce package`
2. `code --install-extension rain-tool-0.0.8.vsix` or `code-insiders --install-extension rain-tool-0.0.1.vsix`

###  2. 设置代码片断

<https://code.visualstudio.com/api/references/contribution-points>

<https://code.visualstudio.com/docs/editor/userdefinedsnippets#_snippet-scope>

```json
"snippets": [
    // 只有 js 才会有的提示
    {
        "language": "javascript",
        "path": "./src/snippets/javascript.json"
    },
    {
        "language": "typescript",
        "path": "./src/snippets/typescript.json"
    },
    // 所有都可以用的
    {
        "path": "./src/snippets/snippets.code-snippets"
    }
]
```
