/*
 * @lc app=leetcode.cn id=863 lang=javascript
 *
 * [863] 二叉树中所有距离为 K 的结点
 *
 * 思路：
 *    递归遍历每个节点
 *    当前节点为目标节点时，搜集其子节点中距离为 k 的节点，很 easy
 *
 *    那么当前节点的祖先节点中，符合条件距离 k 的节点如何收集？
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

const getRes = (root, target, k, res) => {
  if (!root) return { hasTarget: false, k };
  if (root.val === target.val) {
    dfs(root, 0, k, res);
    return { hasTarget: true, k };
  }

  const l = getRes(root.left, target, k, res);
  if (l.hasTarget) {
    let l_k = l.k - 1;
    if (l_k === 0) res.push(root.val);
    else dfs(root.right, 0, l_k - 1, res);

    return { hasTarget: true, k: l_k };
  }

  const r = getRes(root.right, target, k, res);
  if (r.hasTarget) {
    let r_k = r.k - 1;
    if (r_k === 0) res.push(root.val);
    else dfs(root.left, 0, r_k - 1, res);

    return { hasTarget: true, k: r_k };
  }

  return { hasTarget: false, k };
};

const dfs = (root, level, k, res) => {
  if (!root || level < 0) return;

  if (level === k) {
    res.push(root.val);
  }

  dfs(root.left, level + 1, k, res);
  dfs(root.right, level + 1, k, res);
  return;
};

// @lc code=end
