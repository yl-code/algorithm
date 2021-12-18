/*
 * @lc app=leetcode.cn id=313 lang=javascript
 *
 * [313] 超级丑数
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[]} primes
 * @return {number}
 *
 * 思路很 easy
 *
 * 就是丑数二的解法的升级版
 *
 * 有几个质因数，就有几个指针，质因数与指针一一对应
 * 同时，指针也指向丑数数组中的 某一个数字
 * 初始指针都指向丑数数组中的 第一个元素
 * 每轮循环，取所有的指针，指针指向的丑数 与 指针对应的质因数 的积 的最小值，放入丑数集
 * 为了防止产生相同的丑数，每个指针计算所得的丑数 与 上一步中产生的丑数相等时，都需要往后移一步
 *
 */
var nthSuperUglyNumber = function (n, primes) {
  // 超级丑数集合，第一位为 0，不算在结果里面
  const data = [1];

  // 指针集合
  const p = new Array(primes.length).fill(0);

  let ugly;
  while (data.length !== n) {
    ugly = Infinity;
    primes.forEach((item, index) => {
      ugly = Math.min(ugly, data[p[index]] * item);
    });

    data.push(ugly);

    primes.forEach((item, index) => {
      if (ugly === data[p[index]] * item) {
        p[index]++;
      }
    });
  }

  return data[n - 1];
};
// @lc code=end
