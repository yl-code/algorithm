/*
 * @lc app=leetcode.cn id=1011 lang=javascript
 *
 * [1011] 在 D 天内送达包裹的能力
 *
 * 思路：
 *    运载能力数值，一定在 [最重的单件包裹重量，所有包裹总重量] 这个区间内
 *
 *    那么，就可以在这个区间内进行二分查找，mid 指向的元素是否满足条件
 *
 *    这就是典型的二分查找01模型，该区间正序排列，且由 不满足条件的元素 + 满足条件的元素组成
 *    找到这个满足条件最小元素即可
 */

// @lc code=start
/**
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 */
var shipWithinDays = function (weights, days) {
  let l = 0, // 货物中单个最重的重量
    r = 0; // 货物的总重量
  for (const i of weights) {
    l = Math.max(l, i);
    r += i;
  }

  let mid;
  // 这就是一个典型的 二分01模型，从 l->r, 可以看作 前段元素不符合条件，后段元素都符合条件
  while (l < r) {
    mid = (l + r) >> 1;
    if (check(weights, mid) > days) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }

  return l;
};

/**
 *
 * @param {*} weights 货物重量的数组
 * @param {*} x 运载能力
 * @returns 返回运载能力为 x 时，运完货物的天数
 */
const check = (weights, x) => {
  let n = 1;
  let sum = 0;
  for (const i of weights) {
    if (sum + i <= x) {
      sum += i;
    } else {
      n++;
      sum = i;
    }
  }

  return n;
};
// @lc code=end
