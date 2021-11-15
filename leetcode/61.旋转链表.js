/*
 * @lc app=leetcode.cn id=61 lang=javascript
 *
 * [61] 旋转链表
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
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function (head, k) {
  if (!head || !head.next) return head;

  // 记录链表的长度
  let len = 1;
  let current = head;
  while (current.next) {
    current = current.next;
    ++len;
  }

  // 首先将 k 对 链表长度取余，属于代码优化，防止 k 远大于 len, 代码会一直转圈
  // 然后当指针在环内移动时，往左边移动 k 位置，就是往右边移动 allLen - k 位
  k = len - (k % len);

  // 先将链表首尾相连
  current.next = head;

  while (k--) {
    current = current.next;
  }

  const newHead = current.next;

  // 断开链表
  current.next = null;

  return newHead;
};
// @lc code=end
