/*
 * @lc app=leetcode.cn id=54 lang=javascript
 *
 * [54] 螺旋矩阵
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder_1 = function (matrix) {
  let top = 0,
    right = matrix[0].length - 1,
    bottom = matrix.length - 1,
    left = 0,
    res = [];

  while (top <= bottom && left <= right) {
    for (let i = left; i <= right; i++) res.push(matrix[top][i]);
    top++;

    for (let i = top; i <= bottom; i++) res.push(matrix[i][right]);
    right--;

    if (top > bottom || left > right) break;

    for (let i = right; i >= left; i--) res.push(matrix[bottom][i]);
    bottom--;

    for (let i = bottom; i >= top; i--) res.push(matrix[i][left]);
    left++;
  }

  return res;
};

var spiralOrder = function (matrix) {
  const maxRow = matrix.length;
  const maxColumn = matrix[0].length;
  const res = [];

  for (let count = 0, x = -1, y = 0, loop = 0, allCount = maxRow * maxColumn; count < allCount; loop++) {
    // 👉
    while (count < allCount && x + 1 <= maxColumn - 1 - loop) {
      count++;
      x++;
      res.push(matrix[y][x]);
    }

    // 👇
    while (count < allCount && y + 1 <= maxRow - 1 - loop) {
      count++;
      y++;
      res.push(matrix[y][x]);
    }

    // 👈
    while (count < allCount && x - 1 >= loop) {
      count++;
      x--;
      res.push(matrix[y][x]);
    }

    // 👆
    while (count < allCount && y - 1 > loop) {
      count++;
      y--;
      res.push(matrix[y][x]);
    }
  }
  return res;
};
// @lc code=end
