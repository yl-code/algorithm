/*
 * @lc app=leetcode.cn id=128 lang=javascript
 *
 * [128] 最长连续序列
 */

// @lc code=start
/**
 * 根据题目要求改造并查集
 * 需要求出连续序列的长度，所以需要加上一个数组 size 来存储每个集合的元素个数
 * 然后在 merge 操作时，更新 合并后产生的新集合 的元素个数
 */
class UnionSet {
  constructor(n) {
    this.root = new Array(n);
    this.size = new Array(n).fill(1);

    for (let i = 0; i < n; i++) {
      this.root[i] = i;
    }
  }

  find = (x) => (this.root[x] = this.root[x] === x ? x : this.find(this.root[x]));

  merge = (a, b) => {
    const root_a = this.find(a);
    const root_b = this.find(b);

    if (root_a === root_b) return;

    this.size[root_b] += this.size[root_a];

    this.root[root_a] = root_b;
  };
}

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  // 初始化并查集
  const unionSet = new UnionSet(nums.length);
  // 初始化一个 map<num, index>
  // key 为 元素本身，value 为 元素在原数组中的索引
  const map = new Map();

  // 遍历题目输入的数组
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];

    // 由于题目输入的数组时存在重复数字的，且重复数字不算在结果内，所以直接 continue
    if (map.get(num) !== undefined) continue;

    // 存下数字的索引
    map.set(num, i);

    // 如果 num - 1 存在，即将其索引 与当前 num 的索引做连通操作
    if (map.get(num - 1) !== undefined) {
      unionSet.merge(map.get(num - 1), i);
    }

    // 如果 num + 1 存在，即将其索引 与当前 num 的索引做连通操作
    if (map.get(num + 1) !== undefined) {
      unionSet.merge(map.get(num + 1), i);
    }

    // 为啥上面两个操作时合并的元素的索引？
    // 并查集 是根据元素个数来初始化的，nums.length，本就应该操作元素对应的索引
    // 况且数组中的数字可能会很大，如，100，
    //
    // 用索引 计算得到 对应的元素 是一个技巧，类似的有，通过元素坐标计算元素编号
  }

  // 遍历一遍 并查集 中的 size 数组，集合找到元素最多的集合
  let res = 0;
  for (let i = 0; i < nums.length; i++) {
    if (unionSet.find(i) === i) res = Math.max(res, unionSet.size[i]);
  }

  return res;
};
// @lc code=end
