const quickSort = (array) => {
  // 当数组长度 <= 1 时，直接返回数组
  if (array.length <= 1) return array;

  const mid = array.splice(array.length >> 1, 1);
  let left = [];
  let right = [];

  for (let i = 0; i < array.length; i++) {
    if (array[i] >= mid) {
      right.push(array[i]);
    } else {
      left.push(array[i]);
    }
  }

  // 递归求取左边数组和右边数组，递归返回的条件为 数组长度 <= 1
  return quickSort(left).concat(mid, quickSort(right));
};

const list = [1, 4, 2, 6, 5, 8, 2.1, 1];
console.log(quickSort(list));
