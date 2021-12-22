/*
 * @lc app=leetcode.cn id=200 lang=javascript
 *
 * [200] 岛屿数量
 */

// @lc code=start
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

/**
 * @param {character[][]} grid
 * @return {number}
 *
 * 思路很简单
 *
 * 遍历网格中的元素，由于题目给的是网格，那么可以根据网格的坐标，算出编号 0 ～ x*y-1
 * 根据编号将元素为 "1" 且相邻的两个元素做连通操作，最后统计元素为 "1" 的集合的数量
 *
 * 如果当前元素时 "1"
 * 如果它的上方元素是 "1"，那么将它俩做连通操作
 * 如果它的左方元素是 "1"，那么将它俩做连通操作
 *
 */
var numIslands = function (grid) {
  // 计算 行数 和 列数，并初始化并查集
  const y = grid.length;
  const x = grid[0].length;
  const unionSet = new UnionSet(x * y);

  /**
   * 根据坐标算索引值
   * @param {*} m 横坐标
   * @param {*} n 纵坐标
   * @returns
   */
  const getIndex = (m, n) => m + n * x;

  // 遍历每个网格元素
  for (let i = 0; i < y; i++) {
    for (let j = 0; j < x; j++) {
      if (grid[i][j] === "0") continue;

      // 连通上面的岛屿
      if (i > 0 && grid[i - 1][j] === "1") {
        unionSet.merge(getIndex(j, i), getIndex(j, i - 1));
      }

      // 连通左边的岛屿
      if (j > 0 && grid[i][j - 1] === "1") {
        unionSet.merge(getIndex(j, i), getIndex(j - 1, i));
      }
    }
  }

  // 再次遍历网格的所有元素，统计值为 "1" 的集合的数量
  let res = 0;
  for (let i = 0; i < y; i++) {
    for (let j = 0; j < x; j++) {
      let index = getIndex(j, i);

      if (grid[i][j] === "1" && unionSet.find(index) === index) {
        res++;
      }
    }
  }

  return res;
};
// @lc code=end
