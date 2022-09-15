/*
 * @lc app=leetcode.cn id=1760 lang=javascript
 *
 * [1760] 袋子里最少数目的球
 *
 * 思路：
 *    题目要求进行最多 maxOperations 次操作，将 nums 中的数字进行拆分，一顿拆分操作之后的这堆数字中的最大值 m 要尽可能的小
 *
 *    首先这个 m 的最小值是 1，最大值是原 nums 中的最大值 max
 *    当 m 满足条件的时，m+1 一定满足条件，m-1 一定不满足条件，因为拆分的越小操作步骤越多
 *    所以这就是典型的 二分01 模型
 *
 *    那么判断 m‘ 是否符合条件的函数 check 怎么设计？
 *    遍历 nums 中的数字，小于 m’ 的数字不用管，大于 m‘ 的数字才需要拆分
 *    统计所有数字需要拆分的次数，若次数大于 maxOperations 则当前 m' 不符合要求
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} maxOperations
 * @return {number}
 */
var minimumSize = function (nums, maxOperations) {
  let l = 1;
  let r = 0;
  for (const i of nums) r = Math.max(r, i);

  let mid;
  while (l < r) {
    mid = (l + r) >> 1;

    if (check(mid, maxOperations, nums)) r = mid;
    else l = mid + 1;
  }

  return l;
};

const check = (k, max, nums) => {
  let sum = 0;
  for (const i of nums) {
    sum += Math.ceil(i / k) - 1; // 统计需要拆分的次数
    /**
     * eg:
     *  9 拆分成 5 最少需要 1 步
     *  9 拆分成 3 最少需要 2 步
     *  9 拆分成 2 最少需要 4 步
     */
  }

  return sum <= max;
};
// @lc code=end
