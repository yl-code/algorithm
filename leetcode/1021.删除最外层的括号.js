/*
 * @lc app=leetcode.cn id=1021 lang=javascript
 *
 * [1021] 删除最外层的括号
 */

// @lc code=start
/**
 * @param {string} str
 * @return {string}
 */
//
//  思路：
//  用栈的思维去思考这类 存在有效包含关系的字符 的问题
//
//  假想，初始化一个栈，扫描一遍字符串
//  遇到 (，就将其压入栈中，遇到 )，就将上一个与之匹配的 ( 出栈
//  如果该字符串序列为有效序列，则栈最后一定为空，体现的就是栈内元素个数为 0，栈顶指针指向初始位置 0
//
var removeOuterParentheses = function (str) {
  let res = "";

  for (let index = 0, top = 0, start = 0; index < str.length; index++) {
    if (str[index] === "(") {
      top++;
    } else {
      top--;
    }

    if (top === 0) {
      res += str.slice(start + 1, index);
      start = index + 1;
    }
  }

  return res;
};
// @lc code=end
