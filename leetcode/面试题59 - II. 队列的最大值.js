/**
 *
 * 面试题59 - II. 队列的最大值
 * https://leetcode.cn/problems/dui-lie-de-zui-da-zhi-lcof
 *
 * 请定义一个队列并实现函数 max_value 得到队列里的最大值，
 * 要求函数max_value、push_back 和 pop_front 的均摊时间复杂度都是O(1)。
 * 若队列为空，pop_front 和 max_value 需要返回 -1
 */

class MaxQueue {
  constructor() {
    this.data = []; // 数据存储区
    this.q = []; // 单调队列
  }

  max_value() {
    if (!this.data.length) return -1;
    return this.q[0];
  }

  push_back(value) {
    const { data, q } = this;
    data.push(value);

    while (q.length && q[q.length - 1] < value) q.pop();
    q.push(value);
  }

  pop_front() {
    const { data, q } = this;
    if (!data.length) return -1;
    if (data[0] === q[0]) q.shift(); // 此时表示出队的元素是最大值，相应的 单调队列也需要去掉该值
    return data.shift();
  }
}
