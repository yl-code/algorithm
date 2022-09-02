/*
 * @lc app=leetcode.cn id=430 lang=javascript
 *
 * [430] 扁平化多级双向链表
 *
 * 思路：
 *    递归
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val,prev,next,child) {
 *    this.val = val;
 *    this.prev = prev;
 *    this.next = next;
 *    this.child = child;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var flatten = function (head) {
  let p = head;

  while (p) {
    if (p.child) {
      let prev = p;
      let next = p.next;
      let k = flatten(p.child);
      p.child = null;

      prev.next = k;
      k.prev = prev;

      while (k.next) {
        k = k.next;
      }

      k.next = next;
      if (next) next.prev = k;
    }
    p = p.next;
  }

  return head;
};
// @lc code=end
