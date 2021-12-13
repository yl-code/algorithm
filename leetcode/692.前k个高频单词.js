/*
 * @lc app=leetcode.cn id=692 lang=javascript
 *
 * [692] 前K个高频单词
 */

// @lc code=start
class Heap {
  /**
   *
   * @param {*} compare 比较函数
   *
   * Heap 默认为小顶堆顶堆
   * 通过改变 compare = (x, y) => x < y，可以改变 Heap 为大顶堆
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
      if (compare(data[currIndex], data[parentIndex])) break;

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
      if (right < size() && compare(data[temp], data[right])) {
        temp = right;
      }

      if (compare(data[temp], data[index])) break;

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
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
var topKFrequent = function (words, k) {
  // 统计每个单词出现的次数
  const freq = {};
  words.forEach((word) => {
    freq[word] ? (freq[word] = freq[word] + 1) : (freq[word] = 1);
  });

  // 根据题目要求
  // 如果单词出现的次数相同的，按照字母大小，升序排列
  // 小顶堆的比较函数
  const compare = (word1, word2) => {
    if (freq[word1] !== freq[word2]) {
      return freq[word1] > freq[word2];
    } else {
      return word1 < word2;
    }
  };

  const minHeap = new Heap(compare);

  for (const word of Object.keys(freq)) {
    minHeap.push(word);

    if (minHeap.size() > k) {
      minHeap.pop();
    }
  }

  // 留下来的堆内元素，也需要按照题目要求排序
  // 出现次数的降序，次数相同时，按照字母顺序升序
  return minHeap.data.sort((x, y) => {
    if (freq[y] !== freq[x]) {
      return freq[y] - freq[x];
    } else {
      return x.localeCompare(y);
    }
  });
};
// @lc code=end
