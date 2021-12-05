/*
 * @lc app=leetcode.cn id=103 lang=javascript
 *
 * [103] 二叉树的锯齿形层序遍历
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
var zigzagLevelOrder = function (root) {
  //该方法依次接受，根结点，树的层级，最后输出的结果，二维数组
  const getResult = (root, level, res) => {
    if (!root) return root;

    // 如果 res 的长度，与 level 相等
    // 说明 res 需要添加一个 数组 来存放当前层级的元素
    if (level === res.length) res.push([]);

    res[level].push(root.val);

    getResult(root.left, level + 1, res);
    getResult(root.right, level + 1, res);
  };

  const res = [];
  getResult(root, 0, res);

  // 偶数行数据倒序
  for (let i = 1; i < res.length; i += 2) {
    // if ((i + 1) % 2 === 0) {
    for (let m = 0, n = res[i].length - 1; m < n; m++, n--) {
      [res[i][m], res[i][n]] = [res[i][n], res[i][m]];
    }
    // }
  }

  return res;
};
// @lc code=end
