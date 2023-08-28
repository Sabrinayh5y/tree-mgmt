/**
 * Main function of tree
 * @param treeNode tree data
 * @param filterFn filter function
 * @returns the filtered tree
 */
const treeMgmt = (treeNode: any[], filterFn: { (node: any): Boolean; }) => {
  /**
   * Merge the new tree
   */
  const combineNewTree = () => {
    const [lvIndex1, lvIndex2, lvIndex3] = parentIndexArry
    // Compose the parent node path
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
  // Number of nodes filtered
  let len = 0
  // Initializes an array of subscripts for pathfinding such as [0,1,2] for 0-1-2
  let parentIndexArry = []
  // The length of the last node
  let lastNodeSnapshot = 0
  let currentChildLen = 0
  // Current level, starting from 1
  let lv = 0
  let newTreeNode = []
  // Initializes the length of the sibling node used to remove empty elements from a sparse array
  const parentSiblingLenArry = []
  const fn = (node: { children: any[]; }, nodes: any[]) => {
    const isLvUp = nodes.length >= lastNodeSnapshot
    if (isLvUp) {
      lv++
    } else if (--currentChildLen === 0) {
      lv--
    }
    const lvl1Len = treeNode.length
    parentSiblingLenArry[0] = lvl1Len
    if (nodes.length < lvl1Len - parentIndexArry[0] - 1) {
      // According to the change of queue length, we can switch to the next sub-tree
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
      combineNewTree()
    } else {
      // Sometimes you need remove this node from the source data to complete the filtering
      // TODO
    }
    lastNodeSnapshot = nodes.length
    // Delete empty for a sparse array
    const [lvIndex1, lvIndex2, lvIndex3] = parentIndexArry // 4 2 10
    const [, lvLen2, lvLen3] = parentSiblingLenArry // 13 3 11
    if (
      lvIndex3 >= 0 &&
      lvIndex3 === lvLen3 - 1 &&
      newTreeNode[lvIndex1]?.children[lvIndex2]?.children?.length
    ) {

      newTreeNode[lvIndex1].children[lvIndex2].children = newTreeNode[
        lvIndex1
      ].children[lvIndex2].children.filter((item: any) => !!item)
    }
    if (
      lvIndex2 >= 0 &&
      lvIndex2 === lvLen2 - 1 &&
      lvIndex3 === lvLen3 - 1 &&
      newTreeNode[lvIndex1]?.children?.length
    ) {
      newTreeNode[lvIndex1].children = newTreeNode[
        lvIndex1
      ].children.filter((item: any) => !!item)
    }
    if (nodes.length === 0) {
      newTreeNode = newTreeNode.filter((item) => !!item)
    }
    // End of deletion
    console.log('node parentIndexArry lv', node, parentIndexArry, lv)
  }
  // Call Depth-First-Traversal of the tree
  DFSTree(treeNode, fn)
  console.log('len newTreeNode', len, newTreeNode)
  return newTreeNode
}
/**
 * Depth-First-Traversal
 * @param {Array} tree 
 * @param {Function} fn 
 */
const DFSTree = (tree: any[], fn: { (node: any, nodes: any[]): void; }) => {
  let node: { children: any[]; }
  const nodes = tree.slice()
  while ((node = nodes.shift())) {
    fn(node, nodes)
    if (node.children && node.children.length) {
      nodes.unshift(...node.children)
    }
  }
}

export default treeMgmt