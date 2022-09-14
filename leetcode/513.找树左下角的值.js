/*
 * @lc app=leetcode.cn id=513 lang=javascript
 *
 * [513] 找树左下角的值
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
var findBottomLeftValue = function (root) {
  let max_k = -1;
  let val;

  /**
   * @param {*} root 树的根节点
   * @param {*} k 当前层级
   */
  const getVal = (root, k) => {
    if (!root) return;
    if (k > max_k) {
      // 仅 当前层级更大时 记录下来
      max_k = k;
      val = root.val;
    }

    getVal(root.left, k + 1); // 先遍历左子树
    getVal(root.right, k + 1);
  };

  getVal(root, 0);

  return val;
};

// @lc code=end
