class UnionSet {
  // n 为元素个数，这些元素的编号为 0 ～ n-1
  constructor(n) {
    // 每个元素对应的 所在集合的 根节点
    this.root = new Array(n);

    // 每个元素对应的 所在集合的 元素数量
    this.size = new Array(n);

    // 初始化时，集合中每个元素的根节点为自己，所以每个元素所在集合的元素数量为 1
    for (let i = 0; i < n; i++) {
      this.root[i] = i;
      this.size[i] = 1;
    }
  }

  // // 查找 x 的根节点
  // find = (x) => {
  //   if (this.root[x] === x) return x;

  //   return this.find(this.root[x]);
  // };

  /**
   *
   * 路径压缩优化
   *
   * 每次查找到元素的 root 之后，直接将元素挂载到 root 上
   * 下次查找该元素的 root 时，只需要查找一次即可
   *
   */
  find = (x) => {
    if (this.root[x] === x) return x;

    let root = this.find(this.root[x]);
    this.root[x] = root;

    return root;
  };

  // 连通 a, b 两点
  // 也就是合并 a, b 所在的两个集合
  // 也就是 统一 这两个集合的根节点
  //
  //
  merge = (a, b) => {
    let root_a = this.find(a);
    let root_b = this.find(b);

    // 根节点相同，表示两个元素已经是属于同一个集合了
    if (root_a === root_b) return;

    // 元素对应的集合的元素个数较大者，其根元素应作为合并后的集合的根节点
    if (this.size[root_a] > this.size[root_b]) {
      this.root[root_b] = root_a;
      this.size[root_a] += this.size[root_b];
    } else {
      this.root[root_a] = root_b;
      this.size[root_b] += this.size[root_a];
    }
  };
}
