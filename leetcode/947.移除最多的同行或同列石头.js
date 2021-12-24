/*
 * @lc app=leetcode.cn id=947 lang=javascript
 *
 * [947] 移除最多的同行或同列石头
 */

// @lc code=start
/**
 * @param {number[][]} stones
 * @return {number}
 *
 * 思路很简单
 *
 * 按照题目要求，可以认为 同行或者同列 的石头位于同一个集合中
 * 读题可知，同一个集合中，移除所有可移除石头后，还会剩下一个石头
 * 所以题目求可以移除石头的最大数量 === 石头总数 - 集合数量
 *
 */
var removeStones = function (stones) {
  const unionSet = new UnionSet(stones.length);

  // 创建两个字典
  // key 分别是 横坐标 / 纵坐标
  // value 是石头对应的坐标
  const xDict = {};
  const yDict = {};

  // 遍历所有石头，将 同行或者同列 的石头都做连通操作
  for (let i = 0; i < stones.length; i++) {
    const [x, y] = stones[i];

    // 如果 有石头 与 当前石头 的横坐标相同，连通这俩石头
    if (xDict[x] >= 0) unionSet.merge(i, xDict[x]);

    // 如果 有石头 与 当前石头 的纵坐标相同，连通这俩石头
    if (yDict[y] >= 0) unionSet.merge(i, yDict[y]);

    // 分别根据横纵坐标记录当前石头的索引值
    xDict[x] = i;
    yDict[y] = i;
  }

  let num = 0;
  for (let i = 0; i < stones.length; i++) {
    if (unionSet.find(i) === i) num++;
  }

  return stones.length - num;
};

class UnionSet {
  constructor(n) {
    this.root = new Array(n);
    for (let i = 0; i < n; i++) {
      this.root[i] = i;
    }
  }

  find = (x) => (this.root[x] = this.root[x] === x ? x : this.find(this.root[x]));

  merge = (a, b) => (this.root[this.find(a)] = this.find(b));
}
// @lc code=end
