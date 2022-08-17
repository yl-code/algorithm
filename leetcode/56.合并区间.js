/*
 * @lc app=leetcode.cn id=56 lang=javascript
 *
 * [56] 合并区间
 *
 * 思路：
 *    区间如何合并？
 *    将区间左端点权值视为 1，区间右端点权值视为 -1
 *    将所有端点，升序排列
 *    依次扫描每个端点，累加权值，每当权值和为 0 时，表示找到一个完整区间
 *    扫描完所有端点后，即可得出合并之后的所有区间
 *
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  let arr = [];

  // 遍历每个区间
  // 定义区间左端点权值为 1，区间右端点权值为 -1
  // 将新构建的 [端点，权值] 元组添加到 arr 中
  for (const [x, y] of intervals) {
    arr.push([x, 1], [y, -1]);
  }

  // 当端点值不相等时，按照端点值升序排列
  // 当端点值相等时，按照权值降序排列
  arr.sort(([x, w1], [y, w2]) => {
    if (x !== y) return x - y;
    return w2 - w1;
  });

  let sum = 0; // 权值和
  let left = -1; // 合并后的区间左端点
  const res = []; // 结果数组

  // 扫描 arr 数组每个元组 [端点，权值]
  for (const [x, w] of arr) {
    if (left < 0) left = x;
    sum += w;

    if (!sum) {
      res.push([left, x]);
      left = -1;
    }
  }

  return res;
};
// @lc code=end
