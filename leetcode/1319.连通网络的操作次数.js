/*
 * @lc app=leetcode.cn id=1319 lang=javascript
 *
 * [1319] 连通网络的操作次数
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
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var makeConnected = function (n, connections) {
  if (n - 1 > connections.length) return -1;

  const unionSet = new UnionSet(n);

  connections.forEach(([a, b]) => {
    unionSet.merge(a, b);
  });

  let res = 0;
  for (let i = 0; i < n; i++) {
    if (unionSet.find(i) === i) res++;
  }

  return res - 1;
};
// @lc code=end
