/*
 * @lc app=leetcode.cn id=1302 lang=javascript
 *
 * [1302] 层数最深叶子节点的和
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
 * @return {number}
 */
var deepestLeavesSum = function (root) {
  let res = 0; // 最大深度节点的和值
  let maxDepth = 1; // 最大深度

  const traverseTree = (root, depth) => {
    if (!root) return;

    // 遇到不是叶子节点时，继续往下遍历
    if (root.left || root.right) {
      traverseTree(root.left, depth + 1);
      traverseTree(root.right, depth + 1);
    } else {
      // 遇到叶子节点时
      if (depth > maxDepth) {
        // 当前深度 depth 大于 记录的最大深度 maxDepth
        // 则更新 maxDepth，更新最大深度节点和值
        maxDepth = depth;
        res = root.val;
      } else if (depth === maxDepth) {
        // 当期深度 等于 最大深度，则累加 最大深度节点和值
        res += root.val;
      }
    }
  };

  traverseTree(root, maxDepth);
  return res;
};
// @lc code=end
