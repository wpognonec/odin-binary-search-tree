function Node(data, left = null, right = null) {
  return { data, left, right }
}

export default class Tree {
  constructor(items) {
    let sorted = Array.from(new Set(items)).sort((a, b) => a - b)
    this.root = this.buildTree(sorted, 0, sorted.length - 1)
  }

  buildTree(items, start, end) {
    if (start > end) return null
    let mid = Math.floor((start + end) / 2)
    let root = Node(items[mid])
    root.left = this.buildTree(items, start, mid - 1)
    root.right = this.buildTree(items, mid + 1, end)
    return root
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      )
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`)
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true)
    }
  }

  insert(item, root = this.root) {
    if (!root) return new Node(item)
    if (root.data === item) return root
    if (item < root.data) root.left = this.insert(item, root.left)
    else if (item > root.data) root.right = this.insert(item, root.right)
    return root
  }

  remove(item, root = this.root) {
    if (root === null) return root
    if (root.data > item) {
      root.left = this.remove(item, root.left)
    } else if (root.data < item) {
      root.right = this.remove(item, root.right)
    } else {
      if (root.left === null) return root.right
      if (root.right === null) return root.left
      let successor = this.getSuccessor(root)
      root.data = successor.data
      root.right = this.remove(successor.data, root.right)
    }
    return root
  }

  find(value) {
    let node = this.root
    while (true) {
      if (value === node.data) return node
      else if (value < node.data && node.left) node = node.left
      else if (value > node.data && node.right) node = node.right
      else return undefined
    }
  }

  getSuccessor(curr) {
    curr = curr.right
    while (curr !== null && curr.left !== null) {
      curr = curr.left
    }
    return curr
  }

  levelOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("Please provide a callback function")
    }

    let q = [this.root]
    while (q.length) {
      let node = q.splice(0, 1)[0]
      callback(node)
      if (node?.left) q.push(node.left)
      if (node?.right) q.push(node.right)
    }
  }

  inOrder(callback, node = this.root) {
    if (typeof callback !== "function") {
      throw new Error("Please provide a callback function")
    }
    if (!node) return
    this.inOrder(callback, node.left)
    callback(node)
    this.inOrder(callback, node.right)
  }

  postOrder(callback, node = this.root) {
    if (typeof callback !== "function") {
      throw new Error("Please provide a callback function")
    }
    if (!node) return
    this.postOrder(callback, node.left)
    this.postOrder(callback, node.right)
    callback(node)
  }

  preOrder(callback, node = this.root) {
    if (typeof callback !== "function") {
      throw new Error("Please provide a callback function")
    }
    if (!node) return
    callback(node)
    this.preOrder(callback, node.left)
    this.preOrder(callback, node.right)
  }

  height(node) {
    if (!node) return 0
    if (!node.left && !node.right) return -1
    let leftHeight = this.height(node.left)
    let rightHeight = this.height(node.right)

    return 1 + Math.max(leftHeight, rightHeight)
  }

  depth(target, root = this.root, currentDept = 0) {
    if (!root) return -1
    if (root == target) return currentDept
    let leftDepth = this.depth(target, root.left, currentDept + 1)
    if (leftDepth != -1) return leftDepth
    let rightDepth = this.depth(target, root.right, currentDept + 1)
    if (rightDepth != -1) return rightDepth
    return -1
  }

  isBalanced() {
    let bool = true
    this.inOrder((n) => {
      let l = this.height(n.left)
      let r = this.height(n.right)
      if (Math.abs(l - r) > 1) bool = false
    })
    return bool
  }

  rebalance() {
    let sorted = []
    this.inOrder((n) => sorted.push(n.data))
    this.root = this.buildTree(sorted, 0, sorted.length - 1)
  }
}
