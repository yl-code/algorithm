/*
 * @lc app=leetcode.cn id=210 lang=javascript
 *
 * [210] 课程表 II
 *
 * 思路：
 *    这题与 207 题是一样的，需要输出拓扑序
 */

// @lc code=start
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
  const queue = []; // 借助队列输出拓扑序
  const g = []; // 以元素值为索引，元素的指向元素的集合为值，存放指向关系
  const inDeg = []; // 以元素值为索引，元素的入度为值，存放所有元素的入度

  for (const [x, y] of prerequisites) {
    // y->x

    // 统计每个元素的入度
    inDeg[x] ||= 0;
    inDeg[x]++;

    // 记录每个元素所指向元素的集合
    g[y] ||= [];
    g[y].push(x);
  }

  // 将目前入度为 0 的元素添加到队列中
  for (let i = 0; i < numCourses; i++) {
    if (!inDeg[i]) queue.unshift(i);
  }

  let res = [];
  while (queue.length) {
    // 依次弹出队列中的元素，并添加到结果列表
    const front = queue.pop();
    res.push(front);

    if (!Array.isArray(g[front])) continue;
    // g[front] ||= [];

    // 将弹出元素 所指向的元素集合 中的每个元素的入度减一
    for (const x of g[front]) {
      inDeg[x]--;

      // 将入度为 0 的元素添加到队列中
      if (!inDeg[x]) queue.unshift(x);
    }
  }

  return res.length === numCourses ? res : [];
};
// @lc code=end
