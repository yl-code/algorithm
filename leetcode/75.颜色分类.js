/*
 * @lc app=leetcode.cn id=75 lang=javascript
 *
 * [75] 颜色分类
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors_1 = function (nums) {
  const swap = (x, y) => ([nums[x], nums[y]] = [nums[y], nums[x]]);

  let [p0, p2] = [0, nums.length - 1];
  let i = 0;

  while (i <= p2) {
    let num = nums[i];

    if (num < 1) {
      swap(p0++, i++);
    } else if (num > 1) {
      // 有可能交换过来的是 2，i 就不用 ++ 了
      swap(p2--, i);
    } else {
      i++;
    }
  }
};

var sortColors = function (nums) {
  const swap = (x, y) => ([nums[x], nums[y]] = [nums[y], nums[x]]);

  let [p0, p2] = [0, nums.length - 1];

  // 遍历所有元素
  for (let i = 0; i <= p2; i++) {
    // 1、
    // 当前元素是 2 时，将其交换到 p2 指针处，p2 指针向左移动一位
    while (nums[i] > 1 && i <= p2) {
      swap(i, p2--);
    }

    // 2、必须在步骤 1 后面，因为步骤 1 的 while 循环可能将 0 交换到 i 的位置，此时当前元素就变为 0 了
    // 当前元素是 0 时，将其交换到 p0 指针处，p0 指针向右移动移动一位
    if (nums[i] < 1) {
      swap(i, p0++);
    }
  }
};

// @lc code=end
