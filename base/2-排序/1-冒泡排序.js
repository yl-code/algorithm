const bubbleSort = (array) => {
  // 需要冒泡的轮数
  for (let i = 0; i < array.length - 1; i++) {
    // 冒泡到倒数第二位即可
    for (let j = 0; j < array.length - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }

  return array;
};

const list = [3, 4, 5, 1, 2, 6, 1.2];
console.log(bubbleSort(list).join(", "));
