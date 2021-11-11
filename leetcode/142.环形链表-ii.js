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
  if (!head || !head.next) return null;

  let fast = head;
  let slow = head;

  do {
    fast = fast.next.next;
    slow = slow.next;
  } while (slow !== fast && fast && fast.next);

  if (fast && fast.next) {
    fast = head;
    while (slow !== fast) {
      fast = fast.next;
      slow = slow.next;
    }

    return fast;
  }

  return null;
};
// @lc code=end
