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
 * 解法二
 *
 * 使用归并排序的思想解题
 *
 * 先将链表从中间拆开，将两条链表递归排完序后，再进行归并操作，连接成一个完整链表
 *
 */
const sortList = (head) => {
  const mergeSort = (head, n) => {
    // 当链表节点 <= 1 时，直接返回
    if (n <= 1) return head;

    // 计算 左半段 与 右半段 链表节点个数
    let l = n >> 1;
    let r = n - l;

    // 根据 左半段链表的个数，找到中间位置节点
    let curr = head;
    for (let i = 1; i < l; i++) curr = curr.next;

    // 记录左右半段链表的头节点
    let left = head;
    let right = curr.next;

    //断开链表
    curr.next = null;

    // 递归地将左右半段链表分别进行排序
    left = mergeSort(left, l);
    right = mergeSort(right, r);

    // 下面就是按照归并排序的操作，进行链表的归并
    let fakeHead = new ListNode();
    curr = fakeHead;
    while (left || right) {
      if (!right || (left && left.val < right.val)) {
        curr.next = left;
        left = left.next;
      } else {
        curr.next = right;
        right = right.next;
      }

      curr = curr.next;
    }

    return fakeHead.next;
  };

  // 这里为啥要统计链表节点的数量
  // 因为通过数量 n >> 1，计算可得链表前半段的 节点个数
  // 然后才能将链表从中间拆开成两条链表
  let n = 0;
  let curr = head;
  while (curr) {
    n++;
    curr = curr.next;
  }

  return mergeSort(head, n);
};

/**
 *
 *
 *
 * 解法一
 *
 * 借鉴快速排序的思想解题
 *
 * 遍历一遍链表，找到 最大值 与 最小值，从而算出中间值
 * 再次遍历链表，以中间值为基准，将链表拆分为独立的两条链表
 * 递归上述过程，然后将拆分的链表再次链接起来，即可得到排序后的链表
 *
 */
var sortList_1 = function (head) {
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
