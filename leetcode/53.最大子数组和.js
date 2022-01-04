/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子数组和
 *
 * 思路很简单
 *
 * 看到求子数组和，就能想到前缀和数组
 *
 * 原数组中某个子数组 [i+1, j] 的元素和 === 前缀和数组中某两项元素之差 sum[j] - sum[i]
 *
 * 要想原数组中子数组的元素和最大，就需要保证前缀和中的两个元素之差最大
 * 也就是 sum[j] 确定时，sum[i] 尽可能的小
 *
 * 所以，遍历前缀和数组，维护当前元素 sum[j] 之前元素中的最小值 min
 * 同时记录一个当前元素减去最小值得出的差的最大值 max = sum[j] - min
 * 最后返回 max
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  // 构建前缀和数组
  const sum = new Array(nums.length + 1).fill(0);
  for (let i = 0; i < nums.length; i++) {
    sum[i + 1] = sum[i] + nums[i];
  }

  // 初始化最小元素 sum[0]，最大子数组和为 sum[1]
  let min = sum[0];
  let max = sum[1];

  for (let j = 1; j < sum.length; j++) {
    max = Math.max(max, sum[j] - min);
    min = Math.min(min, sum[j]);
  }

  return max;
};
// @lc code=end
