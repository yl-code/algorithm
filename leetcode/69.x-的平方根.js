/*
 * @lc app=leetcode.cn id=69 lang=javascript
 *
 * [69] x 的平方根
 *
 * 思路：
 *    由题目可得，a * a = x，求 a 的整数部分 b
 *    所以 b * b <= x
 *    也就是在区间 [0, x] 中，找到满足条件的最大的 b
 *    在单调区间内查找值，可以使用 二分查找
 *
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */

var mySqrt = function (x) {
  let head = 0,
    tail = x,
    mid,
    ans = 0;

  // 边界条件，head = tail 时，
  // 如果 mid * mid <= x，那么结果就是 mid
  // 如果 mid * mid > x，那么 tail = mid - 1，跳出循环，结果为上一次的 mid
  while (head <= tail) {
    mid = (head + tail) >> 1;

    if (mid * mid <= x) {
      ans = mid;
      head = mid + 1;
    } else {
      tail = mid - 1;
    }
  }

  return ans;
};

var mySqrt_1 = function (x) {
  return parseInt(Math.pow(x, 0.5));
};
// @lc code=end
