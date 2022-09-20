/*
 * @lc app=leetcode.cn id=503 lang=javascript
 *
 * [503] 下一个更大元素 II
 *
 * 思路：
 *    要求数组中，每个元素的，下一个更大的元素，所以使用 单调递减栈 的思想来做
 *    原数组位循环数组，所以将原数组入栈两次
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function (nums) {
  let stack = [];
  let ret = new Array(nums.length).fill(-1);

  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[i] > nums[stack[stack.length - 1]]) {
      ret[stack.pop()] = nums[i];
    }
    stack.push(i);
  }

  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[i] > nums[stack[stack.length - 1]]) {
      ret[stack.pop()] = nums[i];
    }
    stack.push(i);
  }

  return ret;
};
// @lc code=end
