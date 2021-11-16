class Queue {
  constructor(n = 10) {
    this.head = 0; // 头指针
    this.tail = 0; // 尾指针
    this.items = []; // 存放队列的数据
    this.maxSize = n; // 队列长度
    this.count = 0; // 当前元素数量
  }

  // 入队
  push(val) {
    if (this.isFull()) {
      console.log(`队列已满，入不了队了，head: ${this.head}, tail: ${this.tail}`);
      return;
    }

    this.items[this.tail] = val;

    // tail 指向队尾元素的下一位
    ++this.tail;
    // 当前队列元素个数加一
    ++this.count;

    // 循环起来
    if (this.tail === this.maxSize) {
      this.tail = 0;
    }

    this.output();
  }

  // 出队
  pop() {
    if (this.isEmpty()) {
      console.log(`队列已空，出不了队了，head: ${this.head}, tail: ${this.tail}`);
      return;
    }

    // 头指针往后走一步，完成出队操作
    ++this.head;
    // 当前队列元素个数减一
    --this.count;

    // 循环起来
    if (this.head === this.maxSize) {
      this.head = 0;
    }

    this.output();
  }

  // 判空
  isEmpty() {
    // return this.tail === this.head;
    return this.count === 0;
  }

  // 判满
  isFull() {
    // return this.tail === this.maxSize;
    return this.count === this.maxSize;
  }

  // 获取队列当前的元素数量
  getSize() {
    // return this.tail - this.head;
    return this.count;
  }

  // 获取队首元素
  getFront() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.head];
  }

  // 输出队列中的所有元素
  output() {
    let list = [];
    // for (let index = this.head; index < this.tail; index++) {
    //   list.push(this.items[index]);
    // }

    for (let index = this.head, n = 0; n < this.count; n++) {
      list.push(this.items[index]);
      index++;

      if (index === this.maxSize) {
        index = 0;
      }
    }
    console.log(list.join(", "));
  }
}

let queue = new Queue(3);

queue.push(11); // 11
queue.push(22); // 11, 22
queue.push(33); // 11, 22, 33
queue.push(44); // 队列已满，入不了队了，head: 0, tail: 0

console.log("size: ", queue.getSize()); // size:  3

queue.pop(); // 22, 33

queue.push(55); // 22, 33, 55
queue.push(66); // 队列已满，入不了队了，head: 1, tail: 1
console.log("fonrt: ", queue.getFront()); //fonrt:  22
queue.pop(); // 33, 55
queue.pop(); // 55
queue.pop(); // [空]
queue.pop(); // 队列已空，出不了队了，head: 1, tail: 1
