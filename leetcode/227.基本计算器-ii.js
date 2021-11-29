/*
 * @lc app=leetcode.cn id=227 lang=javascript
 *
 * [227] 基本计算器 II
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 *
 * 思路：
 *    初始化两个栈，一个存放运算的数字，一个存放运算符
 *    扫描字符串，若元素为数字则压入数字栈，若为运算符则压入运算符栈
 *    过程中，判断后入栈的运算符 与 前一个运算符的优先级高低
 *        如果优先级比前一个低，则将前一个运算符出栈，
 *            并且从数字栈出栈两个数字，进行运算，最后将结果压入数字栈
 *        如果优先级比前一个高，则押入操作符栈中
 */
var calculate = function (str) {
  let num_stack = [];
  let ope_stack = [];

  // 这个很神奇
  // 正常情况下，操作数 和 操作符 都入完栈之后，就要开始手动出栈并计算结果
  // 但是加上一个这，且将它的优先级定为最低，在下面的 while 循环时，就能自动的完成上面这个出栈计算的操作
  str += "@";

  // 返回运算符优先级
  const level = (val) => {
    switch (val) {
      case "+":
      case "-":
        return 1;
      case "*":
      case "/":
        return 2;
      case "@":
        return -1;
    }
    return 0;
  };

  const calcFn = (x, ope, y) => {
    console.log(x, ope, y);

    switch (ope) {
      case "+":
        return x + y;
      case "-":
        return x - y;
      case "*":
        return x * y;
      case "/":
        return x / y;
      default:
        // 其他情况，比如 @，就返回 0
        return 0;
    }
  };

  for (let index = 0, num = 0; index < str.length; index++) {
    if (str[index] === " ") continue;

    // 由于题目描述字符串由整数与字符串组成，0代表的是数字
    // 有可能是多位数
    if (level(str[index]) === 0) {
      num = Number(str[index]) + num * 10;
      continue;
    }

    num_stack.push(num);
    num = 0;

    // 如果操作符栈不为空，并且 当前操作符的优先级 比 操作符栈的栈顶元素的优先级要低，就开始运算
    while (ope_stack.length && level(str[index]) <= level(ope_stack[ope_stack.length - 1])) {
      // 出栈 操作符 与 操作数
      let ope = ope_stack.pop();
      let y = num_stack.pop();
      let x = num_stack.pop();

      // 将运算结果 压入 数字栈
      // 题目要求，整数除法仅保留整数部分
      num_stack.push(parseInt(calcFn(x, ope, y)));
    }

    // 将操作符 压入操作符栈
    ope_stack.push(str[index]);
  }

  // 最后一波计算完成之后，数字栈中一定只剩下最后的结果了
  return num_stack[0];
};
// @lc code=end
