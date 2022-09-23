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
  const s = []; // 要求最近更大关系，所以维护元素单调递减
  const m = new Map(); // 使用 map 存储右边最近更大关系，空间换时间

  for (let i = 0; i < nums2.length; i++) {
    while (s.length && nums2[s[s.length - 1]] < nums2[i]) {
      m.set(nums2[s.pop()], nums2[i]);
    }

    s.push(i);
  }

  while (s.length) {
    m.set(nums2[s.pop()], -1);
  }

  const ret = [];
  for (let i = 0; i < nums1.length; i++) {
    ret[i] = m.get(nums1[i]);
  }

  return ret;
};
// @lc code=end
