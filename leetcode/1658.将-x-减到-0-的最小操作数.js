/*
 * @lc app=leetcode.cn id=1658 lang=javascript
 *
 * [1658] 将 x 减到 0 的最小操作数
 *
 * 思路：
 *    题意可以理解为在原数组 nums 中，左边挑选一些数字，右边挑选一些数字，当和为目标值 x 时，最少的数字个数
 *    左边数字和 sum_l + 右边数字和 sum_r = 目标值 x
 *    所以可以想到用前缀和数组来解题
 *
 *    ！！！前缀和数组的下标，就代表了原数组中数字的个数
 *
 *    分别求得左右两边为首元素的前缀和数组，依次扫描左边前缀和 preSum_L 中的每个元素 preSum_L[i]
 *    如果能在右边前缀和 preSum_R 中，找到 preSum_R[j] =  x - preSum_L[i]
 *    那么 i + j 就是一组结果
 *    最后只用在得到的结果中，返回最小的 i + j 即可
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} x
 * @return {number}
 */
var minOperations = function (nums, x) {
  let sumL = [0];
  let sumR = [0];

  // 从左边开始扫描的前缀和
  for (let i = 0; i < nums.length; i++) {
    sumL[i + 1] = sumL[i] + nums[i];
  }

  // 从右边开始扫描的前缀和
  for (let i = nums.length - 1; i >= 0; i--) {
    sumR[nums.length - i] = sumR[nums.length - i - 1] + nums[i];
  }

  let res = -1;
  for (let i = 0; i < sumL.length; i++) {
    const j = binary_search(sumR, x - sumL[i]);
    if (j < 0) continue; // 找不到满足条件的 sumR[j]
    if (i + j > nums.length) continue; // 找到的数量超过原数组的长度了，比如这个测试用例: [1,1,1,1] 6
    if (res === -1 || res > i + j) res = i + j; // 记录最小的 i+j
  }
  return res;
};

const binary_search = (nums, x) => {
  let head = 0;
  let tail = nums.length - 1;
  let mid;

  while (head <= tail) {
    mid = (head + tail) >> 1;

    if (nums[mid] === x) return mid;
    if (nums[mid] > x) {
      tail = mid - 1;
    } else {
      head = mid + 1;
    }
  }

  return -1;
};
// @lc code=end
