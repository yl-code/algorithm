/*
 * @lc app=leetcode.cn id=993 lang=javascript
 *
 * [993] 二叉树的堂兄弟节点
 *
 * 思路：
 *    遍历树中的每个节点，记录下来两个目标节点的父节点和它的深度，最后比较一下就行
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
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
var isCousins = function (root, x, y) {
  let x_level;
  let y_level;
  let father = {};

  x_level = dfs(root, x, father);
  y_level = dfs(root, y, father);

  return x_level === y_level && father[x] !== father[y];
};

/**
 * 深度优先遍历
 *
 * @param {*} root 二叉树的根节点
 * @param {*} k 目标节点
 * @param {*} father 存放目标节点的父节点
 * @returns 在当前树中找到目标节点，则返回其深度，找不到则返回 -1
 */
const dfs = (root, k, father) => {
  if (!root) return -1;
  if (root.val === k) return 0; // 从当前目标节点开始，往上回溯的过程，累加得到目标节点的 深度

  father[k] = root.val; // 继续向下递归时，当前节点有可能是目标节点的父节点
  let l = dfs(root.left, k, father); // 如果左子树中找到了目标节点，那么 dfs 返回的就是左子节点，到目标节点的是深度
  if (l !== -1) return l + 1; // 返回当前节点到目标节点的深度

  father[k] = root.val; // 向下递归的过程中，father 一直被改变，这里重置为当前节点
  let r = dfs(root.right, k, father);
  if (r !== -1) return r + 1;

  return -1; // 这棵树找不到目标节点
};
// @lc code=end
