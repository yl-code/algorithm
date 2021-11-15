/*
 * @lc app=leetcode.cn id=202 lang=javascript
 *
 * [202] 快乐数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */
// 思维转换 19 -> 82 -> 68 -> 100 -> 1
// 这道题就是链表判环
// 把 1 当作 null
// 只有当链表没有环的时候，快慢指针才不会相遇，才是快乐数
var isHappy = function (n) {
  const getNext = (n) => {
    let res = 0;

    while (n) {
      res += Math.pow(n % 10, 2);
      n = Math.floor((n /= 10));
    }

    return res;
  };

  // 定义快慢指针
  let fast = n;
  let slow = n;

  do {
    fast = getNext(getNext(fast));
    slow = getNext(slow);
  } while (fast !== slow && fast !== 1);

  return fast === 1;
};
// @lc code=end
