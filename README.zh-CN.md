# Tree-Mgmt
提供对树格式数据的查找、修改、删除、编辑等操作

[English](./README.md) | **中文**

## 引入
1. esmodule

```js
import treeMgmt from 'tree-mgmt'
```

2. browser
```html
<script src="https://cdn.jsdelivr.net/npm/tree-mgmt"></script>
```

## api

```js
/*
 * 注意:
 * fcnMsgArry 是一个树形结构的数据，它有 fcnNm 和 children两个属性。
 * `fcnNm` 可以是任何其他字段, 而 `children` 是当前节点的孩子节点。
 */
import treeMgmt from 'tree-mgmt'
import fcnMsgArry from './fcnMsgArry.json'

const val = 'any val'
const filteredTree = treeMgmt(
    fcnMsgArry,
    (node) => node.fcnNm.includes(val),
  )
```

## dev

```
npm install
```

then

```
npm run dev
```

openpage: http://127.0.0.1:8080/test/usecase/demo.html

## build

```
npm run build
```