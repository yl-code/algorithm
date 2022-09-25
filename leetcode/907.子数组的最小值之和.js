/*
 * @lc app=leetcode.cn id=907 lang=javascript
 *
 * [907] 子数组的最小值之和
 *
 * 思路：
 *    求所有子数组最小值之和
 *    可以看做是求所有子数组表示的连续区间的 RMQ 问题的解的总和
 *    所有子数组可以分为，以原数组中每个元素为固定末尾的连续区间
 *    也就是求以每个元素为固定末尾的 RMQ 问题的解的总和
 *    RMQ(x, i), i 表示原数组每个元素的下标
 *
 *    以 i 为固定末尾的 RMQ(x, i) 问题的解的总和如何求
 *    i 进入单调栈s时，[......j, i]
 *    j 到 i 的区间跨度内，最小值都是 i, 所以 Sum[j+1, i] = arr[i] * (i - j)
 *    j 之前区间 RMQ值之和 + Sum[j+1, i] = Sum(RMQ(x, i))
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
 */
var sumSubarrayMins = function (arr) {
  const s = []; // 维护栈内元素单调递增
  let ret = 0; // 结果
  let sum = [0]; //
  const mod = 1e9 + 7;

  for (let i = 0; i < arr.length; i++) {
    // 正常将元素入栈
    while (s.length && arr[i] < arr[s[s.length - 1]]) s.pop();

    // 此时的栈顶索引 j 指向的元素, 就是左边最近一个比 i 指向的元素, 更小的值
    let pre = s.length ? s[s.length - 1] : -1;
    s.push(i);

    // 使用 sum 数组统计以当前 i 为固定结尾的 RMQ 问题解的总和
    sum[s.length] = sum[s.length - 1] + arr[i] * (i - pre);

    // 统计所有固定末尾的 RMQ问题解
    ret += sum[s.length];
  }

  return ret % mod;
};
// @lc code=end
