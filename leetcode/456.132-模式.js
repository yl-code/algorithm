/*
 * @lc app=leetcode.cn id=456 lang=javascript
 *
 * [456] 132 模式
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var find132pattern = function (nums) {
  const s = [];
  const l = [Number.MAX_SAFE_INTEGER]; // 存放每个元素左边的区间中最小的元素

  // 使用 l 数组记录原数组中，每个元素左边区间内，最小的元素
  for (let i = 1; i < nums.length; i++) {
    l[i] = Math.min(l[i - 1], nums[i - 1]);
  }

  for (let i = nums.length - 1; i >= 0; i--) {
    let top;
    while (s.length && nums[i] > nums[s[s.length - 1]]) {
      top = s.pop();
    }

    s.push(i);

    // 此时的 top 是 nums[i] 与其右边区间中最近更大的元素 nums[j] 形成的 [i+1, j-1] 中的最大值
    // 然后判断 top 是否符合要求 ？？？
    if (l[i] < nums[i] && l[i] < nums[top] && nums[i] > nums[top]) return true;
  }

  return false;
};
// @lc code=end
