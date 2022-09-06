/*
 * @lc app=leetcode.cn id=752 lang=javascript
 *
 * [752] 打开转盘锁
 *
 * 思路：
 *    求最小旋转次数，广搜做法
 */

// @lc code=start
/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
var openLock = function (deadends, target) {
  let set = new Set(deadends);
  if (set.has('0000')) return -1;
  set.add('0000');
  let q = [['0000', 0]]; // 初始状态：[初始字符串，初始旋转次数]

  while (q.length) {
    const [str, l] = q.pop();

    if (str === target) return l; // 如果当前状态符合要求，直接返回次数

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 2; j++) {
        const next = getNextStr(str, i, j);

        if (set.has(next)) continue;

        set.add(next);
        q.unshift([next, l + 1]); // 将下一个状态入队
      }
    }
  }

  return -1;
};

/**
 *
 * @param {*} str 当前字符串
 * @param {*} i 变动字母的位置
 * @param {*} j 0是正转+1，1是反转-1
 */
const getNextStr = (str, i, j) => {
  const list = str.split('');
  switch (j) {
    case 0:
      list[i] = +list[i] + 1;
      break;
    case 1:
      list[i] -= 1;
      break;
  }

  if (list[i] > 9) list[i] = 0;
  if (list[i] < 0) list[i] = 9;

  return list.join('');
};
// @lc code=end
