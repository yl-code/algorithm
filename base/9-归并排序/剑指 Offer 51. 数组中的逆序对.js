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
  const temp = [];

  // 定义递归函数的返回值为 输入数组的逆序对数量
  // 思考一下可得
  // 当前输入的序列的逆序对数量 === 左部分序列逆序对数量 + 右部分序列逆序对数量 + 横跨整个序列的逆序对数量;
  const reduce = (arr, l, r) => {
    //
    // 当区间 [l,r] 不存在时，返回 0
    if (l >= r) return 0;

    // 计算 l 与 r 的中间索引值
    const mid = (l + r) >> 1;

    //统计 左部分序列逆序对数量 + 右部分序列逆序对数量
    let count = 0;
    count += reduce(arr, l, mid);
    count += reduce(arr, mid + 1, r);

    let p1 = l;
    let p2 = mid + 1;
    let k = l;
    while (p1 <= mid || p2 <= r) {
      // 程序细节，根据题目要求，逆序对是不包含相等的数字，因此 arr[p1] <= arr[p2]
      if (p2 > r || (p1 <= mid && arr[p1] <= arr[p2])) {
        temp[k++] = arr[p1++];
      } else {
        temp[k++] = arr[p2++];

        // 统计 横跨整个序列的逆序对数量
        //
        // 为啥在这里统计 ？
        // 逆序对，指的是前面一个数字大于后面的数字
        // 横跨整个序列的逆序对，指的是左部分序列中的数字 大于 右部分序列中的数字
        // 所以当有，右部分序列中的数字被归并时，左部分序列中剩余的数字都是大于该数的
        count += mid - p1 + 1;
      }
    }

    // 上面能够统计 横跨整个序列的逆序对数量的基础是，这一步将排过序的数字放回原数组中
    for (let i = l; i <= r; i++) {
      arr[i] = temp[i];
    }

    return count;
  };

  return reduce(nums, 0, nums.length - 1);
};
