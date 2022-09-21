/*
 * @lc app=leetcode.cn id=1856 lang=javascript
 *
 * [1856] 子数组最小乘积的最大值
 *
 * 思路：
 *    根据最小乘积的定义，如果确定了非空子数组的最小值，那么这个非空连续子数组的范围也能找到
 *    假定当前值为最小值，在原数组中分别找到左右两边最近更小的元素，这俩之间就是子数组的范围
 *
 *    所以可以遍历原数组，以当前值为最小值，都可以找到一个非空子数组的区间
 *    最小乘积，也就是求当前值与相应非空子数组的区间和的乘机
 *    看到区间和，就可以用到前缀和数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSumMinProduct = function (nums) {
  let l = new Array(nums.length).fill(-1); // 左边最近更小元素的下标，没有就是 -1
  let r = new Array(nums.length).fill(nums.length); // 右边最近更小元素的下标，没有就是 nums.length
  let s = []; // 要求最近更小关系，所以维护栈内元素单调递减

  for (let i = 0; i < nums.length; i++) {
    while (s.length && nums[i] <= nums[s[s.length - 1]]) {
      r[s.pop()] = i;
    }

    if (s.length) l[i] = s[s.length - 1];

    s.push(i);
  }

  let sum = [0];
  for (let i = 0; i < nums.length; i++) {
    sum[i + 1] = sum[i] + nums[i];
  }

  let ret = BigInt(0);
  for (let i = 0; i < nums.length; i++) {
    /**
     *  ind: 0 1 2 3 4
     *  num: 1 2 3 1 1
     *  sum: 0 1 3 6 7 8
     *  sum[j] 其实是原数组 num[0, j-1] 区间的和
     */
    let temp = BigInt(nums[i]) * BigInt(sum[r[i]] - sum[l[i] + 1]);
    if (temp > ret) ret = temp;
  }

  return ret % BigInt(1e9 + 7);
};
// @lc code=end
