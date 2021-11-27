/*
 * @lc app=leetcode.cn id=682 lang=javascript
 *
 * [682] 棒球比赛
 */

// @lc code=start
/**
 * @param {string[]} ops
 * @return {number}
 */
var calPoints = function (ops) {
  let stack = [];
  let currScore = 0;

  ops.forEach((i) => {
    switch (i) {
      case "+":
        currScore = Number(stack[stack.length - 1]) + Number(stack[stack.length - 2]);
        stack.push(currScore);
        break;
      case "D":
        currScore = stack[stack.length - 1] * 2;
        stack.push(currScore);
        break;
      case "C":
        stack.splice(stack.length - 1, 1);
        break;
      default:
        stack.push(i);
    }
    console.log(stack);
  });

  return stack.reduce((total, curr) => Number(total) + Number(curr));
};
// @lc code=end
