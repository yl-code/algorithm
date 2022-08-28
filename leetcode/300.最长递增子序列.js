/*
 * @lc app=leetcode.cn id=300 lang=javascript
 *
 * [300] 最长递增子序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

const binary_search_01 = (temp, x) => {
  let l = 0,
    r = temp.length,
    mid;

  while (l < r) {
    mid = (r + l) >> 1;
    if (temp[mid] >= x) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }

  return l; // 找不到 x，就返回 temp 的长度
};

const lengthOfLIS = (nums) => {
  /**
   * 这个思路很奇妙
   * 假设 temp 数组存放的是递增的 nums 的元素
   * 那么遍历 nums 数组的每个元素 nums[i]，然后在 temp 数组中查找第一个 >nums[i] 的元素，它的位置为 j
   * 如果找不到，就可以将 nums[i] 添加到 temp 数组末尾
   *
   * 如果能找到，就替换 temp[j] = nums[i]
   * 这样做可以在不改变最长递增子序列的长度的情况下做一些替换操作
   *    如果替换掉 temp 中的最大值，这样最好，因为这样后面的元素才有机会加入 temp
   *    如果替换的是其他值，temp 长度不变，不影响题目要的答案，只是 temp 中存储的并不是真正的最长递增子序列
   */

  const temp = [nums[0]];

  for (let i = 1; i < nums.length; i++) {
    let j = binary_search_01(temp, nums[i]);
    temp[j] = nums[i];
  }

  return temp.length;
};

var lengthOfLIS_1 = function (nums) {
  /**
   * 暴力破解法：两层循环
   *
   * 现在的做法是，用 dp 数组存放, nums 中每个元素对应的，包含当前位置元素的最长递增子序列的长度，dp 中最大的数字就是问题的解
   *
   * 所以初始 dp 所有元素都是 1
   *
   * nums: [..., j, i, ...]
   *
   * 当 nums[i] > nums[j] 时，dp[i] = Math.max(dp[i], dp[j] + 1)
   *
   */
  let dp = new Array(nums.length).fill(1);
  max = 1;
  for (let i = 1; i < nums.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }

    max = Math.max(max, dp[i]);
  }

  return max;
};
// @lc code=end

// class Solution {
//   public:
//       int binary_search(vector<int>& nums, int n, int x) {
//           int l = 1, r = n + 1, mid;
//           while (l < r) {
//               mid = (l + r) >> 1;
//               if (nums[mid] >= x) r = mid;
//               else l = mid + 1;
//           }
//           return l;
//       }

//       int lengthOfLIS(vector<int>& nums) {
//           vector<int> len(nums.size() + 1);
//           len[1] = nums[0];
//           int ans = 1;
//           for (int i = 1; i < nums.size(); i++) {
//             int l = binary_search(len, ans, nums[i]);
//             len[l] = nums[i];
//             ans = max(ans, l);
//           }
//           return ans;
//       }
// };
