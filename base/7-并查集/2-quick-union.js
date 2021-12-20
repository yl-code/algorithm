/**
 * 树形结构表示集合关系，两个元素的根节点相同时，表示元素为同一个集合
 *
 */
class QuickUnion {
  // n 为元素个数，这些元素的编号为 0 ～ n-1
  constructor(n) {
    // 初始化一个 元素对应的 root 的集合
    this.root = new Array(n);

    // 初始化每个元素的 root 为自己
    for (let i = 0; i < n; i++) {
      this.root[n] = i;
    }
  }

  // 查询元素的 root
  find = (x) => {
    if (this.root[x] === x) return x;

    return this.find(this.root[x]);
  };

  // 连通 a 和 b 两个元素
  // 意味着将 a 和 b 所在的集合，合并为一个集合
  // 直接将 a 集合的根节点，挂在 b 集合根结点上即可
  merge = (a, b) => {
    const root_a = this.find(a);
    const root_b = this.find(b);

    if (root_a === root_b) return;

    this.root[a] = root_b;
  };
}
