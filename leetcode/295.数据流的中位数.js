/*
 * @lc app=leetcode.cn id=295 lang=javascript
 *
 * [295] 数据流的中位数
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

  /**
   *
   * 向上调整：需要用当前子节点的序号 index 算出其父节点的序号
   *
   * 由于当前堆的序号是从 0 开始的
   * 所以当父节点的序号为 n 时，左右子节点的序号分别为 2n + 1, 2n + 2
   * 那么当子节点的序号为 n 时，父节点的序号为 Math.floor((n - 1) / 2) === (n - 1) >> 1
   *
   * @param {*} currIndex 默认为序列最后一个元素的序号
   */
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

  /**
   *
   * 向下调整：从根节点元素开始，将树调整为符合 大顶堆 的性质
   *
   * @param {*} index 默认为序列第一个元素的序号
   */
  shiftDown = (index = 0) => {
    const { data, size, swap, compare } = this;

    // 此时需要找到 当前节点 与其 左右子节点 中最大值
    // 将最大值序号 初始化 左子节点 的序号
    let maxIndex = index * 2 + 1;

    // 当最大值序号存在时，即小于序列的长度
    while (maxIndex < size()) {
      // 计算 右子节点序号
      let right = index * 2 + 2;

      // 当 右子节点的序号 存在，且 右子节点 比 左子节点 大时，将最大值序号更新为 右子节点的序号
      if (right < size() && compare(data[right], data[maxIndex])) {
        maxIndex = right;
      }

      // 当 当前节点 已经大于 最大值，则表示不用调整节点了
      if (compare(data[index], data[maxIndex])) break;

      // 否则调换 当前节点 与 最大值的节点
      swap(maxIndex, index);

      // 更新 当前节点序号
      index = maxIndex;

      // 更新 最大值序号，进入下轮循环
      maxIndex = index * 2 + 1;
    }
  };

  pop = () => {
    if (!this.size()) return;

    const { data, shiftDown, swap } = this;

    // 这一步非常重要 ！！！
    // 弹出堆顶元素后，需要用最后一位元素补上，堆顶的空位，原因有以下两点：
    // 1、以保证堆内所有元素，是存储在在一片连续的存储空间
    // 2、堆是完全二叉树，树的根节点必须有值
    //
    // 所以最简单且最合理的做法是，先调换首尾元素，再弹出尾部元素
    swap(0, this.size() - 1);

    const res = data.pop();

    shiftDown();

    return res;
  };
}

var MedianFinder = function () {
  this.maxHeap = new Heap();
  this.minHeap = new Heap((x, y) => x < y);
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
  if (!this.maxHeap.size() || num <= this.maxHeap.top()) {
    this.maxHeap.push(num);
  } else {
    this.minHeap.push(num);
  }

  // 约定
  // 大顶堆表示的前半段序列的元素个数
  // 只比小顶堆表示的后半段序列的元素个数，多一个
  if (this.minHeap.size() > this.maxHeap.size()) {
    this.maxHeap.push(this.minHeap.pop());
  }

  if (this.maxHeap.size() === this.minHeap.size() + 2) {
    this.minHeap.push(this.maxHeap.pop());
  }

  // ！！！！！！！！！！！！！ 这行 log 在数据量较大时，会导致 Output Limit Exceeded ！！！！！！！！！！！！！！
  // console.log(
  //   "console log 输出也会影响 leetcode 的执行，测试用例的数据量很大时，会造成超时",
  //   this.maxHeap.data,
  //   this.minHeap.data
  // );
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
  const leftMax = this.maxHeap.top();
  const rightMin = this.minHeap.top();
  if (this.minHeap.size() === this.maxHeap.size()) {
    return (leftMax + rightMin) / 2;
  } else {
    return leftMax;
  }
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
// @lc code=end
