/*
 * @lc app=leetcode.cn id=494 lang=javascript
 *
 * [494] 目标和
 *
 * 思路：
 *    暴力枚举每个可能的情况
 *
 *    可以使用 hash 表进行搜索结果的优化，将已经搜索过的结果进行缓存
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
  let map = new Map(); // 记忆已搜索数据
  return dfs(0, target, nums, map);
};

/**
 *
 * @param {*} i 当前元素的下标
 * @param {*} target 目标值
 * @param {*} nums 原数组
 * @returns
 */
const dfs = (i, target, nums, map) => {
  // 当元素下标等于 nums 的长度时，target 为 0 则说明找到一组答案
  if (i === nums.length) return !!(target === 0);

  let key = `${i}-${target}`;
  // 如果当前 i 与 target，已经计算过了，就直接返回结果
  if (map.get(key) != undefined) return map.get(key);

  let res = 0;
  // 每个元素都有两种情况
  res += dfs(i + 1, target - nums[i], nums, map); // -
  res += dfs(i + 1, target + nums[i], nums, map); // +

  // 记忆搜索结果
  map.set(key, res);
  return res;
};
// @lc code=end
