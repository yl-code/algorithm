/*
 * @lc app=leetcode.cn id=187 lang=javascript
 *
 * [187] 重复的DNA序列
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[]}
 */
var findRepeatedDnaSequences = function (s) {
  let m = new Map();
  for (let i = 0, j = s.length - 9; i < j; i++) {
    let str = s.slice(i, i + 10);
    let num = m.get(str);
    if (num) {
      m.set(str, num + 1);
    } else {
      m.set(str, 1);
    }
  }

  let res = [];
  for (const [str, num] of m) {
    if (num > 1) {
      res.push(str);
    }
  }

  return res;
};
// @lc code=end
