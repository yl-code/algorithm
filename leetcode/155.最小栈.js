/*
 * @lc app=leetcode.cn id=155 lang=javascript
 *
 * [155] 最小栈
 *
 * 思路：
 *    根据题目 getMin 的操作，可以看出来是一个栈的操作，只不过栈顶是最小元素
 *    所以可以使用一个栈存储原始数据，另一个栈维护数据中的最小值
 */

// @lc code=start

var MinStack = function () {
  this.data = [];
  this.min_s = [];
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
  const { data, min_s } = this;
  data.push(val);

  if (!min_s.length || min_s[min_s.length - 1] >= val) {
    min_s.push(val);
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  const { data, min_s } = this;
  const top = data.pop();
  if (top === min_s[min_s.length - 1]) {
    min_s.pop();
  }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.data[this.data.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this.min_s[this.min_s.length - 1];
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
// @lc code=end
