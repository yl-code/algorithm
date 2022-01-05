/*
 * @lc app=leetcode.cn id=1508 lang=javascript
 *
 * [1508] 子数组和排序后的区间和
 *
 * 思路很简单
 *
 * nums：[1, 2, 3, 4] 是一个正整数集合
 * 所以它的所有非空连续子数组的和是正序的排列的，1 < 1 + 2 < 1 + 2+ 3

 * s[i,j] 表示 nums 的区间为 [i,j] 的非空连续子数组的和
 *
 * s[1,1]  s[1,2]  s[1,3]  s[1,4]  // 正序
 * s[2,2]  s[2,3]  s[2,4]  // 正序
 * s[3,3]  s[3,4]  // 正序
 * s[4,4]
 *
 * 题目要求所有非空连续子数组的和，并且升序排列
 * 就是将上面四个本来就是升序排列的数组，利用归并思想，进行归并
 * 
 * 首先将 第一列 的数字，也就是 nums 数组中的数字本身，压入小顶堆
 * 然后每轮，取堆顶元素，根据堆顶元素，算出下一个元素的值，然后压入小顶堆
 * 
 */

// @lc code=start
class Heap {
  constructor(compare) {
    this.data = [];
    this.compare = compare || ((a, b) => a.sum - b.sum);
  }

  // 传入索引值
  swap = (x, y) => ([this.data[x], this.data[y]] = [this.data[y], this.data[x]]);

  size = () => this.data.length;

  top = () => (this.size() ? this.data[0] : undefined);

  shiftUp = (curr) => {
    if (curr <= 0) return;

    const parent = (curr - 1) >> 1;

    const { shiftUp, compare, swap, data } = this;

    if (compare(data[curr], data[parent]) > 0) return;

    swap(curr, parent);

    shiftUp(parent);
  };

  push = (val) => {
    this.data.push(val);

    this.shiftUp(this.size() - 1);
  };

  shiftDown = (curr) => {
    const { size, swap, shiftDown, compare, data } = this;

    if (curr >= size()) return;

    let temp = curr;
    let left = curr * 2 + 1;
    let right = curr * 2 + 2;

    if (left < size() && compare(data[temp], data[left]) > 0) {
      temp = left;
    }

    if (right < size() && compare(data[temp], data[right]) > 0) {
      temp = right;
    }

    if (temp === curr) return;

    swap(curr, temp);

    shiftDown(temp);
  };

  pop = () => {
    const { data, swap, shiftDown } = this;

    swap(0, data.length - 1);

    const res = data.pop();

    shiftDown(0);

    return res;
  };
}

/**
 * @param {number[]} nums
 * @param {number} n
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
var rangeSum = function (nums, n, left, right) {
  const minHeap = new Heap((a, b) => a.sum - b.sum);

  // 先将 nums 数组中的数字压入小顶堆
  // 压入小顶堆的元素，记录了 nums 中区间为 [i,j] 的非空连续子数组的和 sum
  for (let index = 0; index < n; index++) {
    minHeap.push({
      i: index,
      j: index,
      sum: nums[index],
    });
  }

  // 初始化 res 用于统计 题目要求的结果
  let res = 0;

  // 模
  const mod = Math.pow(10, 9) + 7;

  // 开始循环，从 1 开始，到题目要求的 right
  for (let index = 1; index <= right; index++) {
    // 取出堆顶最小元素
    let top = minHeap.pop();

    // 满足题目要求 [left, right]
    // 开始统计和值 res
    if (index >= left) {
      res = (res + top.sum) % mod;
    }

    // 根据最小元素，算出下一个元素，压入小顶堆
    // 这样才能保证,每轮取出一个不漏的，从小到大的，非空连续子数组和组成的数组，的每个元素 top
    if (top.j + 1 < n) {
      minHeap.push({
        i: top.i,
        j: top.j + 1,
        sum: (top.sum + nums[top.j + 1]) % mod,
      });
    }
  }

  return res;
};
// @lc code=end
