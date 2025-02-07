import Tree from "./tree.js"

// Test suite for the Tree class
console.log("Running Tree class tests...")

// Test 1: Build tree with sorted array
const testArray1 = [1, 2, 3, 4, 5, 6, 7]
const tree1 = new Tree(testArray1)
console.assert(tree1.root.data === 4, "Test 1 Failed: Root should be 4")
console.assert(
  tree1.root.left.data === 2,
  "Test 1 Failed: Root's left child should be 2"
)
console.assert(
  tree1.root.right.data === 6,
  "Test 1 Failed: Root's right child should be 6"
)

// Test 2: Build tree with unsorted array (duplicates should be removed)
const testArray2 = [7, 1, 5, 2, 3, 4, 7, 6, 5]
const tree2 = new Tree(testArray2)
console.assert(tree2.root.data === 4, "Test 2 Failed: Root should be 4")
console.assert(
  tree2.root.left.data === 2,
  "Test 2 Failed: Root's left child should be 2"
)
console.assert(
  tree2.root.right.data === 6,
  "Test 2 Failed: Root's right child should be 6"
)

// Test 3: Insert a new node
const tree3 = new Tree([1, 2, 3, 4, 5, 6, 7])
tree3.insert(8)
console.assert(
  tree3.find(8).data === 8,
  "Test 3 Failed: Node 8 should be inserted"
)
console.assert(
  tree3.root.right.right.right.data === 8,
  "Test 3 Failed: Node 8 should be at the correct position"
)

// Test 4: Insert a duplicate node (should not change the tree)
const tree4 = new Tree([1, 2, 3, 4, 5, 6, 7])
tree4.insert(4) // Inserting the root node's value
console.assert(tree4.root.data === 4, "Test 4 Failed: Root should still be 4")
console.assert(
  tree4.root.left.data === 2,
  "Test 4 Failed: Root's left child should still be 2"
)
console.assert(
  tree4.root.right.data === 6,
  "Test 4 Failed: Root's right child should still be 6"
)

// Test 5: Remove a leaf node
const tree5 = new Tree([1, 2, 3, 4, 5, 6, 7])
tree5.remove(1)
console.assert(
  tree5.find(1) === undefined,
  "Test 5 Failed: Node 1 should be removed"
)
console.assert(
  tree5.root.left.left === null,
  "Test 5 Failed: Root's left.left should be null"
)

// Test 6: Remove a node with one child
const tree6 = new Tree([1, 2, 3, 4, 5, 6, 7])
tree6.remove(2)
console.assert(
  tree6.find(2) === undefined,
  "Test 6 Failed: Node 2 should be removed"
)
console.assert(
  tree6.root.left.data === 3,
  "Test 6 Failed: Root's left should be 3"
)
console.assert(
  tree6.root.left.left.data === 1,
  "Test 6 Failed: Root's left.right should be 1"
)
// Test 7: Remove a node with two children
const tree7 = new Tree([1, 2, 3, 4, 5, 6, 7])
tree7.remove(4)
console.assert(
  tree7.find(4) === undefined,
  "Test 7 Failed: Node 4 should be removed"
)
console.assert(
  tree7.root.data === 5,
  "Test 7 Failed: Root should be 5 after removing 4"
)

// Test 8: Find an existing node
const tree8 = new Tree([1, 2, 3, 4, 5, 6, 7])
const foundNode = tree8.find(3)
console.assert(foundNode.data === 3, "Test 8 Failed: Should find node 3")

// Test 9: Find a non-existing node
const tree9 = new Tree([1, 2, 3, 4, 5, 6, 7])
const notFoundNode = tree9.find(8)
console.assert(
  notFoundNode === undefined,
  "Test 9 Failed: Should not find node 8"
)

// Test 10: Level Order traversal
const tree10 = new Tree([1, 2, 3, 4, 5])
const levelOrderResult = []
tree10.levelOrder((node) => levelOrderResult.push(node.data))
console.assert(
  levelOrderResult.join(",") === "3,1,4,2,5",
  `Test 10 Failed: Level Order traversal incorrect: ${levelOrderResult.join(
    ","
  )}`
)

