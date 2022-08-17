/*
 * @lc app=leetcode.cn id=1288 lang=javascript
 *
 * [1288] 删除被覆盖区间
 *
 * 思路：
 *    区间排序问题
 *    题目只需要求删除区间之后剩余区间的数量，所以只用统计被包含区间的数量即可
 *    先讲区间进行左端点升序排列，右端点降序排列
 *    通过比较排序之后的，相邻区间的右端点的大小，即得出相邻区间的包含关系
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var removeCoveredIntervals = function (intervals) {
  // 先将区间数组排序
  // 左端点不相同时，进行升序排列
  // 左端点相同时，进行降序排列
  intervals.sort(([x1, y1], [x2, y2]) => {
    if (x1 !== x2) return x1 - x2;
    return y2 - y1;
  });

  let cnt = 0;
  let right = -1;

  // 遍历排序之后的区间数组
  // 根据区间排序的规则可知
  // 若前一个区间 a 的右端点，大于后一个区间 b 的左端点，那么 a 一定包含 b
  // 因为这俩区间的左端点关系为 a.left <= b.left
  for (const [x, y] of intervals) {
    if (right >= y) {
      cnt++;
    } else {
      right = y;
    }
  }

  return intervals.length - cnt;
};
// @lc code=end
