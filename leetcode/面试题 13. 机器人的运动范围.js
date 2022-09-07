/**
 * 面试题 13. 机器人的运动范围
 * https://leetcode.cn/problems/ji-qi-ren-de-yun-dong-fan-wei-lcof/
 *
 * 地上有一个m行n列的方格，从坐标 [0,0] 到坐标 [m-1,n-1]。
 * 一个机器人从坐标 [0, 0] 的格子开始移动，它每次可以向左、右、上、下移动一格
 * （不能移动到方格外），也不能进入行坐标和列坐标的数位之和大于k的格子。
 * 例如，当k为18时，机器人能够进入方格 [35, 37] ，因为3+5+3+7=18。
 * 但它不能进入方格 [35, 38]，因为3+5+3+8=19。
 * 请问该机器人能够到达多少个格子？
 *
 * 1 <= n,m <= 100
 * 0 <= k <= 20
 *
 */

/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var movingCount = function (m, n, k) {
  let sum = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      sum[i * 10 + j] = i + j; // 0～99 的数字和，如 99 -> 18
    }
  }

  // 上右下左坐标的偏移量
  const dir = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ];

  let set = new Set([0]); // 用于坐标去重

  const q = [[0, 0]]; // 队列 坐标状态：[行号，列号]

  let res = 0;
  while (q.length) {
    const [i, j] = q.pop();
    res += 1;

    for (let p = 0; p < 4; p++) {
      const row = i + dir[p][0];
      const col = j + dir[p][1];

      if (row < 0 || row >= m) continue;
      if (col < 0 || col >= n) continue;
      if (sum[row] + sum[col] > k) continue;

      const num = row * n + col; // 坐标编号
      if (set.has(num)) continue;

      set.add(num);
      q.unshift([row, col]);
    }
  }

  return res;
};
