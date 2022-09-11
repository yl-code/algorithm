/*
 * @lc app=leetcode.cn id=473 lang=javascript
 *
 * [473] 火柴拼正方形
 *
 * 思路：
 *    根据题意可以算出正方形边长 n
 *    假设有 4 个桶，每个桶的容量为 n
 *    所以题目转换为 将所有火柴往这四个桶里放，能刚好放满则返回 true，否则返回 false
 *    这就是典型的可以用深搜来解的题
 */

// @lc code=start
/**
 * @param {number[]} matchsticks
 * @return {boolean}
 */
var makesquare = function (matchsticks) {
  let sum = matchsticks.reduce((x, y) => x + y);
  if (sum % 4) return false;

  // 初始化 4 个桶，容量为正方形边长
  let bucket = new Array(4).fill(sum / 4);

  // 将火柴排个序，matchsticks[0] 就是最短的，然后由长及短开始处理火柴
  matchsticks.sort((a, b) => a - b);
  return dfs(matchsticks.length - 1, bucket, matchsticks);
};

/**
 *
 * @param {*} ind 当前被处理的木棍索引
 * @param {*} bucket 每个桶的容量数组
 * @param {*} matchsticks 火柴数组
 */
const dfs = (ind, bucket, matchsticks) => {
  // 由下面的深搜操作可知，当所有火柴能够被全部遍历完，则可以返回 true
  if (ind === -1) return true;

  // 将当前火柴尝试 依次往四个桶里放
  for (let i = 0; i < 4; i++) {
    // 如果火柴长度大于当前桶的余量，直接跳过不用尝试了
    if (matchsticks[ind] > bucket[i]) continue;

    // 这里的判断条件属于剪枝优化
    // 当火柴入桶之后，桶还有余量
    // 但桶余量 小于 还未处理的最短火柴长度，则当前这样放一定得不到答案
    if (
      bucket[i] > matchsticks[ind] &&
      bucket[i] - matchsticks[ind] < matchsticks[0]
    )
      continue;

    bucket[i] -= matchsticks[ind];
    if (dfs(ind - 1, bucket, matchsticks)) return true;
    bucket[i] += matchsticks[ind];
  }

  // 当前火柴不管怎么放，都没有返回 true，那就只能返回 false
  // 也就遍历不了所有火柴了
  return false;
};
// @lc code=end
