/**
 *
 * @param {*} arr 待排序数组
 * @param {*} l 待排序数组区间的左边界
 * @param {*} r 待排序数组区间的右边界
 */
const merge_sort = (arr, l, r) => {
  // 只剩下一个元素 或者 区间为空
  if (l >= r) return;

  // 计算待排序数组的中间索引
  const mid = (l + r) >> 1;

  // 根据中间索引，将待排序数组分为两个区间，并分别进行递归
  merge_sort(arr, l, mid);
  merge_sort(arr, mid + 1, r);

  // 初始化一个临时数组
  const temp = [];

  // 初始化两个指针，分别指向左右两个区间的第一个元素
  let p1 = l;
  let p2 = mid + 1;

  // 通过这两个指针 归并 上面两段已排过序的区间
  while (p1 <= mid || p2 <= r) {
    // 当 p2 走过了 右区间 的 右边界
    // 或者
    // p1 没走过 左区间 的右边界 并且 p1 指针的元素 小于 p2 指针的元素
    // 则，直接将 p1 指针指向的元素添加到 临时数组中
    if (p2 > r || (p1 <= mid && arr[p1] < arr[p2])) {
      temp.push(arr[p1++]);
    } else {
      // 每次不是添加 p1 指针的元素，就是添加 p2 指针的元素
      temp.push(arr[p2++]);
    }
  }

  // 经过上面的 归并 操作，临时数组 temp 已然是 正序排列 的
  // 将临时数组中的元素 直接复制 到原数组中即可
  for (let i = l; i <= r; i++) {
    arr[i] = temp[i - l];
  }
};

const mergeSort = (arr, l, r) => {
  if (l >= r) return;

  const mid = (l + r) >> 1;

  mergeSort(arr, l, mid);
  mergeSort(arr, mid + 1, r);

  const temp = [];
  let p1 = l;
  let p2 = mid + 1;
  while (p1 <= mid || p2 <= r) {
    if (p2 > r || (p1 <= mid && arr[p1] < arr[p2])) {
      temp.push(arr[p1++]);
    } else {
      temp.push(arr[p2++]);
    }
  }

  for (let i = l; i <= r; i++) {
    arr[i] = temp[i - l];
  }
};

const arr = [2, 5, 1, 7, 3, 9, 4, 6, 8];
mergeSort(arr, 0, arr.length - 1);
console.log(arr);
