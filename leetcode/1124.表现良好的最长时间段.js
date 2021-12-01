/*
 * @lc app=leetcode.cn id=1124 lang=javascript
 *
 * [1124] 表现良好的最长时间段
 */

// @lc code=start
/**
 * @param {number[]} hours
 * @return {number}
 *
 *
 * 思路：
 *    题目要求得出的这段良好时间段里面，大于8小时的天数 大于 小于8小时的天数
 *    以 [9,9,6,0,6,6,9] 为例，大于8小时，就加 1，小于8小时，就减 1
 *    那么上面的序列可以转换为 [1, 1, -1, -1, -1, -1, 1]
 *
 *    转换后题目可以转换为，求转换后的序列中，元素和大于 0 的最长的一段序列
 *
 *    只要是求某段序列元素和，都可以用前缀和序列来做
 *
 *    上面转换的序列，转换为前缀和序列为，[0, 1, 2, 1, 0, -1, -2, -1]，前缀和序列第一个元素为 0，长度比原序列多一位
 *
 *    最终问题变为求，上述前缀和序列中，两个索引 i 和 j，使 j - i 最大，且保证 j 对应的元素 减去 i 对应的元素，差大于 0
 *
 *    下面是暴力写法，后续有优雅写法再改
 */
var longestWPI = function (hours) {
  // 求前缀和序列
  let list = new Array(hours.length + 1).fill(0);
  for (let i = 1; i < hours.length + 1; i++) {
    if (hours[i - 1] > 8) {
      list[i] = list[i - 1] + 1;
    } else {
      list[i] = list[i - 1] - 1;
    }
  }

  let max = 0;
  for (let i = 0; i < list.length - 1; i++) {
    for (let j = i + 1; j < list.length; j++) {
      if (list[j] - list[i] > 0) {
        max = Math.max(max, j - i);
      }
    }
  }

  return max;
};

// var longestWPI = function (hours) {
//   // 前缀和
//   let preSum = new Array(hours.length+1).fill(0)
//   for (let i = 0; i < hours.length; i++) {
//       if (hours[i] > 8) preSum[i+1] = preSum[i] + 1
//       else preSum[i+1] = preSum[i] - 1
//   }

//   // 单减栈
//   let stack = []
//   stack.push(0)
//   for (let i = 1; i < preSum.length; i++){
//       if (preSum[stack[stack.length-1]] > preSum[i]) stack.push(i)
//   }

//   // 从右到左求最大跨度
//   let max = 0
//   for (let i = preSum.length-1; i > max; i--){
//       while(stack.length > 0 && preSum[stack[stack.length-1]] < preSum[i]){
//           max = Math.max(max, i - stack.pop() )
//       }
//   }
//   return max
// };

// @lc code=end
