/*
 * @lc app=leetcode.cn id=148 lang=javascript
 *
 * [148] 排序链表
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
 *
 * 思路很简单，借鉴快速排序的思想
 *
 * 遍历一遍链表，找到 最大值 与 最小值，从而算出中间值
 * 再次遍历链表，以中间值为基准，将链表拆分为独立的两条链表
 * 递归上述过程，然后将拆分的链表再次链接起来，即可得到排序后的链表
 *
 */
var sortList = function (head) {
  if (!head) return head;

  let max = -Infinity;
  let min = Infinity;

  let curr = head;
  while (curr) {
    max = Math.max(max, curr.val);
    min = Math.min(min, curr.val);
    curr = curr.next;
  }

  if (max === min) return head;

  let mid = (max + min) / 2;
  let link1 = new ListNode();
  let link2 = new ListNode();
  let curr1 = link1;
  let curr2 = link2;

  curr = head;
  while (curr) {
    // 需要拆分出独立的节点
    let backup = curr.next;
    curr.next = null;

    if (curr.val > mid) {
      curr2.next = curr;
      curr2 = curr2.next;
    } else {
      curr1.next = curr;
      curr1 = curr1.next;
    }

    curr = backup;
  }

  link1.next = sortList(link1.next);
  link2.next = sortList(link2.next);

  // 链接两条链表
  curr = link1.next;
  while (curr.next) {
    curr = curr.next;
  }

  curr.next = link2.next;

  return link1.next;
};
// @lc code=end
