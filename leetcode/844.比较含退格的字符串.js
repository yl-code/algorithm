/*
 * @lc app=leetcode.cn id=844 lang=javascript
 *
 * [844] 比较含退格的字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function (s, t) {
  const transform = (str) => {
    let list = [];

    for (let index = 0; index < str.length; index++) {
      if (str[index] === "#") {
        list.splice(list.length - 1, 1);
      } else {
        list.push(str[index]);
      }
    }

    return list;
  };

  let stack_s = transform(s);
  let stack_t = transform(t);

  return stack_s.join() === stack_t.join();
};
// @lc code=end
