/*
 * @lc app=leetcode.cn id=93 lang=javascript
 *
 * [93] 复原 IP 地址
 *
 * 思路：
 *    题目要求所有的有效 IP 地址
 *    所以可以试探性的依次插入 3 个点，也就是依次判断 ip 中的四个数字是否合法
 *    过程中任何一个数字不合法就中断递归，当第四个数字也合法就表示找到一组答案
 *    典型的 深搜
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
  let res = [];
  dfs(s.split(''), res, 1, 0);
  return res;
};

/**
 *
 * @param {*} str 字符串数组
 * @param {*} res 结果数组
 * @param {*} k 将要处理的第几个整数，一共就四个整数
 * @param {*} ind 光标，表示从当前光标指向的位置开始计算 IP 中的第 k 个整数
 */
const dfs = (str, res, k, ind) => {
  if (ind >= str.length) return;

  if (k === 4) {
    // 最后一个数字不能以 0 开头
    if (ind < str.length - 1 && str[ind] === '0') return;

    for (let i = ind, num = 0; i < str.length; i++) {
      num = num * 10 + str[i] / 1;

      if (num > 255) return; // 最后一个数字不合法
    }

    res.push(str.join(''));
  }

  for (let i = ind, num = 0; i < str.length; i++) {
    // 除 0 以外有效数字，不能以 0 开头
    if (i >= ind + 1 && str[ind] === '0') return;

    num = num * 10 + str[i] / 1;
    if (num > 255) return; // 数字不能大于 255

    str.splice(i + 1, 0, '.');
    dfs(str, res, k + 1, i + 2);
    str.splice(i + 1, 1); // 回溯的时候还原数字
  }
};
// @lc code=end
