/**
 * 对于 32 位整型数字来讲，可以分为：高 16 位和低 16 位
 * 取一个数的低 16 位可以使用两种方法：num % 65536 或者 num & 0xffff
 * 取一个数的高 16 位可以使用两种方法：num / 65536 或者 num & 0xffff0000 >> 16
 *
 * 先基于 低16位 进行一轮排序
 * 然后基于 高16位 进行一轮排序
 * 即可得到最后的排序结果
 *
 */

/**
 *
 * @param {*} list 带排序数组
 */
const radix_sort = (list) => {
  let count = [];
  let temp = [];

  // 求每个元素 低16位 的数字出现的个数
  for (const i of list) {
    const low_16 = i % 65536;
    count[low_16] ||= 0;
    count[low_16]++;
  }

  // 求 count 数组的前缀和
  for (let i = 1; i < count.length; i++) {
    count[i] = count[i] ||= 0; // 数组元素为空时，默认为 0
    count[i - 1] = count[i - 1] ||= 0;

    count[i] += count[i - 1];
  }

  // 根据基数排序的思想，根据 低16 数字，排序并放置元素
  // 从右至左扫描待排序数组 list
  for (let i = list.length - 1; i >= 0; --i) {
    const low_16 = list[i] % 65536;
    temp[--count[low_16]] = list[i];
  }

  // 下面用同样的思路，以 高16位 数字为基数进行排序
  count = [];
  for (const x of temp) {
    const high_16 = Math.floor(x / 65536);
    count[high_16] ||= 0;

    count[high_16]++;
  }
  for (let i = 1; i < count.length; i++) {
    count[i] ||= 0;
    count[i - 1] ||= 0;

    count[i] += count[i - 1];
  }
  for (let i = list.length - 1; i >= 0; --i) {
    const high_16 = Math.floor(temp[i] / 65536);
    list[--count[high_16]] = temp[i];
  }

  return list;
};

console.log(radix_sort([9, 65537, 2, 6, 3, 5, 2])); // [2, 2, 3, 5, 6, 9, 65537]