// Test 11: In Order traversal
const tree11 = new Tree([1, 2, 3, 4, 5])
const inOrderResult = []
tree11.inOrder((node) => inOrderResult.push(node.data))
console.assert(
  inOrderResult.join(",") === "1,2,3,4,5",
  `Test 11 Failed: In Order traversal incorrect: ${inOrderResult.join(",")}`
)

// Test 12: Post Order traversal
const tree12 = new Tree([1, 2, 3, 4, 5])
const postOrderResult = []
tree12.postOrder((node) => postOrderResult.push(node.data))
console.assert(
  postOrderResult.join(",") === "2,1,5,4,3",
  `Test 12 Failed: Post Order traversal incorrect: ${postOrderResult.join(",")}`
)

// Test 13: Pre Order traversal
const tree13 = new Tree([1, 2, 3, 4, 5])
const preOrderResult = []
tree13.preOrder((node) => preOrderResult.push(node.data))
console.assert(
  preOrderResult.join(",") === "3,1,2,4,5",
  `Test 13 Failed: Pre Order traversal incorrect: ${preOrderResult.join(",")}`
)

// Test 14: Height of a node
const tree14 = new Tree([1, 2, 3, 4, 5, 6, 7])
const nodeToTest = tree14.find(2)
const heightOfNode = tree14.height(nodeToTest)
console.assert(
  heightOfNode === 0,
  `Test 14 Failed: Height of node incorrect: ${heightOfNode}`
)

// Test 15: Depth of a node
const tree15 = new Tree([1, 2, 3, 4, 5, 6, 7])
const nodeToTestDepth = tree15.find(6)
const depthOfNode = tree15.depth(nodeToTestDepth)
console.assert(
  depthOfNode === 1,
  `Test 15 Failed: Depth of node incorrect: ${depthOfNode}`
)

// Test 16: isBalanced - balanced tree
const tree16 = new Tree([1, 2, 3, 4, 5, 6, 7])
console.assert(
  tree16.isBalanced() === true,
  "Test 16 Failed: Tree should be balanced"
)

// Test 17: isBalanced - unbalanced tree
const tree17 = new Tree([1, 2, 3])
tree17.insert(4)
tree17.insert(5)
tree17.insert(6)
console.assert(
  tree17.isBalanced() === false,
  "Test 17 Failed: Tree should be unbalanced"
)

// Test 18: rebalance - rebalance an unbalanced tree
const tree18 = new Tree([1, 2, 3])
tree18.insert(4)
tree18.insert(5)
tree18.insert(6)
tree18.rebalance()
console.assert(
  tree18.isBalanced() === true,
  "Test 18 Failed: Tree should be balanced after rebalancing"
)

// Test 19: levelOrder throws error if callback is not a function
const tree19 = new Tree([1, 2, 3])
let errorThrown = false
try {
  tree19.levelOrder("not a function")
} catch (e) {
  errorThrown = true
}
console.assert(
  errorThrown,
  "Test 19 Failed: levelOrder should throw an error if callback is not a function"
)

// Test 20: inOrder throws error if callback is not a function
const tree20 = new Tree([1, 2, 3])
errorThrown = false
try {
  tree20.inOrder("not a function")
} catch (e) {
  errorThrown = true
}
console.assert(
  errorThrown,
  "Test 20 Failed: inOrder should throw an error if callback is not a function"
)

// Test 21: postOrder throws error if callback is not a function
const tree21 = new Tree([1, 2, 3])
errorThrown = false
try {
  tree21.postOrder("not a function")
} catch (e) {
  errorThrown = true
}
console.assert(
  errorThrown,
  "Test 21 Failed: postOrder should throw an error if callback is not a function"
)

// Test 22: preOrder throws error if callback is not a function
const tree22 = new Tree([1, 2, 3])
errorThrown = false
try {
  tree22.preOrder("not a function")
} catch (e) {
  errorThrown = true
}
console.assert(
  errorThrown,
  "Test 22 Failed: preOrder should throw an error if callback is not a function"
)

// Test 23: Height of an empty tree
const tree23 = new Tree([])
console.assert(
  tree23.height(tree23.root) === 0,
  "Test 23 Failed: Height of an empty tree should be 0"
)

// Test 24: Depth of root node
const tree24 = new Tree([1, 2, 3])
console.assert(
  tree24.depth(tree24.root) === 0,
  "Test 24 Failed: Depth of root node should be 0"
)

console.log("All tests completed.")
