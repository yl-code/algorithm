/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
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
 * @return {ListNode}
 */
// 递归
const reverseList = (head) => {
  if (!head || !head.next) return head;

  // tail 就是 head 后面的链表翻转后的最后一个节点
  const tail = head.next;
  const newHead = reverseList(tail);
  tail.next = head;
  head.next = null; // 避免输出的 链表有环

  return newHead;
};

// 普通写法
var reverseList2 = function (head) {
  if (head === null) return head;

  let curr = head;
  let prev = null;
  let next = head.next;

  while (curr) {
    curr.next = prev;
    prev = curr;
    (curr = next) && (next = next.next);
  }
  return prev;
};
// @lc code=end
