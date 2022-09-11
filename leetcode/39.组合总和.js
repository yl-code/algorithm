/*
 * @lc app=leetcode.cn id=39 lang=javascript
 *
 * [39] 组合总和
 *
 * 思路：
 *    分析该问题，candidates 中的数字可以被重复使用
 *    那么 元素用和不用 是两种情况
 *    所以分析题目之后，可以得到一个问题求解树，使用深搜即可求出所有答案
 */

// @lc code=start

/**
 *
 * @param {*} ind 当前元素的下标
 * @param {*} nums 原数组 candidates
 * @param {*} target 目标值
 * @param {*} buff 即将被添加到结果数组中的组合数组
 * @param {*} res 结果数组
 */
const dfs = (ind, nums, target, buff, res) => {
  // 搜索终止的边界条件
  if (ind >= nums.length || target < 0) return;

  // 找到一组答案之后，不用继续往下递归
  if (!target) {
    res.push(buff);
    return;
  }

  // 两种情况
  // 要么不将当前元素放进 buff 中，那就开始下一个
  dfs(ind + 1, nums, target, buff, res);

  // 要么就将当前元素放进 buff 中
  // 由于当前元素可以重复使用，所以下一次递归，用和不用该元素又是两种情况
  buff.push(nums[ind]);
  dfs(ind, nums, target - nums[ind], [...buff], res);
  buff.pop(); // 回溯的时候，将该元素拿出来，这样就不会污染 buff
};

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  let res = []; // 结果数组

  dfs(0, candidates, target, [], res);

  return res;
};

// @lc code=end
