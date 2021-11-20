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
    newNode.next = this.next;
    if (this.next) {
      this.next.pre = newNode;
    }
    this.next = newNode;
  }

  // 在当前节点的 前面 删除 一个节点
  del_front() {
    let val = -1;
    if (this.pre) {
      val = this.pre.val;
      this.pre = this.pre.pre;

      if (this.pre) {
        this.pre.next = this;
      }
    }

    return val;
  }

  // 在当前节点的 后面 删除 一个节点
  del_back() {
    let val = -1;
    if (this.next) {
      val = this.next.val;
      this.next = this.next.next;

      if (this.next) {
        this.next.pre = this;
      }
    }

    return val;
  }
}

// 双端队列
class DoubleEndQueue {
  constructor() {
    // 虚拟头 与 虚拟尾，分别在 双端队列 的头部和尾部
    // 这样 两端 的入队出队操作，只用 在 对应虚拟节点 的 前面或者后面 进行 添加或者删除 节点
    this.head = new Node();
    this.tail = new Node();

    this.head.next = this.tail;
    this.tail.pre = this.head;

    this.count = 0;
  }

  push_front = (val) => {
    this.head.add_back(new Node(val));
    this.count++;
  };

  push_back = (val) => {
    this.tail.add_front(new Node(val));
    this.count++;
  };

  pop_front = () => {
    if (!this.is_empty()) {
      this.count--;
      return this.head.del_back();
    } else {
      return -1;
    }
  };

  pop_back = (log) => {
    if (!this.is_empty()) {
      this.count--;

      let a = this.tail.del_front();
      return a;
    } else {
      return -1;
    }
  };

  is_empty = () => {
    return this.count === 0;
  };
}

var FrontMiddleBackQueue = function () {
  this.left = new DoubleEndQueue();
  this.right = new DoubleEndQueue();

  this.update = () => {
    if (this.left.count < this.right.count) {
      let val = this.right.pop_front();
      this.left.push_back(val);
    }

    if (this.left.count === this.right.count + 2) {
      let val = this.left.pop_back();
      this.right.push_front(val);
    }
  };
};

/**
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushFront = function (val) {
  this.left.push_front(val);
  this.update();
};

/**
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushMiddle = function (val) {
  if (this.left.count > this.right.count) {
    let midValue = this.left.pop_back();
    this.right.push_front(midValue);
  }

  this.left.push_back(val);
};

/**
 * @param {number} val
 * @return {void}
 */
FrontMiddleBackQueue.prototype.pushBack = function (val) {
  this.right.push_back(val);
  this.update();
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popFront = function () {
  let popVal = this.left.pop_front();
  if (popVal !== -1) {
    this.update();
  }
  return popVal;
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popMiddle = function () {
  let popVal = this.left.pop_back();

  if (popVal !== -1) {
    this.update();
  }

  return popVal;
};

/**
 * @return {number}
 */
FrontMiddleBackQueue.prototype.popBack = function () {
  let popVal;

  if (this.right.count) {
    popVal = this.right.pop_back();
    this.update();
  } else {
    popVal = this.left.pop_back(true);
  }

  return popVal;
};

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
