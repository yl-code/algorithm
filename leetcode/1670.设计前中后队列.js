/*
 * @lc app=leetcode.cn id=1670 lang=javascript
 *
 * [1670] 设计前中后队列
 */

// @lc code=start

// 双向链表
class Node {
  constructor(val, next = null, pre = null) {
    this.val = val;
    this.next = next;
    this.pre = pre;
  }

  // 在当前节点的 前面 添加 一个节点
  add_front(newNode) {
    newNode.next = this;
    newNode.pre = this.pre;
    if (this.pre) {
      this.pre.next = newNode;
    }
    this.pre = newNode;
  }

  // 在当前节点的 后面 添加 一个节点
  add_back(newNode) {
    newNode.pre = this;
    newNode.pre = this.next;
    if (this.next) {
      this.next.pre = newNode;
    }
    this.next = newNode;
  }

  // 在当前节点的 前面 删除 一个节点
  del_front() {
    if (this.pre) {
      this.pre = this.pre.pre;

      if (this.pre.pre) {
        this.pre.next = this;
      }
    }
  }

  // 在当前节点的 后面 删除 一个节点
  del_back() {
    if (this.next) {
      this.next = this.next.next;

      if (this.next) {
        this.next.pre = this;
      }
    }
  }
}

// 双端队列
class DoubleEndQueue {
  constructor() {
    // 虚拟头 与 虚拟尾，分别在 双端队列 的头部和尾部
    // 这样 两端 的入队出队操作，只用 在对应虚拟节点的 前面或者后面 进行 添加或者删除 节点
    const head = new Node();
    const tail = new Node();

    head.next = tail;
    tail.pre = head;
  }
}

var FrontMiddleBackQueue = function () {};

/**
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushFront = function (val) {};

/**
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushMiddle = function (val) {};

/**
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushBack = function (val) {};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popFront = function () {};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popMiddle = function () {};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popBack = function () {};

/**
 * Your FrontMiddleBackQueue object will be instantiated and called as such:
 * var obj = new FrontMiddleBackQueue()
 * obj.pushFront(val)
 * obj.pushMiddle(val)
 * obj.pushBack(val)
 * var param_4 = obj.popFront()
 * var param_5 = obj.popMiddle()
 * var param_6 = obj.popBack()
 */
// @lc code=end
