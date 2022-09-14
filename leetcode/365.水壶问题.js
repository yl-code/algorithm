/*
 * @lc app=leetcode.cn id=365 lang=javascript
 *
 * [365] 水壶问题
 *
 * 思路：
 *    两个水壶的剩余水的量就是本题的状态
 *    通过操作水壶的水，衍生出下一个状态，可以形成一棵问题求解树
 *    1个状态可以衍生出6个状态，如下：
 *
 *    初始状态为 (x, y)，下面 6 个为衍生状态
 *    其中一个水壶清空 (0, y) (x, 0)
 *    其中一个水壶加满 (X, y) (x, Y)
 *    一个水壶到一部分水到另一部分水壶 (x - z, y + z) (x + z, y - z)
 *
 *    要求能否一番操作之后得到 targetCapacity，所以应该采用广搜
 *
 */

// @lc code=start
/**
 * @param {number} jug1Capacity
 * @param {number} jug2Capacity
 * @param {number} targetCapacity
 * @return {boolean}
 */
var canMeasureWater = function (jug1Capacity, jug2Capacity, targetCapacity) {
  let set = new Set();
  let q = [[0, 0]];
  set.add('0-0');

  while (q.length) {
    const [x, y] = q.shift();

    if (x + y === targetCapacity) return true;

    for (let i = 0; i < 6; i++) {
      const next = getNext(i, x, jug1Capacity, y, jug2Capacity);
      let key = `${next[0]}-${next[1]}`;
      if (set.has(key)) continue;
      set.add(key);
      q.push(next);
    }
  }

  return false;
};

/**
 *
 * @param {*} i 状态编号
 * @param {*} x 第一个桶的水余量
 * @param {*} X 第一个桶的容量
 * @param {*} y 第二个桶的水余量
 * @param {*} Y 第二个桶的容量
 * @returns
 */
const getNext = (i, x, X, y, Y) => {
  switch (i) {
    case 0:
      return [0, y];
    case 1:
      return [x, 0];
    case 2:
      return [X, y];
    case 3:
      return [x, Y];
    case 4: {
      let temp = Math.min(x, Y - y);
      return [x - temp, y + temp];
    }
    case 5: {
      let temp = Math.min(X - x, y);
      return [x + temp, y - temp];
    }
  }
};
// @lc code=end
