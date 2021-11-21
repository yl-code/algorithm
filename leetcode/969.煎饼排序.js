/*
 * @lc app=leetcode.cn id=969 lang=javascript
 *
 * [969] 煎饼排序
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number[]}
 */

// 思路：
// 1、统计数组中每个数字的下标
// 2、每次拿到待排序数组的最大值，及其下标 n，翻转数组的 前 n + 1 位，最大值就在数组的第一位了，同时记录翻转的元素个数: n + 1
// 3、再将数组翻转，使得最大值翻转到数组最后一位，同时记录翻转的元素个数: 待翻转数组的长度
// 4、重复步骤 2、3，直到数组排序完成

var pancakeSort = function (arr) {
  //
  // 下面神奇的操作来了，遍历一遍 arr
  // 得到的 indexArr，每个元素的值为元素在 arr 中的下标，而其下标为其在 arr 中存储的真实值
  //
  // 由于 arr 数组很特殊，是由数字 1 到数字 arr.length 的乱序排列成的
  // 所以 arr.length === indexArr.length - 1
  // 因为 arr 数组中没有值为 0 的元素，所以 indexArr 在下标为 0 的位置是没有值的
  //
  let indexArr = [];
  for (let index = 0; index < arr.length; index++) {
    indexArr[arr[index]] = index;
  }

  // list 存储题目要求返回的，每次煎饼翻转的序列
  let list = [];

  // 定义一个煎饼翻转函数，即每次翻转数组前 n 个元素
  const reverse = (arr, n, indexArr) => {
    for (let i = 0, j = n - 1; i < j; i++, j--) {
      // 交换元素位置
      [arr[i], arr[j]] = [arr[j], arr[i]];

      // 元素位置下标发生改变，indexArr 中的值也要跟着改变
      indexArr[arr[i]] = i;
      indexArr[arr[j]] = j;
    }
  };

  // 下面开始从大到小遍历元素，并进行翻转操作
  // maxValue 初始值即为最大值，也是 待翻转数组 的长度 length
  for (let maxValue = arr.length; maxValue >= 1; maxValue--) {
    let index = indexArr[maxValue];

    // 当前最大的值的下标 === 待翻转数组长度 - 1
    // 意味着这个值不需要动了，已经在正确的位置上了，直接 continue
    if (index === maxValue - 1) continue;

    // 需要翻转 待排序数组 的前 index + 1 个元素
    // 当前待翻转的数组的最大值，maxValue 就在数组最前面了
    // 优化：翻转 arr 的前 1 个元素没有意义
    if (index + 1 !== 1) {
      list.push(index + 1);
      reverse(arr, index + 1, indexArr);
    }

    // 然后翻转 待排序数组所有元素，也就是翻转带排序数组的前 length 个元素
    // 操作之后，最大值就在 arr 数组的最后一位了
    // 优化：待翻转数组长度为 1 时，也不需要翻转
    if (maxValue !== 1) {
      list.push(maxValue);
      reverse(arr, maxValue, indexArr);
    }
  }

  return list;
};
// @lc code=end
