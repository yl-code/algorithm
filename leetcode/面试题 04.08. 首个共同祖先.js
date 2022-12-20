/**
 * 面试题 04.08. 首个共同祖先
 * https://leetcode.cn/problems/first-common-ancestor-lcci/
 *
 * 设计并实现一个算法，找出二叉树中某两个节点的第一个共同祖先。
 * 不得将其他的节点存储在另外的数据结构中。注意：这不一定是二叉搜索树。
 *
 */

// 根据题目描述，这棵二叉树每个节点值不相同，任意两个节点，一定存在一个最近公共祖先
// 先搜索再判断，根据当前节点，分别查找当前节点的左右子树
// 查找左子树的结果记录在 left 上，找到 p 或 q 直接返回，找不到返回 null，查找右子树同理且结果记录 right 上
// 根据左右子树的查找结果进行判断，如果 left right 都有值，那么当前节点就是最近公共祖先，直接返回当前节点
// 不存在 left 与 right 都没有值的情况
// 当 left 有值，right 没有值，表示 p q 存在于当前节点的左子树中，直接返回上面查找左子树的结果 left 即可，另一种情况同理
var lowestCommonAncestor = function (root, p, q) {
  // 如果 root 为空 直接返回 root
  if (!root) return root;

  // 如果找到 p 或者 q，意味着 root === p || root === q, 也直接返回 root
  if (root === p || root === q) return root;

  // 查找当前节点的左右子树，
  const left = lowestCommonAncestor(root.left, p, q);

  const right = lowestCommonAncestor(root.right, p, q);

  // 如果左右子树的查找结果都有值，说明左右子树中分别存在 p q 两个节点
  // 则当前节点 就是 p q 的公共祖先
  if (left && right) return root;

  return left ? left : right;
};
