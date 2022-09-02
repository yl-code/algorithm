/*
 * @lc app=leetcode.cn id=979 lang=javascript
 *
 * [979] 在二叉树中分配硬币
 *
 * 思路：
 *    一颗二叉树，与外部移动硬币最少次数，一定是其节点数与硬币数差值的绝对值
 *    如题目示例1，二叉树中序 [3, 0, 0]
 *        左右子树为满足条件，与根节点需要交换的硬币数量均为 1，那么左右子树需要移动硬币次数最少需要 1+1 = 2
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
var distributeCoins = function (root) {
  const [res] = getResult(root);
  return res;
};

/**
 *
 * @param {*} root 二叉树根节点
 * @returns [整棵树内部硬币移动次数，二叉树中节点的总数量，二叉树中硬币的总数量]
 */
const getResult = (root) => {
  if (!root) return [0, 0, 0];

  let res = 0; // 当前子树的硬币移动次数
  let count = 1; // 当前子树，初始节点数
  let num = root.val; // 当前子树，初始硬币数

  const [res_l, count_l, num_l] = getResult(root.left); // 左子树内部硬币移动的次数
  res += res_l;
  res += Math.abs(count_l - num_l); // 根节点与左子树之间硬币的移动次数

  const [res_r, count_r, num_r] = getResult(root.right); // 右子树内部硬币移动的次数
  res += res_r;
  res += Math.abs(count_r - num_r); // 根节点与右子树之间硬币的移动次数

  return [res, count + count_l + count_r, num + num_l + num_r];
};

// @lc code=end
