/*
 * @lc app=leetcode.cn id=450 lang=javascript
 *
 * [450] 删除二叉搜索树中的节点
 *
 * 思路：
 *    二叉搜索树中的基本操作
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
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function (root, key) {
  if (!root) return root;

  // 被删除节点在右子树中
  if (key > root.val) root.right = deleteNode(root.right, key);
  // 被删除节点在左子树中
  else if (key < root.val) root.left = deleteNode(root.left, key);
  else {
    // 被删除节点就是当前节点
    if (!root.left || !root.right) {
      // 度为 0 或 1
      return root.left ? root.left : root.right;
    } else {
      // 度为 2
      const preSuccessor = getPreSuccessor(root);
      root.val = preSuccessor.val; // 将前驱节点的值赋值给当前节点的值
      root.left = deleteNode(root.left, preSuccessor.val); // 问题转换为在当前节点左子树中删除前驱节点
    }
  }

  return root;
};

// 获取前驱节点
const getPreSuccessor = (root) => {
  let p = root.left;
  while (p.right) p = p.right;
  return p;
};
// @lc code=end
