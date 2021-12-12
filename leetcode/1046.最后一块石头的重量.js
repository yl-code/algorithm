/*
 * @lc app=leetcode.cn id=1046 lang=javascript
 *
 * [1046] 最后一块石头的重量
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
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function (stones) {
  let maxHeap = new Heap();

  for (const stone of stones) {
    maxHeap.push(stone);
  }

  // 每一回合，从中选出两块 最重的 石头，然后将它们一起粉碎。
  while (maxHeap.size() > 1) {
    let y = maxHeap.pop();
    let x = maxHeap.pop();

    if (x !== y) maxHeap.push(y - x);
  }

  if (maxHeap.size()) {
    return maxHeap.pop();
  } else {
    return 0;
  }
};
// @lc code=end
