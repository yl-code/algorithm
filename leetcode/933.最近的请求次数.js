/*
 * @lc app=leetcode.cn id=933 lang=javascript
 *
 * [933] 最近的请求次数
 */

// @lc code=start

var RecentCounter = function () {
  // 用 数组 来模拟队列
  this.list = [];
};

/**
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function (t) {
  // 每次方法执行时，现将 t 进行 入队 操作
  this.list.push(t);

  // 按照题目要求
  // 再比较 t 与 队首 元素之间的时间间隔
  // 大于 3000 时，将队首元素进行 出队 操作
  while (t - this.list[0] > 3000) {
    this.list.splice(0, 1);
  }

  // 最后返回 队列元素个数
  return this.list.length;
};

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */
// @lc code=end
