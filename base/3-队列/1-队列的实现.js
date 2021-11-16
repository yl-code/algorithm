class Queue {
  constructor(n = 10) {
    this.head = 0; // 头指针
    this.tail = 0; // 尾指针
    this.items = []; // 存放队列的数据
    this.maxSize = n; // 队列长度
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

    this.output();
  }

  // 出队
  pop() {
    if (this.isEmpty()) {
      console.log(`队列已空，出不了队了，head: ${this.head}, tail: ${this.tail}`);
      return;
    }

    ++this.head;

    this.output();
  }

  // 判空
  isEmpty() {
    return this.tail === this.head;
  }

  // 判满
  isFull() {
    return this.tail === this.maxSize;
  }

  // 获取队列当前的元素数量
  getSize() {
    return this.tail - this.head;
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
    for (let index = this.head; index < this.tail; index++) {
      list.push(this.items[index]);
    }
    console.log(list.join(", "));
  }
}

let queue = new Queue(2);

queue.push(11); // 11
queue.push(22); // 11, 22
queue.push(33); // 队列已满，入不了队了，head: 0, tail: 2

console.log("size: ", queue.getSize()); // size:  2

queue.pop(); // 22
console.log("fonrt: ", queue.getFront()); //fonrt:  22
queue.pop(); // [空]
queue.pop(); // 队列已空，出不了队了，head: 2, tail: 2
