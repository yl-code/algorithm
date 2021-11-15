/*
 * @lc app=leetcode.cn id=25 lang=javascript
 *
 * [25] K 个一组翻转链表
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
var reverseKGroup = function (head, k) {
  // 翻转链表的前 n 个节点
  const reverseN = (head, n) => {
    if (!head || !head.next || n === 1) return head;

    // tail 是翻转后的链表的尾节点
    let tail = head.next;
    let lastNode = reverseN(head.next, n - 1);
    head.next = tail.next;
    tail.next = head;
    return lastNode;
  };

  // 判断是否需要翻转, 返回真正翻转的结果
  const __reverseN = (head, k) => {
    const count = k;
    let curr = head;
    // 只要当前节点存在，且指针往后移动 k-1 次，每次节点都不为空，则可以进行翻转，否则返回空
    while (--k && curr) {
      curr = curr.next;
    }

    // 不满足条件的剩余节点，直接返回就行
    if (!curr) return head;

    return reverseN(head, count);
  };

  ///////////////// main /////////////////
  // 依然需要使用 虚头 的技巧
  let fakeHead = new ListNode(-1, head);

  // 当前指针指向每 k 组链表节点的前一个节点
  let current = fakeHead;

  // tail 为每 k 组链表节点翻转之后的尾节点
  let tail = current.next;

  // 当翻转后返回的头节点 与 传入的节点 不相等，则说明本轮翻转成功
  // 当相等时说明翻转结束，剩余的节点不足 k 个 或者 节点全部翻转完成了
  //
  // current.next = 翻转后返回的头节点
  while ((current.next = __reverseN(current.next, k)) !== current.next) {
    current = tail;
    tail = current.next;
  }

  return fakeHead.next;
};
// @lc code=end
