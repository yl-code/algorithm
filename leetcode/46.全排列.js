/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 *
 * 思路：
 *    使用深搜的做法
 *    每次递归在数组中取一个没有使用过的数字，组合起来即可
 *    当选择 1 个数字后，剩下还有 n-1 个数字可以被选
 *    所以在回溯的过程，取消当前选择的数字，而是选择另一个数字，再次进行递归选择余下未被使用的数字
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  let res = [];
  dfs(nums, res, [], []);

  return res;
};

/**
 *
 * @param {*} nums 原数组
 * @param {*} res 结果数组
 * @param {*} temp 临时数组，存放一个排列结果
 * @param {*} use 标记数组，标记原数组中的数字是否被使用了
 * @returns
 */
const dfs = (nums, res, temp, use) => {
  if (temp.length === nums.length) {
    res.push(Array.from(temp)); // 断开 temp 引用
    return;
  }

  for (let i = 0; i < nums.length; i++) {
    // 遍历 nums 中的数字，若当前数字被使用过，则 continue
    if (use[i]) continue;

    temp.push(nums[i]);
    use[i] = 1;
    dfs(nums, res, temp, use);
    temp.pop();
    use[i] = 0; // 回溯时，取消当前选择的数字，然后选择下一个数字
  }
};
// @lc code=end
