/*
 * @lc app=leetcode.cn id=491 lang=javascript
 *
 * [491] 递增子序列
 *
 * 思路：
 *    递归
 *
 *
 *
 */

// @lc code=start

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var findSubsequences = function (nums) {
  let res = [];

  /**
   * 求以 start 为起始索引位，与后续元素组成的，符合要求的子序列
   *
   * @param {*} start 遍历原数组的起始索引
   * @param {*} temp 递归过程中，将被添加到 res 中的临时数组
   */
  const getRes = (start, temp) => {
    temp = [...temp]; // 由于 js 函数的参数是传值特性，这里复制一份 temp 数组

    if (temp.length > 1) {
      res.push(temp);
    }

    let selected = [];
    for (let i = start; i < nums.length; i++) {
      if (!temp.length || temp[temp.length - 1] <= nums[i]) {
        // 去重策略
        // 原数组中可能存在重复的数字，如：4 6 7 7
        // 那么在递归过程中，就可能出现两个 [4，7] 都被添加到 res 中
        // 所以，可以在本次遍历中，记录每个选中的数字，判断当前数字是否被选择过，即可去重
        if (selected.includes(nums[i])) continue;

        temp.push(nums[i]);
        selected.push(nums[i]);

        getRes(i + 1, temp);
        temp.pop(); // 保证下次迭代，temp 数组不包含上一个数字
      }
    }
  };

  getRes(0, []);
  return res;
};
findSubsequences([5, 6, 7, 7]);
// @lc code=end
