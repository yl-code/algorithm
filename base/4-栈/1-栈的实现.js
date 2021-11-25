class Stack {
  constructor(maxSize) {
    this.maxSize = maxSize; // 栈的容量
    this.count = 0; // 当前栈中的元素个数
    this.top = -1; // 栈顶指针，初始值为 -1
    this.data = {}; // 用于存放栈元素
  }

  isFull = () => {
    return this.count === this.maxSize;
  };

  isEmpty = () => {
    return this.count === 0;
  };

  push = (val) => {
    if (this.isFull()) {
      console.log("栈已满");
      return;
    }
    this.top++;
    this.count++;
    this.data[this.top] = val;
    this.output();
  };

  pop = () => {
    if (this.isEmpty()) {
      console.log("栈已空");
      return;
    }

    this.top--;
    this.count--;

    this.output();
  };

  output = () => {
    if (this.isEmpty()) {
      console.log("没有元素可以打印");
      return;
    }

    let outputStr = "";
    for (let index = this.top; index >= 0; index--) {
      outputStr += `${this.data[index]}, `;
    }
    console.log(outputStr);
  };
}

const stack = new Stack(3);
stack.output();
stack.push(1);
stack.push(2);
stack.pop();
stack.push(3);
stack.push(4);
stack.push(5);
