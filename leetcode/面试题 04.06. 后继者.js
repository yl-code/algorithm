/**
 * 面试题 04.06. 后继者
 * https://leetcode.cn/problems/successor-lcci/
 *
 * 设计一个算法，找出二叉搜索树中指定节点的“下一个”节点（也即中序后继）。
 * 如果指定节点没有对应的“下一个”节点，则返回null。
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @return {TreeNode}
 *
 * 思路：
 *    中序遍历的过程中，用 pre 记录上一个节点，当 pre 与 p 指向同一个节点时，当前节点即为所求
 */
var inorderSuccessor = function (root, p) {
  let pre = null;

  // 定义递归函数，返回值为题目要求的后继
  const inorder = (root, p) => {
    if (!root) return null;

    const l = inorder(root.left, p);
    if (l) return l;

    if (pre === p) return root;
    pre = root;

    const r = inorder(root.right, p);
    if (r) return r;
  };

  return inorder(root, p);
};
