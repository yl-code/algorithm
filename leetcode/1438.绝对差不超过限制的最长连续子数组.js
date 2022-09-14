/*
 * @lc app=leetcode.cn id=1438 lang=javascript
 *
 * [1438] 绝对差不超过限制的最长连续子数组
 *
 * 思路：
 *    原数组中的 连续子数组 中的任意两个元素之差的绝对值 小于 limit
 *    求这个 连续子数组 的长度
 *
 *    首先，这个连续子数组相当于一个滑动窗口，用两个单调队列维护其中的最大值和最小值
 *        当这俩最值的差值 <= limit 时，说明此时滑动窗口的长度满足题目要求
 *    其次，题目要求最长的这个连续子数组的长度 l，其取值范围为 [0, nums.length]
 *        当 子数组长度小于 l 时都可以满足题意，所以这是典型的 10二分模型
 *    所以，使用二分查找到合适的长度 l，然后以 l 为滑动窗口的长度，扫描数组，判断其中的两个最值之差是否符合 limit 的要求
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} limit
 * @return {number}
 */
var longestSubarray = function (nums, limit) {
  return bs(1, nums.length, limit, nums);
};

/**
 *
 * 二分查找可能的长度
 *
 * l 和 r 指的都是元素个数
 * @param {*} l 区间左端点
 * @param {*} r 区间右端点
 * @param {*} limit
 * @param {*} nums
 *
 * 这是典型的 10 模型，[l, r] 是单调递增区间
 * 中间值 m 若符合条件，那么[l, m] 都符合条件
 * => 11110?
 */
const bs = (l, r, limit, nums) => {
  if (l === r) return l;

  let mid = (l + r + 1) >> 1; // 10模型 这里要加 1 ???

  if (check(mid, limit, nums)) l = mid;
  else r = mid - 1;

  return bs(l, r, limit, nums);
};

/**
 *
 * @param {*} k
 * @param {*} limit
 * @param {*} nums
 */
const check = (k, limit, nums) => {
  let min = [];
  let max = [];
  for (let i = 0; i < nums.length; i++) {
    while (min.length && nums[min[min.length - 1]] > nums[i]) min.pop();
    while (max.length && nums[max[max.length - 1]] < nums[i]) max.pop();
    max.push(i);
    min.push(i);

    if (i + 1 < k) continue; // 当前滑动窗口内没有 k 个元素时，直接 continue

    // 队首元素超过滑动窗口范围
    if (i - max[0] === k) max.shift();
    if (i - min[0] === k) min.shift();

    // 若此时，滑动窗口中最值之差 满足条件就可以直接返回 true
    if (nums[max[0]] - nums[min[0]] <= limit) return true;
  }

  return false;
};
// @lc code=end
