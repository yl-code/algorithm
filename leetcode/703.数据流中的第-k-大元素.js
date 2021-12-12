/*
 * @lc app=leetcode.cn id=703 lang=javascript
 *
 * [703] 数据流中的第 K 大元素
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
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function (k, nums) {
  this.k = k;
  this.minHeap = new Heap((x, y) => x < y);

  for (const num of nums) {
    this.minHeap.push(num);
    if (this.minHeap.size() > this.k) this.minHeap.pop();
  }
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
  this.minHeap.push(val);
  if (this.minHeap.size() > this.k) this.minHeap.pop();

  return this.minHeap.top();
};

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */
// @lc code=end
