/**
 *
 * 给出一个长度为 n 的数组 list
 * 一个长为 k 的滑动窗口从最左移动到最右
 * 每次窗口移动一个元素的距离，输出窗口中的最小值
 *
 */

/**
 *
 * @param {*} list 原始数组
 * @param {*} k 滑动窗口的大小
 */
const slideWindow = (list, k) => {
  let min = []; // 每次滑动窗口中的最小值组成的序列

  // 定义单调队列 q
  // 为方便计算队首元素是否超出窗口的范围，队列只用存对应元素的下标即可
  let q = [];

  for (let i = 0; i < list.length; i++) {
    // 维护 q 的单调性
    while (q.length && q[q.length - 1] > list[i]) q.pop();
    q.push(i);

    if (i - q[0] === k) q.shift(); // 此时滑动窗口滑过 队首元素指向的位置 刚好一格，将队首元素出队

    if (i + 1 < k) continue; // 此时还没有扫描到 k 个元素，还没扫描到窗口中的所有元素
    min.push(list[q[0]]);
  }

  console.log(min.join());
};

slideWindow([1, 3, -1, -3, 5, 3, 6, 7], 3); // -1,-3,-3,-3,3,3
