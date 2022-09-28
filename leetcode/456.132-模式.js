/*
 * @lc app=leetcode.cn id=456 lang=javascript
 *
 * [456] 132 模式
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 *
 * 思路：
 *    i j k
 *    如果能找到 i 后面，有两个元素均大于 i，且 k 在 j 的右边，k > j，则表示 ikj 满足 132 模式
 *
 *    k 和 j 的关系，可以使用单调栈求的
 *    倒着扫描 nums，枚举每一个 i，并依次压入单调递减栈 s 中，使用 k 记录每个被 pop 的元素
 *    mak_k 其实就是 栈顶元素 右边小于自己的最大值
 *
 *    只要能找到 nums[i] 小于 k，则表示数组存在 132
 */
var find132pattern = function (nums) {
  const s = [];
  let k;

  for (let i = nums.length - 1; i >= 0; i--) {
    if (s.length && nums[i] < k) return true;

    while (s.length && nums[i] > s[s.length - 1]) {
      k = s.pop();
    }

    s.push(nums[i]);
  }

  return false;
};

var find132pattern_1 = function (nums) {
  const s = [];
  const l = [Number.MAX_SAFE_INTEGER]; // 存放每个元素左边的区间中最小的元素

  // 使用 l 数组记录原数组中，每个元素左边区间内，最小的元素
  for (let i = 1; i < nums.length; i++) {
    l[i] = Math.min(l[i - 1], nums[i - 1]);
  }

  for (let i = nums.length - 1; i >= 0; i--) {
    let top;
    while (s.length && nums[i] > nums[s[s.length - 1]]) {
      top = s.pop();
    }

    s.push(i);

    // 此时的 top 是 nums[i] 与其右边区间中最近更大的元素 nums[j] 形成的 [i+1, j-1] 中的最大值
    // 然后判断 top 是否符合要求 ？？？
    if (l[i] < nums[i] && l[i] < nums[top] && nums[i] > nums[top]) return true;
  }

  return false;
};
// @lc code=end
