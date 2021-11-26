const calc = (str, leftIndex, rightIndex) => {
  let temp = 0, // 操作符的临时加成，遇到 "(" 优先级 + 100，遇到 ")" 优先级 -100
    currPriority, // 当前操作符优先级
    operatorIndex = -1, // 当前操作符的位置索引
    prePriority = Number.MAX_SAFE_INTEGER; // 前一个操作符的优先级

  for (let index = leftIndex; index <= rightIndex; index++) {
    currPriority = prePriority + 1;

    switch (str[index]) {
      case "*":
      case "/":
        currPriority = temp + 2;
        break;
      case "+":
      case "-":
        currPriority = temp + 1;
        break;
      case "(":
        temp += 100;
        break;
      case ")":
        temp -= 100;
        break;
      default:
        break;
    }

    if (prePriority > currPriority) {
      prePriority = currPriority;
      operatorIndex = index;
    }
  }

  if (operatorIndex === -1) {
    let num = 0;
    for (let index = leftIndex; index <= rightIndex; index++) {
      if (str[index] < "0" || str[index] > "9") continue;
      num = num * 10 + Number(str[index]);
    }
    console.log("操作数：", num, str.slice(leftIndex, rightIndex + 1));
    return num;
  }

  const left = calc(str, leftIndex, operatorIndex - 1);
  const right = calc(str, operatorIndex + 1, rightIndex);

  console.log(left, str[operatorIndex], right);

  switch (str[operatorIndex]) {
    case "*":
      return left * right;
    case "/":
      return left / right;
    case "+":
      return left + right;
    case "-":
      return left - right;
  }
  return 0;
};

const str = "3 * (4 + (5 + 5 * 11))";
const val = calc(str, 0, str.length - 1);
console.log(val);
