/*
 * @lc app=leetcode.cn id=215 lang=javascript
 *
 * [215] 数组中的第K个最大元素
 */

// @lc code=start
class Heap {
  /**
   *
   * @param {*} compare 比较函数
   *
   * Heap 默认为大顶堆
   * 通过改变 compare = (x, y) => x < y，可以改变 Heap 为小顶堆
   */
  constructor(compare = (x, y) => x > y) {
    this.data = [];
    this.compare = compare;
  }

  swap = (i, j) => ([this.data[i], this.data[j]] = [this.data[j], this.data[i]]);

  size = () => this.data.length;

  top = () => this.data[0];

  shiftUp = (currIndex = this.size() - 1) => {
    const { data, compare, swap } = this;

    while (currIndex) {
      let parentIndex = (currIndex - 1) >> 1;
      if (compare(data[parentIndex], data[currIndex])) break;

      swap(currIndex, parentIndex);
      currIndex = parentIndex;
    }
  };

  push = (val) => {
    this.data.push(val);
    this.shiftUp();
  };

  shiftDown = (index = 0) => {
    const { data, size, swap, compare } = this;

    let temp = index * 2 + 1;

    while (temp < size()) {
      let right = index * 2 + 2;
      if (right < size() && compare(data[right], data[temp])) {
        temp = right;
      }

      if (compare(data[index], data[temp])) break;

      swap(temp, index);

      index = temp;

      temp = index * 2 + 1;
    }
  };

  pop = () => {
    if (!this.size()) return;

    const { data, shiftDown, swap } = this;

    swap(0, this.size() - 1);

    const res = data.pop();

    shiftDown();

    return res;
  };
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  const minHead = new Heap((x, y) => x < y);

  for (const num of nums) {
    minHead.push(num);

    if (minHead.size() > k) {
      minHead.pop();
    }
  }

  return minHead.top();
};
// @lc code=end
