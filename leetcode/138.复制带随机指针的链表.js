/*
 * @lc app=leetcode.cn id=138 lang=javascript
 *
 * [138] 复制带随机指针的链表
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList2 = function (head) {
  if (!head) return head;

  for (let curr = head; curr !== null; curr = curr.next.next) {
    const newNode = new Node(curr.val, curr.next, null);
    curr.next = newNode;
  }

  for (let curr = head; curr !== null; curr = curr.next.next) {
    curr.next.random = !!curr.random ? curr.random.next : null;
  }

  const new_copy_head = head.next;
  let copy;
  for (let curr = head; curr !== null; curr = curr.next) {
    copy = curr.next;
    curr.next = curr.next.next;
    copy.next = !!copy.next ? copy.next.next : null;
  }

  return new_copy_head;
};

var copyRandomList = function (head) {
  if (!head) return head;

  let current = head;

  // 1、首先遍历链表，将每个节点都复制一份, 然后插入到该节点后面
  // 每个 复制的节点 的 random 域指向与 原节点相同
  // 1 -> 1' -> 2 -> 2' -> null
  while (current) {
    const copyNode = new Node(current.val, current.next, current.random);
    // copyNode.random = current.random;
    // copyNode.next = current.next;
    current.next = copyNode;
    current = copyNode.next;
  }

  // 2、遍历链表，修正每个 被复制的节点 的 random 域
  // 第一步中，复制节点的 random 域指向的是，正确位置的前一位
  current = head.next;
  while (current) {
    if (current.random) {
      current.random = current.random.next;
    }

    // 这样写也比较帅
    // (current = current.next) && (current = current.next);

    current = current.next ? current.next.next : null;
  }

  // 3、遍历链表，将链表拆分为两条独立链表
  current = head;
  let new_copy_head = head.next;
  let copy;
  while (current) {
    copy = current.next;

    current.next = copy.next;
    if (current.next) copy.next = current.next.next;

    current = current.next;
  }

  return new_copy_head;
};
// @lc code=end
