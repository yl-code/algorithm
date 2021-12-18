/*
 * @lc app=leetcode.cn id=1753 lang=javascript
 *
 * [1753] 移除石子的最大得分
 */

// @lc code=start
/**
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number}
 */
var maximumScore = function (a, b, c) {
  let score = 0;
  if (a > b) [a, b] = [b, a];
  if (a > c) [a, c] = [c, a];
  if (b > c) [b, c] = [c, b];

  // step 1
  if (a <= c - b) {
    c -= a;
    score += a;
  } else {
    a = a - (c - b);
    score += c - b;
    c = b;

    // step 2
    if (a % 2) {
      a -= 1;
    }
    b = b - a / 2;
    c = c - a / 2;
    score += a;
  }

  // step 3
  score += b;

  return score;
};
// @lc code=end
