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
var lengthOfLIS = function (nums) {
  /**
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
