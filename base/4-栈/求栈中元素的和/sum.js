/**
 * 读取 stack.txt 中的数据
 * 按照顺序进行 push 和 pop 操作
 * 将所有 pop 出来的数字 乘以 它被 pop 的序号数，得出最后的积
 */

const fs = require("fs");
const data = fs.readFileSync("./stack.txt", "utf-8");
const list = data.split("\n");

const stack = [];
let index = 1;
let sum = 0;
list.forEach((item) => {
  const [type, num] = item.split(" ");
  if (type === "push") {
    stack.push(num);
  } else if (type === "pop") {
    sum += Number(stack.pop() * index++);
  }
});

console.log(sum); // 11186206671
