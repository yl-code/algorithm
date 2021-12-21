/*
 * @lc app=leetcode.cn id=547 lang=javascript
 *
 * [547] 省份数量
 */

// @lc code=start

class UnionSet {
  constructor(n) {
    // n 为元素个数，这些元素的编号为 0 ～ n-1
    // 每个元素对应的 所在集合的 根节点
    this.root = new Array(n);

    // 初始化时，集合中每个元素的根节点为自己，所以每个元素所在集合的元素数量为 1
    for (let i = 0; i < n; i++) {
      this.root[i] = i;
    }
  }

  find = (x) => (this.root[x] = this.root[x] === x ? x : this.find(this.root[x]));

  // 不需要 按秩合并，直接都挂在 b 的根节点上面
  merge = (a, b) => (this.root[this.find(a)] = this.find(b));
}

/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function (isConnected) {
  // 初始化一个并查集
  const unionSet = new UnionSet(isConnected.length);

  // 扫描所有城市
  // n x n 的矩阵，需要两层循环遍历
  // 由于矩阵的左下与右上是相同的，所以 第二层 j < i，达到优化的目的
  for (let i = 0; i < isConnected.length; i++) {
    for (let j = 0; j < i; j++) {
      if (isConnected[i][j]) {
        unionSet.merge(i, j);
      }
    }
  }

  // 遍历并查集中的元素，统计根节点的个数，就是集合的个数，也就是省份的个数
  let res = 0;
  for (let i = 0; i < isConnected.length; i++) {
    if (unionSet.find(i) === i) res += 1;
  }

  return res;
};
// @lc code=end
