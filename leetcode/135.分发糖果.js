/*
 * @lc app=leetcode.cn id=135 lang=javascript
 *
 * [135] 分发糖果
 *
 * 思路：
 *    从左到右扫描，按条件给每个孩子分发糖果
 *    然后从右到左扫描，再次分发
 *    相应孩子糖果数量应为这两次结果的最大值
 */

// @lc code=start
/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function (ratings) {
  let l = [];
  let r = [];
  let sum = 0;

  // 从左到右
  for (let i = 0, j = 1; i < ratings.length; i++) {
    if (i && ratings[i] > ratings[i - 1]) j += 1;
    else j = 1;
    l[i] = j;
  }

  // 从右到左
  for (let i = ratings.length - 1, j = 1; i >= 0; i--) {
    if (i < ratings.length - 1 && ratings[i] > ratings[i + 1]) j += 1;
    else j = 1;
    r[i] = j;

    sum += Math.max(l[i], r[i]); // 取两者中的较大值 累加
  }

  return sum;
};
// @lc code=end
