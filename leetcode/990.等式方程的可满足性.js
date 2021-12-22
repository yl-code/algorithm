/*
 * @lc app=leetcode.cn id=990 lang=javascript
 *
 * [990] 等式方程的可满足性
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
 * @param {string[]} equations
 * @return {boolean}
 *
 * 题目的意思是，通过数组传入一系列字符串方程，有相等的，有不相等的
 * 然后给每个变量赋上合适的值，以满足所有方程，能满足所有方程则返回 true 否则返回 false
 *
 * 思路很简单
 * 遍历所有等式方程，用并查集 merge 这些等式两边的变量，相等的都会被 merge 到同一个集合中
 * 然后遍历所有不等式，然后只要找到一组不等式两边的变量，已经存在于上一步的等式集合中，就返回 false，否则返回 true
 *
 */
var equationsPossible = function (equations) {
  const unionSet = new UnionSet(26);

  // 遍历所有 等式方程
  // 将其中的变量，进行 merge 操作
  for (const str of equations) {
    if (str[1] === "!") continue;
    const x = str[0].charCodeAt() - 97;
    const y = str[3].charCodeAt() - 97;
    unionSet.merge(x, y);
  }

  // 遍历所有 不等式方程
  // 只要有一组变量是属于同一个 等式集合 就返回 false
  for (const str of equations) {
    if (str[1] === "=") continue;
    const x = str[0].charCodeAt() - 97;
    const y = str[3].charCodeAt() - 97;

    if (unionSet.find(x) === unionSet.find(y)) return false;
  }
  return true;
};
// @lc code=end
