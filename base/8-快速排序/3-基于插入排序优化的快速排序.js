/**
 * 优化快速排序，正序
 *
 * 定义一个阈值，用快速排序，将数组划分为若干小段
 * 由快速排序的特性可知，若干小段中的前面小段整体都会比后面小段要小
 *
 * 然后使用 无监督的插入排序，对整个序列进行排序
 */

const getMid = (a, b, c) => {
  if (a < b) [a, b] = [b, a];
  if (a < c) [a, c] = [c, a];
  if (b < c) [b, c] = [c, b];
  return b;
};

const threshold = 16;
const __quickSort = (arr, l_index, r_index) => {
  while (l_index - r_index > threshold) {
    // 初始化左右指针
    let l = l_index;
    let r = r_index;

    // 基准值优化
    // 从左中右三个位置取一个中间值
    let base = getMid(arr[l], arr[r], arr[(l + r) >> 1]);

    while (l < r) {
      while (arr[l] < base) l++;
      while (arr[r] > base) r--;

      if (l < r) {
        [arr[l], arr[r]] = [arr[r], arr[l]];
        l++;
        r--;
      }
    }

    // 左递归优化
    // 左区间循环，右区间递归，优化以往左右区间都递归，空间复杂度搞的问题
    __quickSort(arr, l, y);
    y = r;
  }
};

const insertSort = (arr, x, y) => {
  // 1、找到最小值索引
  let minIndex = x;
  for (let i = x + 1; i <= y; i++) {
    if (arr[minIndex] > arr[i]) minIndex = i;
  }

  // 2、将最小值放到待排序区间第一位
  if (minIndex > x) [arr[minIndex], arr[x]] = [arr[x], arr[minIndex]];

  // 上面两个步骤就是使用无监督的插入排序的优化手段
  // 将最小值提前放在第一位，来给整体排序加速
  // 同时也不需要在实现代码的时候判断边界情况了
  //
  // 3、接下来就是插入排序的正常操作
  for (let i = x + 2; i <= y; i++) {
    let j = i;
    while (arr[j] < arr[j - 1]) {
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      j--;
    }
  }
};

const quickSort = (arr, x, y) => {
  __quickSort(arr, x, y);
  insertSort(arr, x, y);
};

const list = [7, 3, 1, 4, 5, 8, 9, 2, 6, 3, 1, 7, 4, 5, 8, 9, 2, 6, 3, 1, 7, 4, 5, 8, 9, 2, 6];
quickSort(list, 0, 26);
console.log(list.join());
