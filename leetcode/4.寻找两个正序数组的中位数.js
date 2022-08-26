/*
 * @lc app=leetcode.cn id=4 lang=javascript
 *
 * [4] 寻找两个正序数组的中位数
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  let m = nums1.length;
  let n = nums2.length;
  let mid = (m + n + 1) >> 1; // 中间的那个元素，是第 mid 个元素，不是索引
  let mid_num = findK(nums1, nums2, 0, 0, mid);
  if ((m + n) % 2 === 1) return mid_num; // 如果两个数组的元素总数是奇数，那么找到的中间值就是第 mid 个元素

  // 此时两个数组元素总数为偶数，那么再找到第 mid+1 个元素
  let mid_next_num = findK(nums1, nums2, 0, 0, mid + 1);
  return (mid_num + mid_next_num) / 2; // 中间值
};

/**
 *
 * @param {*} nums1 第一个升序数组
 * @param {*} nums2 第二个升序数组
 * @param {*} i nums1 的起始查找索引值
 * @param {*} j nums2 的起始查找索引值
 * @param {*} k 在 nums1 与 nums2 合并之后的数组中找到第 k 个元素
 *
 */
const findK = (nums1, nums2, i, j, k) => {
  // 开始处理边界条件
  // 由参数定义可知，表示 nums1 的元素已经被排除了
  if (nums1.length === i) return nums2[j + k - 1];
  // 同上
  if (nums2.length === j) return nums1[i + k - 1];

  // 此时需要找到 nums1[i] 与 nums2[j] 之间的最小值即可
  if (k === 1) return Math.min(nums1[i], nums2[j]);

  // 前 k/2 个元素，有可能此时的 nums1 中还没排除的元素个数不足 k/2 个，所以取这俩的最小值
  let a = Math.min(parseInt(k / 2), nums1.length - i);
  // nums1 中取完 a 个元素之后，剩余的元素都得在 nums2 中取，但是 nums2 中很可能不足 k-a 个元素，所以取这俩最小值
  let b = Math.min(k - a, nums2.length - j);
  a = k - b; // 再反向更新一下 a

  if (nums1[i + a - 1] <= nums2[j + b - 1]) {
    // 此时 nums1 中的前 i+a 都可以抛弃，所以问题就变成了查找第 k-a 个元素
    return findK(nums1, nums2, i + a, j, k - a);
  }
  // 反之，抛弃 nums2 中的前 j+b 都可以抛弃，开始查找第 k-b 个元素
  return findK(nums1, nums2, i, j + b, k - b);
};
// @lc code=end
