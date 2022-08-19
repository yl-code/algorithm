/*
 * @lc app=leetcode.cn id=491 lang=javascript
 *
 * [491] 递增子序列
 *
 * 思路：
 *    使用递归来求解
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var findSubsequences = function (nums) {
  const res = [];

  /**
   *
   * @param {*} nums 原始数组
   * @param {*} res 结果数组
   * @param {*} temp 临时数组，记录递归过程中产生递增子序列
   * @param {*} index 原始数组中的索引，表示从该索引位置开始往后遍历元素
   */
  const getRes = (nums, res, temp, index) => {
    // if (temp.length > 1)
    res.push(temp);

    for (let i = index; i < nums.length; i++) {
      if (!temp.length || nums[i] >= temp[temp.length - 1]) {
        temp.push(nums[i]);
        getRes(nums, res, temp, index + 1);
      }
    }
  };

  getRes(nums, res, [], 0);
  console.log(res);
  return res;
};
// @lc code=end
