/*
 * @lc app=leetcode.cn id=1367 lang=javascript
 *
 * [1367] 二叉树中的列表
 *
 * 思路：
 *    遍历二叉树的每个节点
 *    并以当前节点为 题目要求的可能路径 的头节点
 *    按顺序从头至尾对比链表的每个节点
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {ListNode} head
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSubPath = function (head, root) {
  // if (!head) return true;
  if (!root) return false;
  if (head.val === root.val && check(head, root)) return true;
  return isSubPath(head, root.left) || isSubPath(head, root.right);
};

const check = (head, root) => {
  if (!head) return true;
  if (!root) return false;
  if (head.val !== root.val) return false;
  return check(head.next, root.left) || check(head.next, root.right);
};
// @lc code=end
