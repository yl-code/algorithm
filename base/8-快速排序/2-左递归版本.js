/**
 *
 * @param {*} arr 待排序数组
 * @param {*} x 待排序的区间左索引
 * @param {*} y 待排序区间右索引
 */
const quickSort = (arr, x, y) => {
  while (x < y) {
    let l = x;
    let r = y;
    const base = arr[x];

    while (l < r) {
      while (l < r && arr[r] >= base) r--;
      if (l < r) arr[l++] = arr[r];

      while (l < r && arr[l] <= base) l++;
      if (l < r) arr[r--] = arr[l];
    }

    arr[l] = base;

    // 左递归，指的是左区间继续循环，右区间递归
    // 这样减少了 递归的调用，空间复杂度会降低
    // quickSort(arr, x, l - 1);
    quickSort(arr, r + 1, y);

    y = l - 1;
  }
};

// const quickSort_old = (arr, x, y) => {
//   if (x >= y) return;

//   let l = x;
//   let r = y;
//   const base = arr[x];

//   while (l < r) {
//     while (l < r && arr[r] >= base) r--;
//     if (l < r) arr[l++] = arr[r];

//     while (l < r && arr[l] <= base) l++;
//     if (l < r) arr[r--] = arr[l];
//   }

//   arr[l] = base;
//   console.log(x, y, l, r);

//   quickSort(arr, x, l - 1);
//   quickSort(arr, l + 1, y);
// };

const list = [3, 1, 7, 4, 5, 8, 9, 2, 6];
quickSort(list, 0, 8);
console.log(list.join());
