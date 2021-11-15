/*
 * @lc app=leetcode.cn id=19 lang=javascript
 *
 * [19] 删除链表的倒数第 N 个结点
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
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  // 首先创建 虚头
  const fakeHead = new ListNode(-1, head);

  // p 指针指向 虚头，q 指针指向 头节点
  let p = fakeHead;
  let q = head;

  // q 指针往后走 n 步
  while (n-- && q) {
    q = q.next;
  }

  // 然后 p 和 q 一起往后走，直到 q 走到链表末尾 null
  // 此时 p 与 q 相距 n 个节点
  // 且 p 指向 待删除节点的 前一个节点
  while (q) {
    p = p.next;
    q = q.next;
  }

  // 删除节点
  p.next = p.next.next;

  return fakeHead.next;
};
// @lc code=end
