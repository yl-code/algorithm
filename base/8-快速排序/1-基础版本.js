/**
 *
 * @param {*} arr 待排序数组
 * @param {*} x 待排序的区间左索引
 * @param {*} y 待排序区间右索引
 */
const quickSort = (arr, x, y) => {
  // 边界条件
  if (x >= y) return;

  // 初始化左右指针
  let l = x;
  let r = y;
  // 暂定基准值为 区间第一个值
  const base = arr[x];

  // 当左指针 位于 右指针 左边时，继续循环
  while (l < r) {
    // 右指针 往 左移动，直到遇到 小于 基准值 的元素
    while (l < r && arr[r] >= base) r--;
    // 将该元素放到 左区间 的 左指针 的位置，并且将 左指针 往 右移动
    if (l < r) arr[l++] = arr[r];

    // 左指针 往 右移动，直到遇到 大于 基准值 的元素
    while (l < r && arr[l] <= base) l++;
    // 将该元素放到 右区间 的 右指针 的位置，并且将 右指针 往 左移动
    if (l < r) arr[r--] = arr[l];
  }

  // 此时左右指针相遇，将 基准值 放到相遇处置
  arr[l] = base;

  // 开始递归左右区间
  quickSort(arr, x, r - 1);
  quickSort(arr, l + 1, y);
};

const list = [3, 1, 7, 4, 5, 8, 9, 2, 6];
quickSort(list, 0, 8);
console.log(list.join());
