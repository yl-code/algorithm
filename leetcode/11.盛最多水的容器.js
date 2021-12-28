/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  // 初始化两个指针
  let [l, r] = [0, height.length - 1];

  // 初始化最大面积为 0
  let max = 0;

  // 当 l < r 时继续循环
  while (l < r) {
    // 每轮循环计算两指针中间的面积，出现更大面积时，更新 max
    let area = Math.min(height[l], height[r]) * (r - l);
    max = Math.max(area, max);

    // 两个指针对应的位置，高度较小的指针，往中间移动
    // 可能中间有高度更高的位置，计算所得的面积更大
    if (height[l] < height[r]) {
      l++;
    } else {
      r--;
    }
  }

  return max;
};
// @lc code=end
