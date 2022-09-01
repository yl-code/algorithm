/*
 * @lc app=leetcode.cn id=318 lang=javascript
 *
 * [318] 最大单词长度乘积
 */

// @lc code=start
/**
 * @param {string[]} words
 * @return {number}
 */
var maxProduct = function (words) {
  let temp = [];
  for (let i = 0; i < words.length; i++) {
    for (const char of words[i]) {
      temp[i] |= 1 << (char.charCodeAt() - 97);
    }
  }

  let max = 0;
  for (let i = 0; i < words.length; i++) {
    for (let j = 1; j < words.length; j++) {
      if (temp[i] & temp[j]) continue;

      max = Math.max(words[i].length * words[j].length, max);
    }
  }

  return max;
};
// @lc code=end
