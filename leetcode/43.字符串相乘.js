/*
 * @lc app=leetcode.cn id=43 lang=javascript
 *
 * [43] 字符串相乘
 *
 * 思路：
 *    小学乘法
 *
 *      1 1 1
 *  x   2 2 2
 * -------------
 *    2 2 2
 *  2 2 2
 *
 *
 */

// @lc code=start
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
  // 将两个数字拆分后的数组倒置，方便从个位开始累加，处理进位
  num1 = num1.split('').reverse();
  num2 = num2.split('').reverse();
  const res = [];

  //  从个位开始相乘，乘积累加在 res[i+j] 上，很秀
  for (let i = 0; i < num1.length; i++) {
    for (let j = 0; j < num2.length; j++) {
      res[i + j] ||= 0;
      res[i + j] += num1[i] * num2[j];
    }
  }

  // 处理进位,原则上就是 保留个位，其余高位部分累加到下一个数上
  for (let i = 0; i < res.length; i++) {
    if (res[i] < 10) continue;

    res[i + 1] ||= 0;
    res[i + 1] += parseInt(res[i] / 10);
    res[i] = res[i] % 10;
  }

  // 有可能 "0" x "1234" 会计算出 "0000"，此时应该输出 "0"
  while (res.length > 1 && !res[res.length - 1]) {
    res.pop();
  }

  return res.reverse().join('');
};
// @lc code=end
