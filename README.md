# Tree-Mgmt
Provides tree format data to find, modify, delete, edit and other operations

**English** | [中文](./README.zh-CN.md)

## import
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
 * Note:
 * fcnMsgArry is a tree-structured data that has two properties: fcnNm and children.
 * `fcnNm` can be replaced with any field value, while `children` link to his children node.
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