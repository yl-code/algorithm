/*
 * @lc app=leetcode.cn id=1801 lang=javascript
 *
 * [1801] 积压订单中的订单总数
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
 * @param {number[][]} orders
 * @return {number}
 *
 * 思路：
 * 维护一个大顶堆，用来积压存放采购订单，堆顶是出价最高的订单
 * 维护一个小顶堆，用来积压存放销售订单，堆顶是售价最低的订单
 *
 * 每次输入一个订单，根据订单类型，去消除对应的相反类型堆顶的订单，若订单数量有余量，继续压入对应堆中
 *
 * 最后计算两个堆的元素个数
 *
 */
var getNumberOfBacklogOrders = function (orders) {
  // 采购订单
  const buy = new Heap((x, y) => x[0] > y[0]);

  // 销售订单
  const sell = new Heap((x, y) => x[0] < y[0]);

  orders.forEach((order) => {
    // 判断当前订单类型
    if (order[2]) {
      // 当前为销售订单

      // 当前销售订单数量不为 0，且采购订单有积压，且采购订单堆顶的能满足当前交易
      while (order[1] !== 0 && buy.size() && buy.top()[0] >= order[0]) {
        // 进行交易
        // 消耗当前订单 与 采购订单 的数量
        let count = Math.min(order[1], buy.top()[1]);
        order[1] -= count;
        buy.data[0][1] -= count;

        // 若堆顶的采购订单的数量被消耗完，则弹出着这个订单
        if (!buy.data[0][1]) buy.pop();
      }

      // 若当前销售订单还有余量，则被积压到销售订单堆中去，日后再交易
      if (order[1] !== 0) sell.push(order);
    } else {
      // 当前为采购订单
      while (order[1] !== 0 && sell.size() && sell.top()[0] <= order[0]) {
        let count = Math.min(order[1], sell.top()[1]);
        order[1] -= count;
        sell.data[0][1] -= count;

        if (!sell.data[0][1]) sell.pop();
      }

      if (order[1] !== 0) buy.push(order);
    }
  });

  let sum = 0;
  buy.data.forEach((order) => {
    sum = (sum + order[1]) % 1000000007;
  });
  sell.data.forEach((order) => {
    sum = (sum + order[1]) % 1000000007;
  });
  return sum;
};
// @lc code=end
