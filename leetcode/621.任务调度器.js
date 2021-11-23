/*
 * @lc app=leetcode.cn id=621 lang=javascript
 *
 * [621] 任务调度器
 */

// @lc code=start
/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */

/**
 * 思路：
 *
 * 假设 冷却时间 n 为 2
 *
 * 1 首先，安排任务数量最多的，假设为 A，那么冷却时间也能安排出来
 * A [ ] [ ]
 * A [ ] [ ]
 * A [ ] [ ]
 * A
 *
 *
 * 2 其次，安排任务数量第二多的，假设为 B，且 B的数量 <= A的数量
 * 这时就可以将 B 放入冷却时间的格子中，
 * A [B] [ ]
 * A [B] [ ]
 * A [B] [ ]
 * A  B
 *
 *
 * 3 然后再重复步骤 2，按数量从大到小依次安排剩余任务
 * A [B] [C]
 * A [B] [C]
 * A [B] [ ]
 * A  B
 *
 *
 * 4 由此可以发现，有两种情况
 *
 * 设：
 *    每种任务最多出现 maxExec 次
 *    出现 maxExec 次的任务有 maxCount 种
 *
 * 情况一：所有冷却时间都 没有 被填满，如步骤三，此时的最短执行时间为
 *        minTime1 = (maxExec - 1)*(n + 1) + maxCount
 *
 *        此时任务总数量 minTime2 = task.length
 *
 *        minTime2 <= minTime1
 *
 *
 * 情况二：所有冷却时间都被填满，甚至剩余任务的数量超出了冷却时间格子 [ ]
 * A [B] [C]
 * A [B] [C]
 * A [B] [C]
 * A  B
 *
 * A [B] [C] E
 * A [B] [C]
 * A [B] [D]
 * A  B   D
 *
 *        此时最短的执行时间，很明显是任务总数量：minTime2 = task.length
 *        但是此时按照情况一的公式，得出的总时间为：minTime1 = (maxExec - 1)*(n + 1) + maxCount
 *        minTime1 <= minTime2
 *
 *
 * 综上所述：我们只需要根据输入的 tasks 求得 minTime1 与 minTime2，CPU 的最短执行时间为这两者中的最大值
 *
 */

var leastInterval = function (tasks, n) {
  let taskCount = {};

  tasks.forEach((task) => {
    if (taskCount[task]) {
      taskCount[task]++;
    } else {
      taskCount[task] = [1];
    }
  });

  let maxExec = Math.max(...Object.values(taskCount));
  let maxCount = 0;
  Object.values(taskCount).forEach((count) => {
    if (count === maxExec) {
      maxCount++;
    }
  });

  minTime1 = (maxExec - 1) * (n + 1) + maxCount;
  minTime2 = tasks.length;

  console.log(taskCount, Object.values(taskCount));
  return Math.max(minTime1, minTime2);
};
// @lc code=end
