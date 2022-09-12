/*
 * @lc app=leetcode.cn id=862 lang=javascript
 *
 * [862] 和至少为 K 的最短子数组
 *
 * 思路：
 *    题目要求和为 k 的最短的非空连续子数组
 *    可以想到肯定需要用到前缀和数组
 *    依次扫描前缀和数组的每个元素，s[i]
 *      从 0 到 i 区间的最小元素为 s[j]
 *      如果当 s[i] - s[j] >= k 时，表示此时已经找到一组答案
 *      但可能 j 到 i 不是最短子树组
 *      所以可以尝试用 [0, i] 区间的第二小元素 s[m]，判断是否满足条件
 *      同理可以尝试第三小的元素...
 *      此时，可以想到使用区间 [0, i] 的单调队列来快速找到第 n 小的元素
 *    当前缀和数组扫描完成，答案就出现了
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var shortestSubarray = function (nums, k) {
  // 求前缀和
  let sum = [0];
  for (let i = 0; i < nums.length; i++) {
    sum[i + 1] = nums[i] + sum[i];
  }

  let q = []; // 单调队列
  let pre = -1;
  let res = -1;
  for (let i = 0; i < sum.length; i++) {
    // 单调队列中存的是对应元素的下标，方便计算区间长度
    while (q.length && sum[q[q.length - 1]] > sum[i]) q.pop();
    q.push(i);

    // 在单调递增的队列中，找到满足条件的 最大的队首元素
    while (q.length && sum[i] - sum[q[0]] >= k) {
      pre = q.shift();
    }

    // 在前缀和数组中，i - j 的结果，是 [j+1, i] 对应原数组的元素和，所以是 i-pre
    // 这里表示找到一组答案，或者找到更短的答案
    if (pre !== -1 && (res === -1 || res > i - pre)) res = i - pre;
  }

  return res;
};
// @lc code=end
