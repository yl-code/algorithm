/*
 * @lc app=leetcode.cn id=142 lang=javascript
 *
 * [142] 环形链表 II
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
 * @return {ListNode}
 */
var detectCycle = function (head) {
  if (!head) return null;

  let slow = head;
  let fast = head.next;

  while (slow !== fast && fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;
  }

  if (fast && fast.next) {
    fast = head;

    while (fast !== slow) {
      fast = fast.next;
      slow = slow.next;
    }
    console.log(fast.val, slow.val);

    return fast;
  }

  return null;
};
// @lc code=end
