function Node(data, left = null, right = null) {
  return { data, left, right }
}

class Tree {
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
}

let t = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
// t.prettyPrint()
// t.remove(8)
// t.prettyPrint()
console.log(t.find(24))

// Iterative insert
// let node = this.root
// while (true) {
//   if (item === node.data) return
//   if (item < node.data && !node.left) {
//     node.left = Node(item)
//     return
//   }
//   if (item > node.data && !node.right) {
//     node.right = Node(item)
//     return
//   }
//   if (item < node.data) node = node.left
//   if (item > node.data) node = node.right
// }
