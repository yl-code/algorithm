/**
 *
 * 染色法表示集合关系，两个元素的颜色相同时，表示这两个元素属于同一个集合
 *
 * 查找操作复杂度为 O(1)
 * 合并操作复杂度为 O(n)
 */
class QuickFind {
  // n 为元素个数，这些元素的编号为 0 ～ n-1
  constructor(n) {
    // 初始化元素对应的颜色集合
    this.color = new Array(n);

    // 初始化每个元素的颜色，每个元素的颜色都不一样
    for (let i = 0; i < n; i++) {
      this.color[i] = i;
    }
  }

  /**
   * 查询 元素 所在的集合
   * 即，查找元素的颜色
   */
  find = (x) => {
    return this.color[x];
  };

  /**
   * 连通 a 与 b
   * 意味着，a 与 b 所在的集合，将被合并为一个集合
   * 即，将两个集合染成统一的颜色
   *
   * 同一种颜色的元素，表示是在同一个集合中
   */
  merge = (a, b) => {
    if (this.find(a) === this.find(b)) return;

    const color_a = this.find(a);
    const color_b = this.find(b);

    // 遍历所有集合中的元素颜色，将颜色与 b 相同的元素，染成 a 的颜色
    for (let i = 0; i < n; i++) {
      if (this.find(i) === color_b) {
        this.color[i] = color_a;
      }
    }
  };
}
