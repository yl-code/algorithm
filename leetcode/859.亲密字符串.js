/*
 * @lc app=leetcode.cn id=859 lang=javascript
 *
 * [859] 亲密字符串
 */

// @lc code=start

// 判断字符串中是否有重复的字母
const hasRepeate = (str) => {
  let dict = {};

  for (let i = 0; i < str.length; i++) {
    if (dict[str[i]]) {
      dict[str[i]]++;
    } else {
      dict[str[i]] = 1;
    }

    if (dict[str[i]] > 1) return true;
  }

  return false;
};

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var buddyStrings = function (s1, s2) {
  // 特例判断
  if (s1.length !== s2.length) return false;
  if (s1 === s2) return hasRepeate(s1);

  // 根据亲密字符串的特点，
  // 一定有两个位置，在两个字符串中对应位置的字符是不相等的
  // 剩下的字符都要相等
  // 而且交换任意一个字符串的这两个位置的字符，就会与另外一个字符串相同
  //
  // 所以要找到这两个位置，并且比较除了这两个位置之外的其他字符是否相等
  let i = 0;
  let j = 0;

  while (s1[i] === s2[i]) {
    i++;
  }

  j = i + 1;

  while (s1[j] === s2[j] && j < s1.length) {
    j++;
  }

  if (j === s1.length) return false;

  for (let index = j + 1; index < s1.length; index++) {
    if (s1[index] !== s2[index]) return false;
  }

  return s1[i] === s2[j] && s1[j] === s2[i];
};
// @lc code=end
