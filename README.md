<p align="center">
  <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
    <img width="180" src="./split-table.svg" alt="Vite logo">
  </a>
</p>

# SplitTable中文文档
> SplitTable是一个用于分割HTML表格的工具集合

- 按需引入(支持esm)

## 安装
```bash
npm install split-table
```

## 基本使用
```javascript
import { splitTable } from 'split-table'

const tablePositions = splitTable(document.querySelector('table'))

console.log(tablePositions)

```

## 📝 如何参与贡献
如在使用中遇到任何问题可以提交issue，当然也欢迎直接贡献，步骤如下

```bash
git clone [rep]
pnpm install
pnpm run dev
```