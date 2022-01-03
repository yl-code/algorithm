/*
 * @lc app=leetcode.cn id=315 lang=javascript
 *
 * [315] 计算右侧小于当前元素的个数
 *
 *
 * 思路很简单
 * 将原数组进行归并排序，使得数组逆序排列
 * 在进行归并操作时，若有左半段元素 a 即将被归并，那么此时右半段数组中，未归并的元素全都小于 a
 *
 * 归并排序会影响原数组中元素的位置
 * 最直接有效的记住元素索引位置的方法，就是将原数组转换为数组对象
 * 每个对象存上元素本身，元素的索引位置，元素右边比自己小的元素个数
 *
 * 然后把生成的对象数组，进行归并排序，最后根据数组中每个对象存的索引值，将其还原到对应的位置
 */

// @lc code=start
const mergeSort = (list, l, r) => {
  if (l >= r) return;

  let mid = (l + r) >> 1;

  mergeSort(list, l, mid);
  mergeSort(list, mid + 1, r);

  let p1 = l;
  let p2 = mid + 1;
  let temp = [];
  // 下面操作会产生逆序排列的数组
  // 在归并的过程中，控制比较关系，可以改变数组排列的顺序
  while (p1 <= mid || p2 <= r) {
    if (p2 > r || (p1 <= mid && list[p1].val > list[p2].val)) {
      list[p1].count += r - p2 + 1;
      temp.push(list[p1++]);
    } else {
      temp.push(list[p2++]);
    }
  }

  // 改变原数组的值
  for (let i = l; i <= r; i++) list[i] = temp[i - l];
};

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var countSmaller = function (nums) {
  // 根据 nums 初始化一个对象数组
  let list = nums.map((val, index) => ({
    val, // 元素本身
    index, // 元素在原数组中的索引位置
    count: 0, // 原数组中，其右侧小于自己的元素个数
  }));

  mergeSort(list, 0, list.length - 1);

  let res = [];
  list.forEach((dict) => {
    res[dict.index] = dict.count;
  });
  return res;
};
// @lc code=end
