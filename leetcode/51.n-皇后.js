/*
 * @lc app=leetcode.cn id=51 lang=javascript
 *
 * [51] N 皇后
 *
 * 思路：
 *    这种明显就是深搜的题：放第一个皇后之后，再第二个皇后，再第三个...，直到找到一组答案
 *    由于两个皇后不能共存于同 横竖斜条线
 *    所以可以按照每行一个皇后来放，下一个皇后放置前做一下位置合法性判断即可
 *
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  let res = [];
  let chessboard = new Array(n).fill(new Array(n).fill('.')); // 初始化棋盘

  dfs(0, chessboard, res);

  transformRes(res);
  return res;
};

/**
 * 将结果转换成题目要求的样子
 */
const transformRes = (res) => {
  res.forEach((cb, index) => {
    res[index] = cb.map((row) => row.join(''));
  });
};

/**
 * 深搜
 *
 * @param {*} row 行号
 * @param {*} cb 棋盘
 * @param {*} res 结果数组
 */
const dfs = (row, cb, res) => {
  cb = cb.map((row) => [...row]); // js 语言特性 需要特殊处理

  if (row === cb.length) {
    res.push(cb); // 当所有行都放置皇后，表示找到一组答案
    return;
  }

  for (let col = 0; col < cb.length; col++) {
    if (!check(row, col, cb)) continue; // 位置不合法

    cb[row][col] = 'Q'; // 当前位置放置皇后
    dfs(row + 1, cb, res); // 继续放下一个皇后
    cb[row][col] = '.'; // 还原棋盘，进行下一个位置的合法性判断
  }
};

/**
 *
 * @param {*} row 行号
 * @param {*} col 列号
 * @param {*} cb 棋盘
 *
 * 判断当前当前位置是否能放置皇后
 */
const check = (row, col, cb) => {
  // 检查当前位置 同列上方 是否有皇后
  for (let i = row; i >= 0; i--) {
    if (cb[i][col] === 'Q') return false;
  }

  // 检查当前位置 左上方 是否有皇后
  for (let r = row - 1, c = col - 1; r >= 0 && c >= 0; r--, c--) {
    if (cb[r][c] === 'Q') return false;
  }

  // 检查当前位置 右上方 是否有皇后
  for (let r = row - 1, c = col + 1; r >= 0 && c < cb.length; r--, c++) {
    if (cb[r][c] === 'Q') return false;
  }

  return true;
};
// @lc code=end
