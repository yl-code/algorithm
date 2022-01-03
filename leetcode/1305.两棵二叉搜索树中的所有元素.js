/*
 * @lc app=leetcode.cn id=1305 lang=javascript
 *
 * [1305] 两棵二叉搜索树中的所有元素
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

// 中序遍历
const getMidOrder = (list, root) => {
  if (!root) return;

  getMidOrder(list, root.left);
  list.push(root.val);
  getMidOrder(list, root.right);
};

/**
 *
 * 二叉搜索树，也叫二叉排序树，指的是这棵二叉树，通过中序遍历得到的序列，是有序序列
 *
 * 所以题目给的两棵树，中序遍历得到有序序列，
 * 然后借鉴归并排序的思想，进行归并即可得到结果
 *
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {number[]}
 */
var getAllElements = function (root1, root2) {
  let list1 = [];
  getMidOrder(list1, root1);

  let list2 = [];
  getMidOrder(list2, root2);

  // 正常的归并操作
  let p1 = 0;
  let p2 = 0;
  let res = [];
  while (p1 < list1.length || p2 < list2.length) {
    if (p2 >= list2.length || (p1 < list1.length && list1[p1] < list2[p2])) {
      res.push(list1[p1++]);
    } else {
      res.push(list2[p2++]);
    }
  }

  return res;
};
// @lc code=end
