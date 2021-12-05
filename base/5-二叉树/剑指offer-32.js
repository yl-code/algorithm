/**
 * https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-ii-lcof/
 *
 * 从上到下按层打印二叉树，同一层的节点按从左到右的顺序打印，每一层打印到一行。
 *
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
 * @return {number[][]}
 */
var levelOrder = function (root) {
  /**
   *
   * @param {*} root 树的根节点
   * @param {*} k 当前节点 相对于 根节点的 层级数字
   * @param {*} res 题目要求的返回结果，二维数组 [[], []]
   */
  const getResult = (root, k, res) => {
    if (!root) return root;

    // 当 res 的长度 与 层级数 相等时
    // 需要新增一个空数组，来存放当前节点
    if (k === res.length) {
      res.push([]);
    }

    res[k].push(root.val);

    getResult(root.left, k + 1, res);
    getResult(root.right, k + 1, res);
  };

  let res = [];
  getResult(root, 0, res);

  return res;
};
