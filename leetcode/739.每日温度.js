/*
 * @lc app=leetcode.cn id=739 lang=javascript
 *
 * [739] 每日温度
 *
 * 思路：
 *     很明显，题目要求当前元素后第一个更大的元素，与当前元素的距离
 *
 */

// @lc code=start
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  const stack = [];
  const ret = new Array(temperatures.length).fill(0);

  for (let i = 0; i < temperatures.length; i++) {
    while (
      stack.length &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      const ind = stack.pop();
      ret[ind] = i - ind;
    }

    stack.push(i);
  }

  return ret;
};
// @lc code=end
