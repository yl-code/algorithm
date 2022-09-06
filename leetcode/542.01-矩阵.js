/*
 * @lc app=leetcode.cn id=542 lang=javascript
 *
 * [542] 01 矩阵
 *
 * 思路：
 *    广度优先搜索的做法
 *    先将所有的元素 0 添加到队列中，然后弹出队首元素，扩展出与其距离为 1 的元素入队，以此操作扩展出距离为 2 的元素...
 */

// @lc code=start
/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function (mat) {
  let vis = []; // 访问矩阵
  let q = []; // 队列
  let m = mat.length; // 行数
  let n = mat[0].length; // 列数

  // 坐标偏移量
  let dir = [
    [-1, 0], // 上
    [0, 1], // 右
    [1, 0], // 下
    [0, -1], // 左
  ];

  init_queue_vis(q, m, n, vis, mat); // 对访问矩阵和队列进行初始化

  while (q.length) {
    const [i, j, k] = q.pop(); // 取出状态

    for (let p = 0; p < 4; p++) {
      let row = i + dir[p][0]; // 根据坐标偏移量算出 上右下左 四个位置的坐标 [row, col]
      let col = j + dir[p][1];

      // 边界值判断
      if (row >= m || row < 0) continue;
      if (col >= n || col < 0) continue;
      if (vis[row][col] != -1) continue;

      vis[row][col] = k + 1; // 记录当前元素到 0 的距离

      q.unshift([row, col, k + 1]); // 将扩展出的新状态入队
    }
  }

  return vis;
};

const init_queue_vis = (q, m, n, vis, mat) => {
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (!vis[i]) vis[i] = []; // 初始化矩阵

      // 当前位置在当原始矩阵中为 0 时
      if (mat[i][j] === 0) {
        // 将初始状态添加到队列中
        // 即所有数字 0 添加到队列中
        q.unshift([
          i, // 行号
          j, // 列号
          0, // 距离数字 0 的最短距离
        ]);

        vis[i][j] = 0;
      } else {
        // 用 -1 表示当前位置元素不为 0，且还未访问
        vis[i][j] = -1;
      }
    }
  }
};
// @lc code=end
