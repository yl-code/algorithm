/*
 * @lc app=leetcode.cn id=475 lang=javascript
 *
 * [475] 供暖器
 *
 * 思路：
 *    找到每个房屋与供暖器之间最小的半径，这些半径中的最大值就是题目的解
 *
 *    供暖器数组，按照升序排列，找到第一个位置 >= house 的供暖器，典型的二分 01 模型
 *    查找情况分两种： x, y 为供暖器
 *        1、[i, house, j]，最小半径为 Math.min(j - house, house - i)
 *        2、[i, j] house，此时供暖器的最大位置，依然小于 house，所以此时最小半径就是 house - j
 *
 */

// @lc code=start
/**
 * @param {number[]} houses
 * @param {number[]} heaters
 * @return {number}
 */
var findRadius = function (houses, heaters) {
  heaters.sort((a, b) => a - b);

  let res = -1;
  for (const house of houses) {
    let j = binary_search_01(heaters, house); // 查找到第一个大于等于 house 的供暖器的坐标 j
    let x = Math.abs(house - heaters[j]); // 根据上面分析两种情况，这里使用绝对值表示

    // 正常情况下，j > 0，所以 存在 heaters[j - 1]，那么 house 与前一个供暖器的距离为 house -  heaters[j - 1]
    // 但有可能 j 是 0 号位置，那就不存在 heaters[j - 1] 了，所以用 x+1 表示 y，下一步 min 方法依然可以得出正确结果
    let y = j ? house - heaters[j - 1] : x + 1;

    res = Math.max(Math.min(x, y), res);
  }

  return res;
};

const binary_search_01 = (list, t) => {
  let head = 0;
  let tail = list.length - 1;
  let mid;

  while (head < tail) {
    mid = (head + tail) >> 1;

    if (list[mid] < t) {
      head = mid + 1;
    } else {
      tail = mid;
    }
  }

  return head; // 要么找到正确的索引位置，要么返回 list 中的最后一个位置
};
// @lc code=end
