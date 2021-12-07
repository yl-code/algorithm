/**
 * https://leetcode-cn.com/problems/er-cha-sou-suo-shu-de-di-kda-jie-dian-lcof/
 *
 *
 * 给定一棵二叉搜索树，请找出其中第k大的节点。
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

// 解法 1
// 求树的节点数量
// const getCount = (root) => {
//   if (!root) return 0;
//   return getCount(root.left) + getCount(root.right) + 1;
// };

// var kthLargest = function (root, k) {
//   // 求 右子树 的节点数量
//   const rightCount = getCount(root.right);

//   // 由题目性质可知
//   // 二叉搜索树的 右子树的节点的值 都是比 根节点的值 要大
//   // 二叉搜索树的 左子树的节点的值 都是比 根节点的值 要小
//   // 可以比较 k 与 右子树节点数量的大小，来判断第 k 大的值是在右子树中、根结点或者左子树中
//   if (k <= rightCount) return kthLargest(root.right, k);
//   if (k === rightCount + 1) return root.val;
//   if (k > rightCount + 1) return kthLargest(root.left, k - rightCount - 1);
// };

// 解法 2
const inorder = (res, root) => {
  if (!root) return;

  inorder(res, root.left);
  res.push(root.val);
  inorder(res, root.right);
};

var kthLargest = function (root, k) {
  const res = [];
  inorder(res, root);

  // 由题目性质可知
  // 二叉搜索树的 右子树的节点的值 都是比 根节点的值 要大
  // 二叉搜索树的 左子树的节点的值 都是比 根节点的值 要小
  // 因此通过中序遍历，得出的节点序列，就是从小到大的有序序列

  return res[res.length - k];
};
