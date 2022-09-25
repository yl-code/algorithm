/*
 * @lc app=leetcode.cn id=496 lang=javascript
 *
 * [496] 下一个更大元素 I
 *
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
  let s = [];
  let m = new Map(); // 使用 map 存储 nums2 中的每个元素右边更大的元素

  for (let i = 0; i < nums2.length; i++) {
    while (s.length && nums2[i] > nums2[s[s.length - 1]]) {
      m.set(nums2[s.pop()], nums2[i]);
    }
    s.push(i);
  }
  while (s.length) {
    m.set(nums2[s.pop()], -1);
  }

  return nums1.map((i) => m.get(i));
};
// @lc code=end
