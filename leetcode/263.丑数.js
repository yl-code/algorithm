/*
 * @lc app=leetcode.cn id=263 lang=javascript
 *
 * [263] 丑数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 *
 * 思路很简单
 * 读题目可得：丑数 就是只包含质因数 2、3、5 的正整数
 * 用 n 反复除 2，3，5，最后商为 1 时，表示 n 为丑数
 *
 */
var isUgly = function (n) {
  if (n <= 0) return false;

  for (const num of [2, 3, 5]) {
    while (n % num === 0) {
      n /= num;
    }
  }
  return n === 1;
};
// @lc code=end
