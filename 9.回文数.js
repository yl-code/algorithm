/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 */

// @lc code=start
/**
 * @param {number} num
 * @return {boolean}
 */
var isPalindrome = function (num) {
  if (typeof num !== "number") return false;

  let numList = String(num).split("");

  if (numList.length === 1) return true;

  let startIndex;

  if (numList.length % 2 !== 0) {
    let minIndex = numList.length >> 1;
    startIndex = minIndex - 1;
    numList.splice(minIndex, 1);
  } else {
    startIndex = numList.length / 2 - 1;
  }

  for (let i = startIndex, j = i + 1; i >= 0; i--, j++) {
    if (numList[i] !== numList[j]) {
      return false;
    }
  }

  return true;
};
// @lc code=end
