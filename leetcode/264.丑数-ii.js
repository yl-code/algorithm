/*
 * @lc app=leetcode.cn id=264 lang=javascript
 *
 * [264] 丑数 II
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

  top = () => this.data[0] || 0;

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
 * @param {number} n
 * @return {number}
 *
 * 思路：
 *    根据题目要求和示例1，可知题目要返回的是 不重复的 升序排列的 丑数序列 中的第 n 个丑数
 *
 *    那么就可以生成这样一个丑数序列，然后返回第 n 个数字
 *
 *    由于是 不重复的，升序排列的序列，所以可以通过每次取出最小的丑数，通过它计算后面的丑数
 *
 *    所以可以用 小顶堆 来解题
 */
var nthUglyNumber = function (n) {
  const minHeap = new Heap((x, y) => x < y);

  // 题目提示 1 也是丑数
  minHeap.push(1);
  let res = 0;

  while (n--) {
    res = minHeap.pop();

    if (res % 5 === 0) {
      // 当堆顶元素的，最大质因数是 5 时，生成的丑数是 res * 5
      minHeap.push(res * 5);
    } else if (res % 3 === 0) {
      // 当堆顶元素的，最大质因数是 3 时，生成的丑数有两个 res * 3 和 res * 5
      minHeap.push(res * 3);
      minHeap.push(res * 5);
    } else {
      // 否则堆顶元素的最大质因数是 2，那么可以生成 3 个丑数

      // 这样做是为了不产生 重复 的丑数
      // 其实也可以反着来，取出最小堆的堆顶元素
      // 当最大质因数为 5 时，该丑数也可以分别乘上2 / 3 / 5, 生成 3 个较大的丑数
      // 再由，最大质因数为 3 的丑数，乘上 2/3，生成 2 个丑数
      // 最后由，最大质因数为 2 的丑数，乘上 2，生成 1 个较小的丑数

      minHeap.push(res * 2);
      minHeap.push(res * 3);
      minHeap.push(res * 5);
    }
  }
  return res;
};
// @lc code=end
