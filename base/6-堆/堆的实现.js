class BigTopHeap {
  constructor() {
    this.data = []; // 存放堆中元素的连续存储空间
    this.count = 0; // 堆中元素的个数
  }

  getTop = () => {
    return this.data[0];
  };

  getSize = () => {
    return this.count;
  };

  /**
   * 向上调整：需要用当前子节点的序号 index 算出其父节点的序号
   *
   * 由于当前堆的序号是从 0 开始的
   * 所以当父节点的序号为 n 时，左右子节点的序号分别为 2n + 1, 2n + 2
   * 那么当子节点的序号为 n 时，父节点的序号为 Math.floor((n - 1) / 2) === (n - 1) >> 1
   *
   */
  shiftUp = (index) => {
    // 当 index 不为 0，且 当前节点的值 > 其父节点的值，进入循环
    while (index && this.data[(index - 1) >> 1] < this.data[index]) {
      [this.data[(index - 1) >> 1], this.data[index]] = [this.data[index], this.data[(index - 1) >> 1]];
      index = (index - 1) >> 1;
    }
  };

  /**
   * 添加元素
   */
  push = (val) => {
    this.data[this.count++] = val;
    this.shiftUp(this.count - 1);
  };

  /**
   * 向下调整：从根节点元素开始，将树调整为符合 大顶堆 的性质
   */
  shiftDown = (index) => {
    // 当前节点的, 左节点的序号存在时，即 小于 序列的最大序号值，进入循环
    while (index * 2 + 1 <= this.count - 1) {
      let maxIndex = index;

      // 当左子节点的值 大于 父节点的值时，记录左子节点的序号
      if (this.data[index * 2 + 1] > this.data[maxIndex]) {
        maxIndex = index * 2 + 1;
      }

      // 当右子节点的序号存在，且其值 大于 父节点的值时，记录右子节点的序号
      if (index * 2 + 2 <= this.count - 1 && this.data[index * 2 + 2] > this.data[maxIndex]) {
        maxIndex = index * 2 + 2;
      }

      // 当前节点的值大于两个子节点时，说明当前树已经满足 大顶堆 特性，直接 break 即可
      if (maxIndex === index) break;

      // 交换位置
      [this.data[maxIndex], this.data[index]] = [this.data[index], this.data[maxIndex]];
      index = maxIndex;
    }
  };

  /**
   * 弹出元素
   *
   * 原本是直接用 堆 的最后一个元素值，直接覆盖掉 堆顶元素值
   * 此处偷个懒，直接调换两个位置的值，为后面写堆排序准备
   */
  pop = () => {
    if (!this.getSize()) return;
    // this.data[0] = this.data[this.count - 1];

    [this.data[0], this.data[this.count - 1]] = [this.data[this.count - 1], this.data[0]];
    this.count--;
    this.shiftDown(0);
    this.output();
  };

  // 打印堆中元素
  output = () => {
    console.log(this.data.slice(0, this.count).join(" "));
  };
}

const bigTopHeap = new BigTopHeap();
bigTopHeap.push(1);
bigTopHeap.push(5);
bigTopHeap.push(3);
bigTopHeap.push(9);
bigTopHeap.push(7);
bigTopHeap.push(6);
bigTopHeap.push(4);
bigTopHeap.output();
bigTopHeap.pop();
bigTopHeap.pop();
bigTopHeap.pop();
bigTopHeap.pop();
bigTopHeap.pop();
bigTopHeap.pop();
bigTopHeap.pop();

console.log(bigTopHeap.data); // 1, 3, 4, 5, 6, 7, 9

// bigTopHeap.pop();
