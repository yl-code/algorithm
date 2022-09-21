/*
 * @lc app=leetcode.cn id=84 lang=javascript
 *
 * [84] 柱状图中最大的矩形
 *
 * 思路：
 *    柱状图勾勒出来的面积实际上就是
 *    找到当前柱子左右两边第一个比他短的柱子之间的距离，不包括这两个柱子
 *    乘以当前柱子的高度
 *
 */

// @lc code=start
/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  const l = []; // 存放每个元素左边最近更小的元素下标
  const r = []; // 存放每个元素右边最近更小的元素下标
  const s = []; // 求最近小于关系，维护栈内元素单调递减性质

  for (let i = 0; i < heights.length; i++) {
    // 当有重复元素的情况，如 2 3 3 3 2，求最后一个 3 的左右最近更小元素时
    // 如果使用 <，只有第一个 3 求得的左边的最近更小元素是正确的
    // 如果使用 <=，就只有最后一个 3 求得的右边最近更小元素是正确的
    while (s.length && heights[i] <= heights[s[s.length - 1]]) {
      r[s.pop()] = i;
    }

    if (!s.length) l[i] = -1; // 左边最近更小元素不存在，使用 -1
    else l[i] = s[s.length - 1];

    s.push(i);
  }

  while (s.length) {
    r[s.pop()] = heights.length; // 右边最近更小元素不存在时，使用 heights.length
  }

  let max = 0;
  for (let i = 0; i < heights.length; i++) {
    let temp = heights[i] * (r[i] - l[i] - 1);
    max = Math.max(max, temp);
  }

  return max;
};
// @lc code=end
