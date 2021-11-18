/*
 * @lc app=leetcode.cn id=622 lang=javascript
 *
 * [622] 设计循环队列
 */

// @lc code=start
/**
 * @param {number} k
 */
var MyCircularQueue = function (k) {
  this.maxSize = k; // 队列最大的元素个数
  this.data = {}; // 用于存放队列元素的容器
  this.head = 0; // 队列头指针
  this.tail = 0; // 队列尾指针
  this.count = 0; // 队列中元素个数
};

/**
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function (value) {
  if (this.isFull()) return false;

  this.data[this.tail] = value;

  // 当队列满了之后，tail 是等于 maxSize 的，
  // 但实际上在循环队列里面，此时的 tail 应该等于 0
  this.tail = (this.tail + 1) % this.maxSize;

  this.count++;

  return true;
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function () {
  if (this.isEmpty()) return false;

  // 同 tail 指针一样，循环起来
  this.head = (this.head + 1) % this.maxSize;
  this.count--;

  return true;
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Front = function () {
  if (this.isEmpty()) return -1;

  return this.data[this.head];
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function () {
  if (this.isEmpty()) return -1;

  // 当前的 tail 指针指向的是队尾元素的下一位, 所以要获取 tail - 1 位置的元素

  // 普通版
  // let index = this.tail - 1;
  // if (index < 0) index = this.maxSize - 1;

  // 🐂🍺版
  // 仔细琢磨一下，当
  // tail == 0 时，idnex == maxSize - 1
  // tail == 1 时，index == 0
  // tail == 2 时，index == 1
  const index = (this.tail - 1 + this.maxSize) % this.maxSize;

  return this.data[index];
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function () {
  if (this.count === 0) {
    return true;
  } else {
    return false;
  }
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function () {
  if (this.count === this.maxSize) {
    return true;
  } else {
    return false;
  }
};

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */
// @lc code=end
