/*
 * @lc app=leetcode.cn id=239 lang=javascript
 *
 * [239] 滑动窗口最大值
 */

// @lc code=start

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  // 单调队列，存放的是 nums 中的索引
  // 所有索引对应的元素，是单调递减排列的
  // 所以队首索引对应的元素，就是队列中的最大值
  let queue = [];

  // 返回结果集合
  let res = [];

  // 遍历所有元素
  for (let i = 0; i < nums.length; i++) {
    // 当队列中有索引值，并且队尾索引对应的元素 比 即将入队的索引对应的元素 要小，则直接将队尾索引出队
    while (queue.length && nums[i] > nums[queue[queue.length - 1]]) {
      queue.pop();
    }

    // 入队新元素的索引
    // 此时队列中，所有索引，对应的元素，就是单调递减的
    queue.push(i);

    // 边界值，当 队首索引值 === i - k 时，表示 队首索引，逻辑上已经在队列外了，需要将其出队
    if (queue[0] === i - k) {
      queue.shift();
    }

    // 边界值，当 i === k - 1 时表示，已经有 k 个元素的索引已经入过队了
    // 根据题目描述，每次滑动窗口，也就是有新元素的索引入队
    // 都需要记录下，队列内所有索引对应元素中，最大的元素，也就是单调递减队列的队首元素
    if (i >= k - 1) {
      res.push(nums[queue[0]]);
    }
  }

  return res;
};

// /**
//  * @param {number[]} nums
//  * @param {number} k
//  * @return {number[]}
//  */
// var maxSlidingWindow = function (nums, k) {
//   let maxList = [];

//   for (let i = 0; i <= nums.length - k; i++) {
//     let max = nums[i];

//     for (let j = 0; j < k; j++) {
//       if (nums[i + j] > max) max = nums[i + j];
//     }

//     maxList.push(max);
//   }

//   return maxList;
// };
// @lc code=end
