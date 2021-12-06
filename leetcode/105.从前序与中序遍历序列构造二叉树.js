/*
 * @lc app=leetcode.cn id=105 lang=javascript
 *
 * [105] 从前序与中序遍历序列构造二叉树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  if (!preorder.length) return null;

  // 首先找到，根据 前序遍历数组 中的第一位，也就是根节点，找到其在 中序遍历数组 中的位置
  let rootIndex = inorder.findIndex((curr) => curr === preorder[0]);
  if (rootIndex < 0) return null;

  // 根据 rootIndex 截取 前序遍历数组 中的左右子树序列
  let lPreorder = preorder.slice(1, rootIndex + 1);
  let rPreorder = preorder.slice(rootIndex + 1, preorder.length);

  // 根据 rootIndex 截取 中序遍历数组 中的左右子树序列
  let lInorder = inorder.slice(0, rootIndex);
  let rInorder = inorder.slice(rootIndex + 1, inorder.length);

  // 构建每棵子树的根结点
  let root = new TreeNode(preorder[0]);

  // 递归构建每棵子树的 左右子树
  root.left = buildTree(lPreorder, lInorder);
  root.right = buildTree(rPreorder, rInorder);

  return root;
};
// @lc code=end
