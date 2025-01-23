# rain-tool

> vscode 插件，一些你可能需要的功能

## 1. Rain: add file header (cmd + Shift + P)

> 增加文件头信息

目前支持 vue javascript typescript python go html css scss less sass rust markdown

## 2. Rain: reload window (cmd + Shift + P)

> 重启 vscode 的 window，解决文件保存时的卡死问题

## 3. Rain: Add code Comment Template (cmd + Shift + P)

> 添加代码注释模板

目前支持 vue javascript typescript python bash go rust

* [x] 增加缩进识别
* [ ] 增加变量识别

## 4. Code Snippets

本插件提供了以下代码片段，可以通过输入对应的前缀触发：

### 通用代码片段

| 前缀 | 描述 | 说明 |
|------|------|------|
| `rainhelloWorld` | Hello World 测试片段 | 输出 "Hello World" |
| `rainlog` | 日志输出 | 带表情符号的 console.log 输出 |

### Vue 相关代码片段

| 前缀 | 描述 | 说明 |
|------|------|------|
| `rainvue` | Vue 基础模板 | 包含 template、script、style 的基础 Vue 组件模板 |
| `rainvuets` | Vue TypeScript 模板 | 基于 TypeScript 的 Vue 组件模板，使用 Class 风格 |
| `rainvuesetup` | Vue3 Setup 模板 | 使用 `<script setup>` 的 Vue3 组件模板 |


