/*!
 * Tree-MG v0.0.1
 * https://github.com/Sabrinayh5y/Tree-MG
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the ISC license
 * https://github.com/Sabrinayh5y/Tree-MG/license
 *
 * Date: 2023-8-26 10:53:57
 */
(function (global, factory) {

  "use strict";

  if (typeof module === "object" && typeof module.exports === "object") {

    // For CommonJS and CommonJS-like environments where a proper `window`
    // is present, execute the factory and get treeMgmt.
    // For environments that do not have a `window` with a `document`
    // (such as Node.js), expose a factory as module.exports.
    // This accentuates the need for the creation of a real `window`.
    // e.g. var treeMgmt = require("treeMgmt")(window);
    // See ticket trac-14549 for more info.
    module.exports = global.document ?
      factory(global, true) :
      function (w) {
        if (!w.document) {
          throw new Error("treeMgmt requires a window with a document");
        }
        return factory(w);
      };
  } else {
    factory(global);
  }

  // Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {

  // Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
  // throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
  // arguments.callee.caller (trac-13335). 
  "use strict";
  const treeMgmt = (treeNode, filterFn) => {
    /**
     * 合并新树
     */
    const combineNewTree = () => {
      const [lvIndex1, lvIndex2, lvIndex3] = parentIndexArry
      // 组成父辈节点路径
      if (lvIndex1 >= 0 && !newTreeNode[lvIndex1]) {
        newTreeNode[lvIndex1] = { ...treeNode[lvIndex1], children: [] }
      }
      if (lvIndex2 >= 0 && !newTreeNode[lvIndex1].children[lvIndex2]) {
        newTreeNode[lvIndex1].children[lvIndex2] = {
          ...treeNode[lvIndex1].children[lvIndex2],
          children: [],
        }
      }
      if (
        lvIndex3 >= 0 &&
        !newTreeNode[lvIndex1].children[lvIndex2].children[lvIndex3]
      ) {
        newTreeNode[lvIndex1].children[lvIndex2].children[lvIndex3] =
          treeNode[lvIndex1].children[lvIndex2].children[lvIndex3]
      }
    }
    let len = 0 // 过滤的节点个数
    let parentIndexArry = [] // 初始化下标数组 用于寻路如[0,1,2]代表0-1-2
    let lastNodeSnapshot = 0 // 上一次nodes的长度
    let currentChildLen = 0
    let lv = 0 // 当前层次，从1开始
    let newTreeNode = []
    const parentSiblingLenArry = [] // 初始化兄弟节点长度，用于对稀疏数组删除empty元素
    const fn = (node, nodes) => {
      const isLvUp = nodes.length >= lastNodeSnapshot
      if (isLvUp) {
        lv++
      } else if (--currentChildLen === 0) {
        lv--
      }
      const lvl1Len = treeNode.length
      parentSiblingLenArry[0] = lvl1Len
      if (nodes.length < lvl1Len - parentIndexArry[0] - 1) {
        // 根据队列长度变化得出此时切换至下一个二级子树
        lv = 1
      }
      parentIndexArry = parentIndexArry.slice(0, lv)
      if (parentIndexArry[lv - 1] === undefined) {
        parentIndexArry[lv - 1] = 0
      } else {
        parentIndexArry[lv - 1]++
      }
      if (node.children && node.children.length) {
        currentChildLen = node.children.length
        parentSiblingLenArry[lv] = currentChildLen
      }
      if (filterFn(node)) {
        len++
        combineNewTree(parentIndexArry)
      } else {
        // 从源数据中删除此节点，完成过滤
        // TODO
      }
      lastNodeSnapshot = nodes.length
      // 对稀疏数组删除empty
      const [lvIndex1, lvIndex2, lvIndex3] = parentIndexArry // 4 2 10
      const [, lvLen2, lvLen3] = parentSiblingLenArry // 13 3 11
      if (
        lvIndex3 >= 0 &&
        lvIndex3 === lvLen3 - 1 &&
        newTreeNode[lvIndex1]?.children[lvIndex2]?.children?.length
      ) {

        newTreeNode[lvIndex1].children[lvIndex2].children = newTreeNode[
          lvIndex1
        ].children[lvIndex2].children.filter((item) => !!item)
      }
      if (
        lvIndex2 >= 0 &&
        lvIndex2 === lvLen2 - 1 &&
        lvIndex3 === lvLen3 - 1 &&
        newTreeNode[lvIndex1]?.children?.length
      ) {
        newTreeNode[lvIndex1].children = newTreeNode[
          lvIndex1
        ].children.filter((item) => !!item)
      }
      if (nodes.length === 0) {
        newTreeNode = newTreeNode.filter((item) => !!item)
      }
      // 删除结束
      console.log('node parentIndexArry lv', node, parentIndexArry, lv)
    }
    // 深度优先遍历树
    DFSTree(treeNode, fn)
    console.log('len newTreeNode', len, newTreeNode)
    return treeNode
  }
  /**
   * 深度优先
   * @param {Object} tree 
   * @param {Function} fn 
   */
  const DFSTree = (tree, fn) => {
    let node
    const nodes = tree.slice()
    while ((node = nodes.shift())) {
      fn(node, nodes)
      if (node.children && node.children.length) {
        nodes.unshift(...node.children)
      }
    }
  }
  window.treeMgmt = treeMgmt
  return treeMgmt
});