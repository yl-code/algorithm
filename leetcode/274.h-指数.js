/*
 * @lc app=leetcode.cn id=274 lang=javascript
 *
 * [274] H 指数
 *
 * 思路：可以先将数组进行升序排列，然后从后往前扫描每个元素，然后根据 h 指数要求即可得出结果
 */

// @lc code=start
/**
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function (citations) {
  citations.sort((x, y) => x - y);
  let h = 1;
  let n = citations.length;
  while (h <= n && citations[n - h] >= h) {
    h++;
  }

  return h - 1;
};
// @lc code=end
