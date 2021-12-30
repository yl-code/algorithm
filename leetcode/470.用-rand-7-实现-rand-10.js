/*
 * @lc app=leetcode.cn id=470 lang=javascript
 *
 * [470] 用 Rand7() 实现 Rand10()
 *
 *
 * 一个狠 🐂 的题解：https://leetcode-cn.com/problems/implement-rand10-using-rand7/solution/cong-zui-ji-chu-de-jiang-qi-ru-he-zuo-dao-jun-yun-/
 *
 *
 * 通过下面列举，可以推导出 (randA - 1) * B + randB === randAB
 * (rand3 - 1) * 2 + rand2  === rand6
 *          0      +   1          1
 *          0      +   2          2
 *          2      +   1          3
 *          2      +   2          4
 *          4      +   1          5
 *          4      +   2          6
 *
 *
 * 通过下面的列举，可以推导出: 当 N 为 2 的倍数时， (randN % 2) + 1 === rand2
 * (rand4 % 2) + 1 === rand2
 *          1            2
 *          2            1
 *          3            2
 *          4            1
 *
 * (rand6 % 2) + 1 === rand2
 *          1            2
 *          2            1
 *          3            2
 *          4            1
 *          5            2
 *          6            1
 *
 * 同样的，当 N 为 10 的倍数时， (randN % 10) + 1 === rand10，即为符合题意的答案
 *
 */

// @lc code=start
/**
 * The rand7() API is already defined for you.
 * var rand7 = function() {}
 * @return {number} a random integer in the range 1 to 7
 */
var rand10 = function () {
  let a, b, num;

  while (true) {
    a = rand7();
    b = rand7();
    num = (a - 1) * 7 + b; // rand49
    if (num <= 40) {
      return (num % 10) + 1; // rand10
    }

    // 此时 num 的取值范围为  40 < num <= 49
    a = num - 40; // rand9
    num = (a - 1) * 7 + rand7(); // rand63
    if (num <= 60) {
      return (num % 10) + 1; // rand10
    }

    // 此时 num 的取值范围为 60 < num <= 63
    a = num - 60; // rand3
    num = (a - 1) * 7 + rand7(); // rand21
    if (num <= 20) {
      return (num % 10) + 1;
    }
  }
};
// @lc code=end
