/*
 * @lc app=leetcode.cn id=45 lang=javascript
 *
 * [45] 跳跃游戏 II
 *
 * 思路：
 *    每次跳跃之前，先观察一波，在射程范围内找到一个 能跳更远的位置 为本次跳跃的目标
 *
 *    观察一波，指的就是挨个扫描射程范围内的数字，扫描完之后再跳
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

var jump = function (nums) {
  let l; // 射程范围
  let r;
  let land = 0; // 着陆点，初始位置为 0
  let res = 0;

  while (land < nums.length - 1) {
    // 计算射程
    l = land;
    r = land + nums[land];

    // 如果射程已经能跳到最后一个位置，直接返回结果
    if (r >= nums.length - 1) return res + 1;

    // 观察一波，找到能跳的最远的地方，作为本次跳跃的着陆点
    for (let i = l; i <= r; i++) {
      if (i + nums[i] > land + nums[land]) {
        land = i;
      }
    }

    res++; // 记录跳跃次数
  }

  return res;
};
// @lc code=end
