/**
 * 剑指 Offer 51. 数组中的逆序对
 *
 * 在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。
 * 输入一个数组，求出这个数组中的逆序对的总数。
 *
 */

/**
 * @param {number[]} nums
 * @return {number}
 *
 * 思路很简单
 * 采用归并排序的思想，去排序数组
 * 排序的过程，本质也是递归的过程，在回溯的时候，统计一波逆序对的数量即可
 *
 *
 */

var reversePairs = function (nums) {
  const getCount = (arr, l, r) => {
    // 当数组为空或者只有一个数据的时候，逆序对为 0
    if (l >= r) return 0;

    let count = 0;
    const mid = (l + r) >> 1;

    // 拿到左右两边的逆序对数量
    count += getCount(arr, l, mid);
    count += getCount(arr, mid + 1, r);

    // 下面进行归并操作，同时搜集横跨整个数组的逆序对数量
    let p1 = l;
    let p2 = mid + 1;
    const temp = [];
    while (p1 <= mid || p2 <= r) {
      // 题目要求逆序对定义，排除数字相等的情况
      if (p2 > r || (p1 <= mid && arr[p1] <= arr[p2])) {
        temp.push(arr[p1++]);
      } else {
        temp.push(arr[p2++]);
        // 统计 横跨整个序列的逆序对数量
        //
        // 为啥在这里统计 ？
        // 逆序对，指的是前面一个数字大于后面的数字
        // 横跨整个序列的逆序对，指的是左部分序列中的数字 大于 右部分序列中的数字
        // 所以当有，右部分序列中的数字被归并时，左部分序列中剩余的数字都是大于该数的

        count += mid - p1 + 1;
      }
    }

    // 上面能够统计横跨整个数组的逆序对数量的基础是，这一步将排过序的数字放回原数组中
    for (let i = l; i <= r; i++) {
      arr[i] = temp[i - l];
    }

    return count;
  };

  return getCount(nums, 0, nums.length - 1);
};
