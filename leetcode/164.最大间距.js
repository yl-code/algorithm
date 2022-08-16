/*
 * @lc app=leetcode.cn id=164 lang=javascript
 *
 * [164] 最大间距
 *
 * 根据题目要求：需要在线性时间内，使用线性的额外空间解题，且数组中的元素数值都比较大
 * 所以应该使用基数排序，不能使用 快速排序、归并排序等
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumGap = function (nums) {
  let count = [];
  let temp = [];

  // 先按照低 16 位排序
  for (const x of nums) {
    const low_16 = x % 65536;
    count[low_16] ||= 0;
    count[low_16]++;
  }

  for (let i = 1; i < count.length; i++) {
    count[i] ||= 0;
    count[i - 1] ||= 0;
    count[i] += count[i - 1];
  }

  for (let i = nums.length - 1; i >= 0; i--) {
    const low_16 = nums[i] % 65536;
    temp[--count[low_16]] = nums[i];
  }

  // 清空 count 数组
  count = [];

  // 再按照高 16 位排序
  for (const x of temp) {
    const high_16 = Math.floor(x / 65536);
    count[high_16] ||= 0;
    count[high_16]++;
  }

  for (let i = 1; i < count.length; i++) {
    count[i] ||= 0;
    count[i - 1] ||= 0;
    count[i] += count[i - 1];
  }

  for (let i = temp.length - 1; i >= 0; i--) {
    const high_16 = Math.floor(temp[i] / 65536);
    nums[--count[high_16]] = temp[i];
  }

  let max = 0;
  for (let i = 1; i < nums.length; i++) {
    max = Math.max(max, nums[i] - nums[i - 1]);
  }

  return max;
};
// @lc code=end
