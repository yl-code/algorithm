/*
 * @lc app=leetcode.cn id=394 lang=javascript
 *
 * [394] 字符串解码
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
  let stack = [];
  let num = 0;
  let str = "";

  for (let i = 0; i < s.length; i++) {
    switch (true) {
      case s[i] >= 0 && s[i] <= 9:
        // 数字
        if (str) {
          stack.push(str);
          str = "";
        }
        num = num * 10 + Number(s[i]);
        break;
      case s[i] === "[":
        // 将数字入栈
        stack.push(num);
        num = 0;
        break;
      case s[i] === "]":
        // 出栈 数字，然后将重复的字符串入栈
        if (str) {
          stack.push(str);
          str = "";
        }

        while (stack.length && isNaN(stack[stack.length - 1])) {
          str = stack.pop() + str;
        }

        stack.push(str.repeat(stack.pop()));
        str = "";
        break;

      default:
        // 字母
        str += s[i];
        break;
    }
  }

  while (stack.length) {
    str = stack.pop() + str;
  }

  return str;
};
// @lc code=end
