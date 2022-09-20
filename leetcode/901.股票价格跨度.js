/*
 * @lc app=leetcode.cn id=901 lang=javascript
 *
 * [901] 股票价格跨度
 *
 * 思路：
 *    题目要求从今天开始往回数，小于或等于今天价格的最大连续日数，包括今天
 *    也就是找到左边第一个大于今天价格的元素，求这两天之间的天数
 */

// @lc code=start

var StockSpanner = function () {
  this.num = 0; // 模拟索引值
  this.stack = [[Number.MAX_SAFE_INTEGER, this.num++]]; // 初始状态
};

/**
 * @param {number} price
 * @return {number}
 */
StockSpanner.prototype.next = function (price) {
  const { stack } = this;
  while (stack.length && price >= stack[stack.length - 1][0]) stack.pop();

  let ret = this.num - stack[stack.length - 1][1]; // 求连续天数
  stack.push([price, this.num++]);
  return ret;
};

/**
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */
// @lc code=end
