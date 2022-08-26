/*
 * @lc app=leetcode.cn id=81 lang=javascript
 *
 * [81] 搜索旋转排序数组 II
 *
 * 思路：
 *    1、使用额外的数组 ind，记录原数组中的元素下标，保证 ind 中记录的元素对应原数组中的元素，是升序排列的，然后进行二分查找即可
 *
 *    2、由于原数组由两段升序数组组成，其实是可以直接进行二分查找，但是需要做一些额外的处理，保证 target 一定存在于每次二分之后剩余的区间
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */

const search = (nums, target) => {
  // 如果前后两端的元素中，有一个与 target 相同，直接返回 true
  if (nums[0] === target || nums[nums.length - 1] === target) return true;

  let l = 0;
  let r = nums.length - 1;

  // 下面两个操作是要去掉两端元素重复的元素，以保证 l 指向的元素 一定大于 r 指向的元素
  while (nums[l] === nums[0]) ++l;
  while (nums[r] === nums[nums.length - 1]) --r;

  // 下面的二分操作就是在保证，剩下的区间中一定包含 target
  // 得根据 39 与 43 行画图理解一下
  let mid;
  while (l <= r) {
    mid = (l + r) >> 1;
    if (target === nums[mid]) return true;

    if (nums[mid] <= nums[r]) {
      // 此时 mid 一定在后段升序中
      if (target > nums[mid] && target <= nums[r]) l = mid + 1;
      else r = mid - 1;
    } else {
      // 此时 mid 一定在前段升序中
      if (target >= nums[l] && target < nums[mid]) r = mid - 1;
      else l = mid + 1;
    }
  }

  return false;
};

var search_1 = function (nums, target) {
  let ind = [];

  let k;

  for (let i = 0; i < nums.length; i++) {
    if (i === nums.length - 1 || nums[i] <= nums[i + 1]) {
      ind.push(i);
    } else {
      ind.push(i);
      k = i + 1;
      break;
    }
  }

  const temp = [];
  for (let i = k; i < nums.length; i++) {
    temp.push(i);
  }

  ind = [...temp, ...ind];

  let head = 0;
  let tail = ind.length - 1;
  let mid;
  while (head <= tail) {
    mid = (head + tail) >> 1;

    if (nums[ind[mid]] === target) return true;
    if (nums[ind[mid]] < target) {
      head = mid + 1;
    } else {
      tail = mid - 1;
    }
  }

  return false;
};
// @lc code=end
