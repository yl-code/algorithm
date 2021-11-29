/*
 * @lc app=leetcode.cn id=1249 lang=javascript
 *
 * [1249] 移除无效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var minRemoveToMakeValid = function (str) {
  let res = str.split("");

  // 去掉多余的 右括号 )
  for (let index = 0, top = 0; index < res.length; index++) {
    if (res[index] === ")") {
      if (top) {
        top--;
      } else {
        res[index] = "";
      }
    } else if (res[index] === "(") {
      top++;
    }
  }

  // 去掉多余的 左括号 (
  for (let index = res.length - 1, tail = 0; index >= 0; index--) {
    if (res[index] === "(") {
      if (tail) {
        tail--;
      } else {
        res[index] = "";
      }
    } else if (res[index] === ")") {
      tail++;
    }
  }

  return res.join("");
};
// @lc code=end
