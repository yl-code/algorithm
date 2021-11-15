/*
 * @lc app=leetcode.cn id=24 lang=javascript
 *
 * [24] 两两交换链表中的节点
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
var swapPairs = function (head) {
  const reverseN = (head, n) => {
    if (n == 1 || !head) return head;
    let tail = head.next;
    let newHead = reverseN(tail, n - 1);
    head.next = tail.next;
    tail.next = head;

    return newHead;
  };

  const _reverseK = (head, k) => {
    const count = k;
    let curr = head;

    while (--k && curr) {
      curr = curr.next;
    }

    if (!curr) return head;

    return reverseN(head, count);
  };

  const fakeHead = new ListNode(-1, head);
  let current = fakeHead;
  let tail = current.next;

  while ((current.next = _reverseK(current.next, 2)) !== current.next) {
    current = tail;
    tail = tail.next;
  }

  return fakeHead.next;
};
// @lc code=end
