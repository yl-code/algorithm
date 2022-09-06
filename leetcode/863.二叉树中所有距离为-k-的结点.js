/*
 * @lc app=leetcode.cn id=863 lang=javascript
 *
 * [863] 二叉树中所有距离为 K 的结点
 *
 * 思路：
 *    距离 target 距离为 k 的节点有两部分，第一部分是当前节点的子节点，第二部分是祖先节点和兄弟子树中的节点
 *
 *    递归遍历每个节点
 *
 *    当前节点为目标节点时，搜集其子节点中距离为 k 的节点，很 easy
 *
 *    那么 当前节点的祖先节点 和 当前节点的兄弟子树 中，符合条件距离 k 的节点如何收集？
 *    可以在回溯过程中进行收集
 *
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} k
 * @return {number[]}
 */
const distanceK = (root, target, k) => {
  const res = [];
  getRes(root, target, k, res);
  return res;
};

/**
 *
 * @param {*} root 二叉树根节点
 * @param {*} target 目标节点
 * @param {*} k 节点间的距离
 * @param {*} res 结果数组
 * @returns 当前树中存在 target 时，返回树的根节点到 target 的距离
 */
const getRes = (root, target, k, res) => {
  if (!root) return null;

  // 如果当前节点为目标节点，则获取其子树中的符合要求的节点
  if (root.val === target.val) {
    dfs(root, 0, k, res);
    return k; // 返回当前节点与目标节点的距离 k
  }

  // 如果目标节点存在于左子树中，那么应该在右子树中查找符合要求的节点
  // l_k 为左子树的根节点，距离 target 的距离
  let l_k = getRes(root.left, target, k, res);
  if (Number.isInteger(l_k)) {
    l_k--; // l_k - 1 为当前节点，也就是树的根节点，与 target 的距离
    // l_k - 1 === 0，说明当前节点距离 target 节点的距离为 k
    if (l_k === 0) res.push(root.val);
    else dfs(root.right, 0, l_k - 1, res); // 在右子树中寻找距离右子树的根节点，距离为 l_k 再次减一 的节点

    return l_k; // 返回当前树的根节点与 target 的距离
  }

  let r_k = getRes(root.right, target, k, res);
  if (Number.isInteger(r_k)) {
    r_k--;
    if (r_k === 0) res.push(root.val);
    else dfs(root.left, 0, r_k - 1, res);

    return r_k;
  }

  return null; // 当前树中没有 target 时，返回 null
};

const dfs = (root, level, k, res) => {
  if (!root || level < 0) return;

  if (level === k) {
    res.push(root.val);
  }

  dfs(root.left, level + 1, k, res);
  dfs(root.right, level + 1, k, res);
};

// @lc code=end
