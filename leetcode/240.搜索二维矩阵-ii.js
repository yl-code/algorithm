/*
 * @lc app=leetcode.cn id=240 lang=javascript
 *
 * [240] 搜索二维矩阵 II
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  let x = matrix[0].length - 1;
  let y = 0;

  // 根据题目矩阵的特殊性，可以通过矩阵右上角定点来进行查找
  while (x >= 0 && y < matrix.length) {
    let curr = matrix[y][x];
    if (curr === target) return true;
    if (curr > target) {
      x--;
    } else {
      y++;
    }
  }

  return false;
};
// @lc code=end
