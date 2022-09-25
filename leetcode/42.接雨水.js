/*
 * @lc app=leetcode.cn id=42 lang=javascript
 *
 * [42] 接雨水
 *
 * 思路：
 *    由题目示例 1 可知，能装水的凹槽，必然是两边长中间短的一组连续元素
 *
 *    可以联想到单调递减栈中，每次发生元素出栈时，就是这样的一个结构
 *    如下，是元素 2 入栈时的场景，栈内的 1，0 和即将入栈的 2 形成了一个凹槽
 *    stack: 1 0
 *    height[i]: 2
 *
 *    所以将原数组中的元素依次压入递减栈，每次发生元素出栈的行为时，即可计算凹槽的面积
 *
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let ret = 0;
  const s = []; // 维护栈内单调递减性质

  for (let i = 0; i < height.length; i++) {
    while (s.length && height[i] > height[s[s.length - 1]]) {
      let now = s.pop(); // 此时栈顶元素为，凹槽最低点，洼地

      if (!s.length) continue; // 若 now 的左边没有元素，则表示凹槽不存在

      // 分别计算左右两边与洼地的高度差
      // 左边是 now 前面一个元素，也就是现在的栈顶
      // 右边是即将入栈的 height [i]
      let l = height[s[s.length - 1]] - height[now];
      let r = height[i] - height[now];

      // 求当前凹槽的面积，并累加
      ret += Math.min(l, r) * (i - s[s.length - 1] - 1);
    }

    s.push(i);
  }

  return ret;
};
// @lc code=end
