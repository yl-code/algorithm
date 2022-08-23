/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 *
 * 思路：
 *    还是二分查找的典型应用
 *
 *    下面思路比较秀的是，根据原数组创建了一个下标数组，在下标数组中，进行二分查找，寻找符合条件的下标
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = (nums, target) => {
  const ind = nums.map((_, i) => i); // 根据 nums 创建其下标数组 ind
  ind.sort((x, y) => nums[x] - nums[y]); // 根据 nums 中的元素，将下标数组 ind 升序排列

  for (let i = 0; i < ind.length; i++) {
    // 遍历下标数组 ind，使用二分查找 找到当前下标元素之后的，满足条件的下标元素
    const val = nums[ind[i]];
    const j = binary_search(nums, ind, i + 1, target - val); // 在 下标数组ind 中进行二分查找，找到符合条件的下标的位置
    if (j < 0) continue;
    return [ind[i], ind[j]]; // 直接返回符合条件的下标结果
  }
};

const binary_search = (nums, ind, head, t) => {
  let tail = ind.length - 1;
  let mid;

  while (head <= tail) {
    mid = (head + tail) >> 1;
    if (nums[ind[mid]] === t) return mid;
    if (nums[ind[mid]] < t) {
      head = mid + 1;
    } else {
      tail = mid - 1;
    }
  }

  return -1;
};

var twoSum_1 = function (nums, target) {
  nums = nums.map((x, index) => ({ val: x, index }));
  nums.sort((a, b) => a.val - b.val);

  for (let i = 0; i < nums.length; i++) {
    let head = i + 1;
    let tail = nums.length - 1;
    while (head < nums.length && head <= tail) {
      let mid = (head + tail) >> 1;
      if (nums[i].val + nums[mid].val === target)
        return [nums[i].index, nums[mid].index];
      if (nums[i].val + nums[mid].val > target) {
        tail = mid - 1;
      } else {
        head = mid + 1;
      }
    }
  }
};
// @lc code=end
