/*
 * @lc app=leetcode.cn id=34 lang=javascript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 *
 * 思路：
 *    在正序数组中查找元素，对时间复杂度有要求，可以想到使用二分查找
 *
 *    查找元素 a 的第一个位置，就是查找 >=a 的第一个位置，这是典型的 01 模型
 *    查找得出结果后，如果结果对应的元素不是 a，那就表示元素不存在于数组中
 *
 *    查找元素 a 的最后一个位置，可以看做是查找 >=(a+1)，的第一个位置，这也是典型的 01 模型
 *    经过上一次查找后，可以得知，元素 a 一定存在于数组中，而元素 a+1 不一定存在于数组中
 *    如果 a+1 不存在数组中时，查找函数可以将数组长度作为结果返回
 *    因为数组为正序排列，所以长度对应的虚拟元素，可以看做是大于等于所有的数组元素
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  let res = [];
  let index = binary_search_01(nums, target);
  if (index < 0 || nums[index] !== target) {
    return [-1, -1];
  }
  res[0] = index;

  // target + 1 > target
  // 此时 target 一定存在，target + 1 倒是不一定存在
  // 所以需要 binary_search_01 在找不到 target + 1 时，返回数组长度对应的虚拟元素
  // 所以查找 target + 1 的位置，的前一位就是最后一个 target 的位置
  res[1] = binary_search_01(nums, target + 1) - 1;
  return res;
};

const binary_search_01 = (nums, target) => {
  let head = 0;
  let tail = nums.length - 1;
  let mid;

  while (tail - head > 3) {
    mid = (head + tail) >> 1;
    if (nums[mid] < target) {
      head = mid + 1;
    } else {
      tail = mid;
    }
  }

  for (let i = head; i <= tail; i++) {
    if (nums[i] >= target) {
      return i;
    }
  }

  // 此时表示已经找不到 target，返回虚拟元素的下标
  return nums.length;
};
// @lc code=end
