/**
 * 题目：
 *
 * 给你一个整数 x，如果 x 是一个回文整数，返回 true；否则返回 false
 *
 * 回文数指的是正序或者倒序读是一样的整数，例如，121 是回文数，而 123 不是
 */

const check = (num) => {
  if (typeof num !== "number") return false;

  let numList = String(num).split("");

  if (numList.length === 1) return true;

  let startIndex;

  if (numList.length % 2 !== 0) {
    let minIndex = numList.length >> 1;
    startIndex = minIndex - 1;
    numList.splice(minIndex, 1);
  } else {
    startIndex = numList.length / 2 - 1;
  }

  for (let i = startIndex, j = i + 1; i >= 0; i--, j++) {
    if (numList[i] !== numList[j]) {
      return false;
    }
  }

  return true;
};

console.log(check(11223322114));
console.log(check(1122332211));
console.log(check(11223432211));
