/**
 * https://leetcode-cn.com/problems/shu-de-zi-jie-gou-lcof/submissions/
 *
 * 输入两棵二叉树A和B，判断B是不是A的子结构。(约定空树不是任意一个树的子结构)
 * B是A的子结构， 即 A中有出现和B相同的结构和节点值。
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

// 从上至下匹配两棵树
const isMatch = (A, B) => {
  //
  // 题目要求，B 树为 A 树的子结构
  // 所以递归时，同一层的 B 树节点没有了，可能匹配上，若 A树节点没有了，一定是返回 false，
  if (!B) return true;
  if (!A) return false;

  // 根结点不同时，直接返回 false
  if (A.val !== B.val) return false;

  // A 树和 B 树都不为空，且两棵树的根结点相同
  // 继续匹配 AB 的左子树 和 AB 的右子树
  return isMatch(A.left, B.left) && isMatch(A.right, B.right);
};

/**
 * @param {TreeNode} A
 * @param {TreeNode} B
 * @return {boolean}
 */
var isSubStructure = function (A, B) {
  //
  // 若 A 或者 B 是空树，直接按照题目要求返回 false
  if (!B || !A) return false;

  // 从上至下，匹配 A 树与 B 树，若能匹配上，直接返回 true
  if (A.val === B.val && isMatch(A, B)) return true;

  // 从上至下匹配不上
  // 再尝试 A 的左右子树，能否匹配上 B
  return isSubStructure(A.left, B) || isSubStructure(A.right, B);
};
