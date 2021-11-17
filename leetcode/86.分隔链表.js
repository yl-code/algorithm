/*
 * @lc app=leetcode.cn id=86 lang=javascript
 *
 * [86] 分隔链表
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
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
  // 创建一大一下两个虚拟头节点
  // 创建两个指针分别指向这两个虚头
  // 规定：两个指针分别指向大小链表的最后一个节点
  const big = new ListNode();
  let b = big;

  const small = new ListNode();
  let s = small;

  // 创建一个指针指向待处理的链表的头节点
  let current = head;
  // 创建一个变量用于存放头节点的下一个节点地址
  let curr_next;

  while (current) {
    curr_next = current.next;

    // 断开 当前节点 与 后面节点 的关联
    current.next = null;

    if (current.val < x) {
      // 当 当前节点 的值小于 x 时
      // 将 当前节点 接在 small 链表后面
      // 然后 s 指针指向 small 链表的最后一个节点

      s.next = current;
      s = current;
    } else {
      // 同上

      b.next = current;
      b = current;
    }

    current = curr_next;
  }

  // 将 big 链表接在 small 链表后面即可
  s.next = big.next;
  return small.next;
};
// @lc code=end
