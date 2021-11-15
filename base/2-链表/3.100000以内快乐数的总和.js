// 判断一个整数是不是快乐数，可以采用链表判环的思想来处理

const getNext = (n) => {
  let res = 0;
  while (n) {
    res += Math.pow(n % 10, 2);
    n = Math.floor(n / 10);
  }

  return res;
};

const isHappy = (n) => {
  let fast = n;
  let slow = n;

  do {
    fast = getNext(getNext(fast));
    slow = getNext(slow);
  } while (fast !== slow && fast !== 1);

  return fast === 1;
};

const getTenThousandHappy = (num = 100000) => {
  let res = 0;
  while (num) {
    if (isHappy(num)) {
      res += num;
    }
    num--;
  }

  console.log(res); // 692159746
  return res;
};

getTenThousandHappy();
