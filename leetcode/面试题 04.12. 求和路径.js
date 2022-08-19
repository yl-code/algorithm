/**
 *
 * https://leetcode.cn/problems/paths-with-sum-lcci/
 *
 * 给定一棵二叉树，其中每个节点都含有一个整数数值(该值或正或负)。
 * 设计一个算法，打印节点数值总和等于某个给定值的所有路径的数量。
 * 注意，路径不一定非得从二叉树的根节点或叶节点开始或结束，但是其方向必须向下(只能从父节点指向子节点方向)。
 *
 * 思路：
 *    递归
 *    定义 pathSum 函数作用为：求当前树中的符合要求的路径和值的数量
 *
 *
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 *
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number}
 */

const pathSumWithHead = () => {};

var pathSum = function (root, sum) {
  // 路径和值 = 包含当前节点的路径和值 + 不包含当前节点的路径和值
  // 不包含当前节点的路径和值 = 左子树中的路径和值 + 右子树中的路径和值
  // 而，左右中的路径和值计算，再次分为
  return (
    pathSumWithHead(root, sum) +
    pathSum(root.left, sum) +
    pathSum(root.right, sum)
  );
};
