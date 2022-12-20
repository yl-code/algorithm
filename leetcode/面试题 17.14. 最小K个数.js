/**
 * 面试题 17.14. 最小K个数
 * https://leetcode.cn/problems/smallest-k-lcci/
 *
 * 设计一个算法，找出数组中最小的k个数。以任意顺序返回这k个数均可。
 *
 */

class Heap {
  constructor() {
    this.data = [];
    this.compare = (i, j) => this.data[j] - this.data[i];
  }

  top = () => this.data[0];

  swap = (i, j) =>
    ([this.data[i], this.data[j]] = [this.data[j], this.data[i]]);

  size = () => this.data.length;

  shiftUp = (curr) => {
    if (curr <= 0) return;

    const parent = (curr - 1) >> 1;

    if (parent < 0 || this.compare(curr, parent) >= 0) return;

    this.swap(curr, parent);

    this.shiftUp(parent);
  };

  push = (val) => {
    this.data.push(val);

    this.shiftUp(this.size() - 1);
  };

  shiftDown = (curr) => {
    const { swap, size, compare } = this;

    if (curr >= size()) return;

    let temp = curr;
    let left = curr * 2 + 1;
    let right = curr * 2 + 2;

    if (left < size() && compare(temp, left) > 0) {
      temp = left;
    }

    if (right < size() && compare(temp, right) > 0) {
      temp = right;
    }

    if (temp === curr) return;

    swap(temp, curr);

    this.shiftDown(temp);
  };

  pop = () => {
    const { size, swap, data } = this;

    if (!size()) return;

    swap(0, size() - 1);

    let res = data.pop();

    this.shiftDown(0);

    return res;
  };
}

/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var smallestK = function (arr, k) {
  const maxHeap = new Heap();

  for (let i = 0; i < arr.length; i++) {
    // 优化性能，所以不需要每个数字都入堆
    if (maxHeap.size() < k || maxHeap.top() >= arr[i]) {
      maxHeap.push(arr[i]);
    }

    if (maxHeap.size() > k) {
      maxHeap.pop();
    }
  }

  return maxHeap.data;
};
