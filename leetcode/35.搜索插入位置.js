/*
 * @lc app=leetcode.cn id=35 lang=javascript
 *
 * [35] 搜索插入位置
 *
 * 思路：
 *    一看就是二分查找，典型的 01模型
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  if (nums[nums.length - 1] < target) return nums.length;

  let head = 0;
  let tail = nums.length - 1;
  let mid;

  while (head < tail) {
    mid = ((tail - head) >> 1) + head;
    if (nums[mid] < target) {
      head = mid + 1;
    } else {
      tail = mid;
    }
  }

  return head;
};
// @lc code=end
