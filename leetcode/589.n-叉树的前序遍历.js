/*
 * @lc app=leetcode.cn id=589 lang=javascript
 *
 * [589] N 叉树的前序遍历
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[]}
 */
var preorder = function (root) {
  let res = [];

  const _preorder = (root) => {
    if (!root) return;
    res.push(root.val);

    root.children.forEach((node) => {
      _preorder(node);
    });
  };

  _preorder(root);
  return res;
};
// @lc code=end
