/*
 * @lc app=leetcode.cn id=1122 lang=javascript
 *
 * [1122] 数组的相对排序
 */

// @lc code=start
/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */
var relativeSortArray = function (arr1, arr2) {
  // 1、统计 arr1 中每个数字出现的次数，并以存到 count 对象中
  let count = {};
  for (const i of arr1) {
    count[i] = !count[i] ? 1 : ++count[i];
  }
  console.log(count, Object.keys(count).join());

  // 2、根据题目意思，按照 arr2 中的数字顺序，依次放入结果数组中
  // 这里就直接在 arr1 上覆盖
  let k = 0;
  for (const j of arr2) {
    while (count[j]--) arr1[k++] = j;
  }

  // 由于 js 特性对象的键为数字时，会自动排序，所以这里时有序的
  for (const m in count) {
    if (count[m] <= 0) continue;
    while (count[m]--) arr1[k++] = m;
  }

  return arr1;
};
// @lc code=end
