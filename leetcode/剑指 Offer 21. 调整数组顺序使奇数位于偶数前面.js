/**
 * 剑指 Offer 21. 调整数组顺序使奇数位于偶数前面
 * https://leetcode.cn/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof/
 *
 * 输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有奇数在数组的前半部分，所有偶数在数组的后半部分。
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var exchange = function (nums) {
  let l = 0;
  let r = nums.length - 1;

  while (l < r) {
    while (nums[l] % 2 !== 0 && l < nums.length) l++;
    while (nums[r] % 2 === 0 && r >= 0) r--;

    if (l < r) {
      [nums[l], nums[r]] = [nums[r], nums[l]];
      l++;
      r--;
    }
  }

  return nums;
};
