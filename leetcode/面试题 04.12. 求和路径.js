/**
 * 面试题 04.12. 求和路径
 * https://leetcode.cn/problems/paths-with-sum-lcci
 *
 * 给定一棵二叉树，其中每个节点都含有一个整数数值(该值或正或负)。
 * 设计一个算法，打印节点数值总和等于某个给定值的所有路径的数量。
 * 注意，路径不一定非得从二叉树的根节点或叶节点开始或结束，但是其方向必须向下(只能从父节点指向子节点方向)。
 *
 * 思路：
 *    递归求解
 *
 *
 *
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 *
 */

// 2、求包含当前头节点的 符合条件的路径 的数量
const pathSumWithHead = (root, sum) => {
  if (!root) return 0;
  console.log(root.val);

  let val = sum - root.val;

  // 当前节点值与和值相等时，表示找到一个路径
  // 当前节点值与和值不相等时，开始在左右子树中寻找节点值为 sum - root.val 的节点
  return (
    (root.val === sum) +
    pathSumWithHead(root.left, val) +
    pathSumWithHead(root.right, val)
  );
};

// 1、求二叉树中符合条件的路径的数量
var pathSum = function (root, sum) {
  if (!root) return 0;
  //
  // 符合条件的路径的数量 = 包含当前头节点的符合条件的路径的数量 + 不包含当前头节点的符合条件的路径的数量
  //
  // 不包含当前头节点的符合条件的路径的数量 = 左右子树中符合条件的路径的数量
  //
  return (
    pathSumWithHead(root, sum) +
    pathSum(root.left, sum) +
    pathSum(root.right, sum)
  );
};
