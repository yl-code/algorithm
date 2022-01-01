/*
 * @lc app=leetcode.cn id=23 lang=javascript
 *
 * [23] 合并K个升序链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
class Heap {
  constructor(compare) {
    this.data = [];

    this.compare = compare;
  }

  top = () => {
    return this.data[0];
  };

  size = () => {
    return this.data.length;
  };

  swap = (a, b) => {
    [this.data[a], this.data[b]] = [this.data[b], this.data[a]];
  };

  shiftUp = (curr) => {
    if (curr <= 0) return;

    const parent = (curr - 1) >> 1;

    if (parent < 0 || this.compare(this.data[parent], this.data[curr]) < 0) return;

    this.swap(parent, curr);

    this.shiftUp(parent);
  };

  push = (val) => {
    this.data.push(val);

    this.shiftUp(this.data.length - 1);
  };

  shiftDown = (curr) => {
    if (curr >= this.data.length) return;

    let temp = curr;
    let left = curr * 2 + 1;
    let right = curr * 2 + 2;

    if (left < this.size() && this.compare(this.data[left], this.data[temp]) < 0) {
      temp = left;
    }

    if (right < this.size() && this.compare(this.data[right], this.data[temp]) < 0) {
      temp = right;
    }

    if (temp === curr) return;

    this.swap(temp, curr);
    this.shiftDown(temp);
  };

  pop = () => {
    if (!this.data.length) return null;

    this.swap(0, this.data.length - 1);

    let res = this.data.pop();

    this.shiftDown(0);

    return res;
  };
}

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  // 初始化一个小顶堆
  const minHeap = new Heap((a, b) => a.val - b.val);

  // 将所有链表的头节点入堆
  for (const node of lists) {
    if (node) {
      minHeap.push(node);
    }
  }

  // 初始化 虚拟头节点 用来链接需要返回的结果链表
  const fakeHead = new ListNode();
  // 初始化一个指针，指向结果链表的最后一个节点
  let curr = fakeHead;

  // 当小顶堆不为空时继续循环
  while (minHeap.size()) {
    // 每个链表都是正序链接的
    // 所以小顶堆的堆顶元素即为，待合并的所有链表节点中的，最小节点
    let min = minHeap.pop();

    // 如果堆顶节点还链接着下一个节点，则将下一个节点入堆
    if (min.next) minHeap.push(min.next);

    // 常规的添加节点操作
    curr.next = min;
    curr = curr.next;
  }

  return fakeHead.next;
};
// @lc code=end
