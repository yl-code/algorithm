/*
 * @lc app=leetcode.cn id=130 lang=javascript
 *
 * [130] 被围绕的区域
 *
 * 思路：
 *    题目要求出所有被 X 围住的 O
 *    逆向思维，找出所有没有被 X 包围的 O 是不是更容易一些
 *    所谓没有被 X 包围的 O 一定是与矩阵边边相邻接的
 *    所以从矩阵的4边开始中的 O 开始搜索，找到与该 O 相连的所有 O 即可
 *    这一看就是要进行深搜
 *
 *    找到所有没被包围的 O 替换为 -，矩阵中剩余的 O 都是被包围的
 *    最后遍历矩阵所有元素，将剩余 O 替换为 X，将 - 替换为 O
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function (board) {
  let row = board.length;
  let col = board[0].length;

  // 坐标偏移量 上右下左
  const dir = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  // 深搜，将相邻的 O 标记为 -
  const dfs = (x, y, board) => {
    board[x][y] = '-';

    for (let p = 0; p < 4; p++) {
      const r = x + dir[p][0];
      const c = y + dir[p][1];

      if (r < 0 || r >= row) continue;
      if (c < 0 || c >= col) continue;
      if (board[r][c] !== 'O') continue;

      dfs(r, c, board);
    }
  };

  // 从矩阵边缘的元素开始搜索所有相邻的 O
  for (let j = 0; j < col; j++) {
    if (board[0][j] === 'O') dfs(0, j, board); // 上边
    if (board[row - 1][j] === 'O') dfs(row - 1, j, board); // 下边
  }
  for (let i = 0; i < row; i++) {
    if (board[i][0] === 'O') dfs(i, 0, board); // 左边
    if (board[i][col - 1] === 'O') dfs(i, col - 1, board); // 右边
  }

  // 最后遍历所有元素将 - 替换为 O, 将 O 替换为 X 即可
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (board[i][j] === '-') board[i][j] = 'O';
      else if (board[i][j] === 'O') board[i][j] = 'X';
    }
  }
};

// @lc code=end
