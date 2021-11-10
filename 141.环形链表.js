/*
 * @lc app=leetcode.cn id=141 lang=javascript
 *
 * [141] 环形链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
// 解法 1
// var hasCycle = function (head) {
//   if (!head) return false;

//   let slow = head;
//   let fast = head.next;

//   // 快指针当前节点 与 其下一个节点 都存在才进行下一轮循环
//   while (fast && fast.next) {
//     fast = fast.next.next;
//     slow = slow.next;

//     // 当快慢指针指向相同时，即可判断链表有环
//     if (fast === slow) {
//       return true;
//     }
//   }

//   return false;
// };

var hasCycle = function (head) {
  if (!head) return false;

  let slow = head;
  let fast = head.next;

  // 快指针当前节点 与 其下一个节点 都存在才进行下一轮循环
  while (fast !== slow && fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // 题目按要求返回 布尔值，返回结果一定要进行类型转换
  return !!(fast && fast.next);
};
// @lc code=end
