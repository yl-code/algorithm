/**
 * 求原数组中每个元素，左侧最近的比自己小的元素，右侧最近的比自己小的元素
 *
 * @param {*} list 原数组
 */
const ascStack = (list) => {
  const stack = []; // 单调递减栈的数据区域，存放原数组中元素的下标
  const prev = []; // 存放原数组中，对应元素左侧第一个比自己小的元素的下标
  const next = []; // 存放原数组中，对应元素右侧第一个比自己小的元素的下标

  for (let i = 0; i < list.length; i++) {
    // 将所有元素依次入栈，同时维护栈内元素的单调性
    while (stack.length && list[stack[stack.length - 1]] > list[i]) {
      const ind = stack.pop();

      next[ind] = i; // 被出栈的元素右侧比他们更小的且最近的元素就是 i
    }

    // 此时若 栈已空，表示 i 元素左侧没有比它小更小的元素，可以使用虚拟元素索引 -1 表示更小
    // 否则 栈顶元素就是当前元素 i 左侧最近的更小元素
    if (!stack.length) prev[i] = -1;
    else prev[i] = stack[stack.length - 1];

    stack.push(i); // i 入栈
    // console.log(stack);
  }

  // 所有元素完成入栈，表示栈内剩余的元素右侧没有比之更小的元素了，可以使用虚拟元素索引 list.length 表示更小
  while (stack.length) {
    next[stack.pop()] = list.length;
  }

  console.log(`
    ${list.join('   ')} \n
    ${prev.join('   ')} \n
    ${next.join('   ')} \n
  `);
};

ascStack([6, 7, 9, 0, 8, 3, 4, 5, 1, 2]);
// output:
// list:     6   7   9   0   8   3   4   5   1   2
// ind: -1   0   1   2   3   4   5   6   7   8   9   10
// prev:    -1   0   1  -1   3   3   5   6   3   8
// next:     3   3   3  10   5   8   8   8  10  10
