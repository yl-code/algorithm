/*
 * @lc app=leetcode.cn id=327 lang=javascript
 *
 * [327] 区间和的个数
 *
 * 思路很简单：
 *
 * 只要提到 求序列的区间和，就可以想到 前缀和序列
 * eg:
 * 原序列:       1, 4,  5,  3,  2   (arr)
 * 前缀和序列: 0  1, 5, 10, 13, 15   (sum)
 * 前缀和序列的规律是：求原序列区间的和，就是求前缀和序列某两位元素之差
 * 原序列区间arr [i, j] 之和  ===  前缀和区间 sum[j] - sum[i-1]
 *
 * 所以题目可以转换为：求前缀和区间内，有多少个区间，满足下面条件
 *     a < b  &&  lower <= sum[b] - sum[a] <= upper
 *
 *
 * 也就是：a < b  &&  sum[b] - upper <= sum[a] <= sum[b] - lower
 * 也就是：通过 sum[b] lower upper 三个数，可以算出 sum[a] 的区间
 * 也就是：sum[a] 的区间中的每个值，与 sum[b] 组合都能满足题目要求
 *
 *
 * 此时利用归并排序的思想，分别求出，前缀和序列的左右半段序列中，满足条件的 [a, b] 区间的个数
 * 再加上 横跨整个前缀和序列的，满足条件的区间的个数，即可得出题目答案
 *
 */

// @lc code=start
/**
 *
 * @param {*} nums
 * @param {*} l1
 * @param {*} r1
 * @param {*} l2
 * @param {*} r2
 * @param {*} lower
 * @param {*} upper
 */
const twoPartCount = (sum, l1, r1, l2, r2, lower, upper) => {
  // 初始化横跨两个序列的，满足要求的区间个数为 0
  let count = 0;

  // p1, p2 两个指针分别指向 左半段序列 的第一个元素
  let p1 = l1;
  let p2 = l1;

  // 遍历右半段序列的元素
  for (let b = l2; b <= r2; b++) {
    // 根据上面的思路分析
    let min = sum[b] - upper;
    let max = sum[b] - lower;

    // 通过 sum[a] 的区间，将 p1 与 p2 移动到对应位置，方便统计这俩指针中间的元素个数
    while (p1 <= r1 && sum[p1] < min) p1++;
    while (p2 <= r1 && sum[p2] <= max) p2++;

    // 通过 sum[b]、upper、lower 三个数字可以计算出 sum[a] 的区间 [min, max)
    // 为什么 最后 sum[p1] >= min，sum[p2] > max
    // 1、方便 p2 - p1 计算区间中的取值个数
    // 2、如果得出的区间是 [min, max]，那么计算取值个数时就是 p2 - p1 + 1
    //   当 p2 与 p1 都越过 r1 区间时，则不存在符合条件的取值，而 p2 - p1 + 1 = 1，结果就会有错误
    //
    // sum[a] 的所有取值，与 sum[b] 组成的区间，都满足题目要求
    // 统计 sum[a] 的取值个数
    count += p2 - p1;
  }

  return count;
};

//
//
// 此方法，使用归并排序来排序 sum 序列中 [l, r] 区间的元素
// 在排序过程中，统计满足条件的区间个数
const mergeSort = (sum, l, r, lower, upper) => {
  if (l >= r) return 0;

  // 初始化满足要求的区间个数为 0
  let count = 0;

  // 计算中间索引
  let mid = (l + r) >> 1;

  // 统计 左右区间 及 横跨整个区间 的满足要求的区间个数
  count += mergeSort(sum, l, mid, lower, upper);
  count += mergeSort(sum, mid + 1, r, lower, upper);
  count += twoPartCount(sum, l, mid, mid + 1, r, lower, upper);

  // 归并两个区间，使整个序列呈现有序性
  // 以保证上面的 twoPartCount 执行时，传入的两段区间对应的序列是有序的
  let p1 = l;
  let p2 = mid + 1;
  let temp = [];
  while (p1 <= mid || p2 <= r) {
    if (p2 > r || (p1 <= mid && sum[p1] < sum[p2])) {
      temp.push(sum[p1++]);
    } else {
      temp.push(sum[p2++]);
    }
  }

  // 将 temp 中正序排列的元素，依次放入 sum 中，注意这里的是 temp[j -l]
  for (let i = l; i <= r; i++) sum[i] = temp[i - l];

  return count;
};

/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
var countRangeSum = function (nums, lower, upper) {
  // 构建前缀和序列，其第一位为 0，长度比原序列多一位
  const preSum = new Array(nums.length + 1).fill(0);
  for (let i = 0; i < nums.length; i++) {
    preSum[i + 1] = preSum[i] + nums[i];
  }

  return mergeSort(preSum, 0, preSum.length - 1, lower, upper);
};
// @lc code=end
