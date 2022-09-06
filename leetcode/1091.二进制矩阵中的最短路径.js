/*
 * @lc app=leetcode.cn id=1091 lang=javascript
 *
 * [1091] 二进制矩阵中的最短路径
 *
 * 思路：
 *
 *    广搜做法，每次可以扩展 8 个状态，将符合条件的状态入队，直到队列为空
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function (grid) {
  if (grid[0][0]) return -1;

  let n = grid.length;

  // 存放状态的队列，[行号，列号，路径长度]
  let q = [[0, 0, 1]];

  let vis = []; // 用于标记已经遍历的位置

  // 8 个方向的位置偏移量
  let dir = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
  ];
  while (q.length) {
    const [i, j, k] = q.pop();

    // 当前状态符合要求，直接返回路径长度
    if (i === n - 1 && j === n - 1) return k;

    for (let p = 0; p < 8; p++) {
      // 计算出下一个位置的坐标
      let row = i + dir[p][0];
      let col = j + dir[p][1];

      // 判断当前坐标和对应元素是否合法
      if (row < 0 || row >= n) continue;
      if (col < 0 || col >= n) continue;
      if (grid[row][col]) continue;

      vis[row] ||= [];
      if (vis[row][col]) continue;
      vis[row][col] = 1; // 标记已访问

      q.unshift([row, col, k + 1]); // 入队下一个状态
    }
  }

  return -1;
};
// @lc code=end
