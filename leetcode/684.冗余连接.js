/*
 * @lc app=leetcode.cn id=684 lang=javascript
 *
 * [684] 冗余连接
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

  merge = (a, b) => {
    const root_a = this.find(a);
    const root_b = this.find(b);

    this.root[root_a] = root_b;
  };
}

/**
 * @param {number[][]} edges
 * @return {number[]}
 *
 * 思路很简单
 *
 * 遍历题目输入的 边关系数组，依次在 并查集 中维护节点的连通关系
 * 如果有一组，边关系中的两个节点，已经是连通的了，说明这条边就是多余的
 */
var findRedundantConnection = function (edges) {
  const unionSet = new UnionSet(edges.length + 1);

  for (const [a, b] of edges) {
    let root_a = unionSet.find(a);
    let root_b = unionSet.find(b);

    if (root_a === root_b) return [a, b];

    unionSet.merge(a, b);
  }
};
// @lc code=end
