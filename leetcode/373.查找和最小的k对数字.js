/*
 * @lc app=leetcode.cn id=373 lang=javascript
 *
 * [373] 查找和最小的K对数字
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
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[][]}
 *
 * 思路：
 *    非常简单，看到最小，绝对是用大顶堆
 *    根据题目要求定制比较函数
 *    遍历所有的元素，依次放入大顶堆，并且弹出不符合条件的元素即可
 */
var kSmallestPairs = function (nums1, nums2, k) {
  // 根据题目要求，自定义比较函数
  const compare = (arr1, arr2) => arr1[0] + arr1[1] > arr2[0] + arr2[1];

  const maxHeap = new Heap(compare);

  for (const i of nums1) {
    for (const j of nums2) {
      // 此处做了一个优化
      // 题目给出的是两个升序数组，所以就不需要枚举所有的元素 [m, n]
      // 当内层循环的某个值，已经不满足入堆要求了，小于堆顶元素
      // 剩下的数字越来越大，更加不可能满足入堆要求，直接 break 即可
      if (maxHeap.size() < k || compare(maxHeap.top(), [i, j])) {
        maxHeap.push([i, j]);
        if (maxHeap.size() > k) maxHeap.pop();
      } else {
        break;
      }
    }
  }

  return maxHeap.data;
};
// @lc code=end
