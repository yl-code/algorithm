/*
 * @lc app=leetcode.cn id=107 lang=javascript
 *
 * [107] 二叉树的层序遍历 II
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
 * @return {number[][]}
 */
var levelOrderBottom = function (root) {
  /**
   *
   * @param {*} root 根节点
   * @param {*} k 树的层级
   * @param {*} res 输出的结果，二维数组，[[], []]
   */
  const getResult = (root, k, res) => {
    if (!root) return root;
    // 如果当前层级，与 res 的长度 相等
    // 那么就需要增加一个数组来存放 当前层级的节点
    // 题目要求是倒序输出，层序遍历，所以每次添加数组用的是 unshift，然后每次都是 res[0].push
    if (k === res.length) res.push([]);

    res[k].push(root.val);

    getResult(root.left, k + 1, res);
    getResult(root.right, k + 1, res);
  };

  let res = [];
  getResult(root, 0, res);

  // 翻转数组
  for (let i = 0, j = res.length - 1; i < j; i++, j--) {
    [res[i], res[j]] = [res[j], res[i]];
  }

  return res;
};
// @lc code=end
