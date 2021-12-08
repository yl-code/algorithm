/**
 *
 * 题目：根据 ./pre-in-order.txt 文件中记录的 二叉树的 前序遍历序列 与 中序遍历序列，还原一颗二叉树
 *      然后求出该树的 后序遍历序列，从 1 开始给 后序遍历序列 依次编号，最后求所有编号与其节点乘积的 和
 *
 */

function TreeNode(val, left, right) {
  this.val = val;
  this.left = left;
  this.right = right;
}

const buildTree = (preorder, inorder) => {
  if (!preorder.length) return null;

  let index = inorder.findIndex((i) => i === preorder[0]);
  if (index < 0) return null;

  let leftPre = preorder.slice(1, index + 1);
  let rightPre = preorder.slice(index + 1, preorder.length);
  let leftIn = inorder.slice(0, index);
  let rightIn = inorder.slice(index + 1, inorder.length);

  let root = new TreeNode(preorder[0]);
  root.left = buildTree(leftPre, leftIn);
  root.right = buildTree(rightPre, rightIn);

  return root;
};

const getPostorder = (root, res) => {
  if (!root) return;

  getPostorder(root.left, res);
  getPostorder(root.right, res);
  res.push(root.val);
};

const fs = require("fs");
const data = fs.readFileSync("./pre-in-order.txt", "utf-8");
let [preorder, inorder] = data.split("中序：\n");
preorder = preorder
  .replace("前序：\n", "")
  .split(" ")
  .filter((i) => !!i)
  .map((i) => +i.replace("\n", ""));
inorder = inorder
  .split(" ")
  .filter((i) => !!i)
  .map((i) => +i);

let tree = buildTree(preorder, inorder);
let postorder = [];
getPostorder(tree, postorder);
let sum = 0;

for (let i = 0; i < postorder.length; i++) {
  sum += postorder[i] * (i + 1);
}

console.log(preorder, inorder, postorder, sum); // 6756418380
