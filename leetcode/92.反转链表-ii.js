/*
 * @lc app=leetcode.cn id=92 lang=javascript
 *
 * [92] 反转链表 II
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
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  const reverseN = (head, n) => {
    if (!head || !head.next || n === 1) return head;

    const tail = head.next;
    const lastNode = reverseN(tail, n - 1);
    head.next = tail.next;
    tail.next = head;

    return lastNode;
  };

  // 创建一个虚拟头节点，它的下一个节点为链表的头节点
  const fakeHead = new ListNode(-1, head);

  // 当前指针 指向 虚拟头节点
  let current = fakeHead;

  // 翻转节点的个数
  const count = right - left + 1;

  // 移动 当前指针 指向待翻转链表的前一个节点，
  // eg: 若待翻转节点区间为 1，4，则 当前指针只需要移动 1-1=0 次，即指向虚拟头节点
  while (--left) {
    current = current.next;
  }

  current.next = reverseN(current.next, count);
  return fakeHead.next;
};
// @lc code=end
