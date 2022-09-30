/*
 * @lc app=leetcode.cn id=958 lang=javascript
 *
 * [958] 二叉树的完全性检验
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
 * @return {boolean}
 *
 *
 * 思路1:
 *    使用广搜的做法，其实就是层序遍历
 *    遇到空节点就停止遍历
 *    此时队列中除了 null，还有节点时，表示不是完全二叉树
 *
 */
var isCompleteTree = function (root) {
  const q = [root];

  while (q.length) {
    const node = q.shift();

    if (!node) break;

    q.push(node.left);
    q.push(node.right);
  }

  while (q.length) {
    if (q.shift()) return false;
  }

  return true;
};
// @lc code=end
