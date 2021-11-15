/*
 * @lc app=leetcode.cn id=82 lang=javascript
 *
 * [82] 删除排序链表中的重复元素 II
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
var deleteDuplicates = function (head) {
  const fakeHead = new ListNode(-1, head);

  let current = fakeHead;
  let find;

  // 1、判断 current 指针指向节点的下一个节点是否存在
  while (current.next) {
    if (current.next.next && current.next.val === current.next.next.val) {
      // 当 current.next.next 的值 与 current.next 的值相等时，
      //    使用 find 指针开始寻找 current.next.next 之后的与 current.next 的值不想等的节点
      //    之后将 current.next = find，用以删除中间重复的节点
      find = current.next.next;

      while (find && find.val === current.next.val) {
        find = find.next;
      }

      current.next = find;
    } else {
      // 当 current.next.next 的值 与 current.next 的值相等时，才需要移动 current 指针
      current = current.next;
    }
  }

  return fakeHead.next;
};
// @lc code=end
