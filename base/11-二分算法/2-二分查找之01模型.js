/**
 *
 * @param {*} list 待查找数组
 * @param {*} num 待查找元素
 *
 * [1, 2, 3, 5, 5, 6] 4 查找第一个大于等于 4 的位置 => 0000011111：查找第一个 1 的位置
 *
 */
const binary_search_01 = (list, num) => {
  let head = 0;
  let tail = list.length - 1;
  let mid;

  while (head < tail) {
    // mid = (tail + head) >> 1;
    mid = head + ((tail - head) >> 1);

    if (num > list[mid]) {
      head = mid + 1;
    } else {
      tail = mid;
    }
  }

  return head;
};

console.log(binary_search_01([1, 2, 3, 5, 5, 6], 4)); // 3
