/**
 * 题目描述:
 * 安全局搜索到了一批身份证号码，数量为 n
 * 希望按出生日期对它们进行从大到小排序，如果有相同日期，则按身份证号码从小到大进行排序
 * 身份证号有 18 位，包含特殊字符，出生日期为第 7 到第 14 位
 *
 * 输入格式:
 *    第一行输入正整数
 *    后面每行输入一个身份证
 *
 * 输出格式
 *    输出身份证
 *
 * 例子：
 * 输入：
 * 5
 * 466272307503271156
 * 215856472207097978
 * 234804580401078365
 * 404475727700034980
 * 710351408803093165
 *
 * 输出：
 * 404475727700034980
 * 234804580401078365
 * 215856472207097978
 * 710351408803093165
 * 466272307503271156
 */

const readline = require("readline"); // 使用node.js 的输入接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n = 0;
let list = [];

rl.on("line", function (line) {
  //监听控制台的输入

  if (line.length === 18) {
    list.push(line);
  } else {
    n = Number(line);
  }

  if (list.length === n) {
    // list.sort(compare);
    // merge_sort(list, 0, list.length - 1);
    // super_quick_sort(list);
    // quick_sort_old(list, 0, list.length - 1);
    quick_sort(list, 0, list.length - 1);

    // 输出身份证
    list.forEach((i) => console.log(i));
  }
});

// 身份证的比较函数
const compare = (str1, str2) => {
  const birth1 = str1.slice(6, 14);
  const birth2 = str2.slice(6, 14);
  if (birth1 === birth2) {
    return str1 < str2 ? -1 : 1;
  } else {
    return birth2 < birth1 ? -1 : 1;
  }
};

// 快速排序未优化版
const quick_sort_old = (arr, i, j) => {
  if (i >= j) return;

  let left = i;
  let right = j;
  let base = arr[i]; // 取区间第一个元素为基准

  while (left < right) {
    while (right > left && compare(arr[right], base) > 0) right--;
    if (right > left) arr[left++] = arr[right];

    while (left < right && compare(arr[left], base) < 0) left++;
    if (left < right) arr[right--] = arr[left];
  }

  // 此时 left 与 right 相遇，将基准值放到相遇到点
  arr[left] = base;

  // 递归处理基准值两边的序列
  quick_sort_old(arr, i, left - 1);
  quick_sort_old(arr, right + 1, j);
};

// 快速排序左递归版
const quick_sort = (arr, i, j) => {
  while (i < j) {
    let left = i;
    let right = j;
    let base = arr[i]; // 取区间第一个元素为基准

    while (left < right) {
      while (left < right && compare(arr[right], base) > 0) right--;
      if (left < right) arr[left++] = arr[right];

      while (left < right && compare(arr[left], base) < 0) left++;
      if (left < right) arr[right--] = arr[left];
    }

    // 此时 left 与 right 相遇，将基准值放到相遇到点
    arr[left] = base;

    // 递归处理基准值两边的序列
    // quick_sort(arr, i, left - 1);
    quick_sort(arr, right + 1, j);

    j = right - 1;
  }
};

// 基于 无监督优化的插入排序 优化的快速排序
const super_quick_sort = (arr) => {
  // 定义阈值
  const threshold = 16;

  const getMid = (a, b, c) => {
    if (compare(a, b) > 0) [a, b] = [b, a];
    if (compare(a, c) > 0) [a, c] = [c, a];
    if (compare(b, c) > 0) [b, c] = [c, b];
    return b;
  };

  // 左递归的快速排序
  const _qucik_sort = (arr, left, right) => {
    while (right - left >= threshold) {
      let p1 = left;
      let p2 = right;
      const base = getMid(arr[p1], arr[p2], arr[(p2 + p1) >> 1]);

      while (p1 < p2) {
        while (compare(arr[p1], base) <= 0) p1++;
        while (compare(arr[p2], base) >= 0) p2--;

        if (p1 < p2) {
          // swap(arr[p1], arr[p2]);
          [arr[p1], arr[p2]] = [arr[p2], arr[p1]];
          p1++;
          p2--;
        }

        _qucik_sort(arr, p1, right);
        right = p2;
      }
    }
  };

  // 无监督的插入排序
  const insert_sort = (arr, left, right) => {
    // 找到到最小值，将其放在待排序区间的第一位
    let minIndex = left;
    for (let i = left + 1; i <= right; i++) {
      if (compare(arr[i], arr[minIndex]) < 0) minIndex = i;
    }

    // if (minIndex > left) swap(arr[minIndex], arr[left]);
    if (minIndex > left) [arr[minIndex], arr[left]] = [arr[left], arr[minIndex]];

    // 常规的插入排序操作
    for (let i = left + 2; i <= right; i++) {
      let j = i;
      while (compare(arr[j], arr[j - 1]) < 0) {
        // swap(arr[j], arr[j - 1]);
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
        j--;
      }
    }
  };

  _qucik_sort(arr, 0, arr.length - 1);
  insert_sort(arr, 0, arr.length - 1);
};

// 归并排序
const merge_sort = (arr, i, j) => {
  if (i >= j) return;

  const mid = (i + j) >> 1;

  merge_sort(arr, i, mid);
  merge_sort(arr, mid + 1, j);

  let temp = [];
  let p1 = i;
  let p2 = mid + 1;

  while (p1 <= mid || p2 <= j) {
    if (p2 > j || (p1 <= mid && compare(arr[p1], arr[p2]) < 0)) {
      temp.push(arr[p1++]);
    } else {
      temp.push(arr[p2++]);
    }
  }
  for (let index = i; index <= j; index++) {
    arr[index] = temp[index - i];
  }
};
