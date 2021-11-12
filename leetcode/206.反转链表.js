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
var reverseList = (head) => {
  if (!head || !head.next) return head;

  // tail 即为翻转后的尾节点
  const tail = head.next;

  // reverseList 递归到最底层，
  // 开始回溯时，返回的节点就是正序的最后一个节点，
  // 也是逆序的第一个节点
  const newHead = reverseList(head.next);
  head.next = null;
  tail.next = head;
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
