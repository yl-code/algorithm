/*
 * @lc app=leetcode.cn id=110 lang=javascript
 *
 * [110] 平衡二叉树
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
 */
var isBalanced = function (root) {
  // 定义一个递归函数，求树的高度
  // const getHeight = (root) => {
  //   if (!root) return 0;
  //   const left = getHeight(root.left);
  //   const right = getHeight(root.left);

  //   return Math.max(left, right) + 1;
  // };

  // 改写上面的树的功能
  // 若树是平衡树，返回其高度
  // 若树是不是平衡树，则返回 -1
  const getHeight = (root) => {
    if (!root) return 0;
    const left = getHeight(root.left);
    const right = getHeight(root.right);

    if (left < 0 || right < 0) return -1;
    if (Math.abs(left - right) > 1) return -1;

    return Math.max(left, right) + 1;
  };

  // 如果返回的结果是大于等于 0 的，则树是平衡二叉树
  return getHeight(root) >= 0;
};
// @lc code=end
