/**
 *
 * @param {*} list 待查找数组
 * @param {*} num 待查找元素
 */
const binary_search = (list, num) => {
  let head = 0;
  let tail = list.length - 1;
  let mid;

  while (head <= tail) {
    // mid = (tail + head) >> 1;
    mid = head + ((tail - head) >> 1);

    if (num === list[mid]) return mid;
    if (num > list[mid]) {
      head = mid + 1;
    } else {
      tail = mid - 1;
    }
  }

  return -1;
};

console.log(binary_search([1, 2, 3, 4, 5, 6], 6)); // 5
