/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid1 = function (s) {
  while (s.includes("()") || s.includes("{}") || s.includes("[]")) {
    s = s.replace("()", "");
    s = s.replace("[]", "");
    s = s.replace("{}", "");
  }

  return s === "" ? true : false;
};

const isValid = (str) => {
  const dict = {
    "{": "}",
    "[": "]",
    "(": ")",
  };

  let stack = [];
  let keys = Object.keys(dict);

  for (let i = 0; i < str.length; i++) {
    // 如果栈是空的，当前元素又不在 keys 中，则可以直接返回 false
    if (!stack.length && !keys.includes(str[i])) return false;

    if (keys.includes(str[i])) {
      // 如果当前元素是 正向括号，则加入栈中
      stack.push(str[i]);
    } else if (dict[stack.pop()] !== str[i]) {
      // 否则是 反向括号，则从栈顶弹出一个元素与之匹配，不相等则返回 false
      return false;
    }
  }

  return !stack.length;
};
// @lc code=end
