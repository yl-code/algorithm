/*
 * @lc app=leetcode.cn id=207 lang=javascript
 *
 * [207] 课程表
 *
 * 思路：
 *    这个是典型的有向图题目
 *    求是否可以完成所有课程的学习，也就是按照某种拓扑序学习完所有课程
 *    所以这题就是求得，该有向图是否存在一种拓扑序能够顺序遍历所有元素
 *    求出拓扑序的过程中，会借助到队列，队列出队的元素的数量，若等于课程总数量，则返回 true
 */

// @lc code=start
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
  let inDeg = []; // 记录每个元素的 入度
  let g = []; // 按索引存放该元素所指向的元素列表
  let queue = []; // 队列

  // 遍历 prerequisites，拿到每两个课的指向关系
  for (const [x, y] of prerequisites) {
    // y -> x

    // 统计各个课的入度
    inDeg[x] ||= 0;
    inDeg[x]++;

    // 统计各个课的指向课的集合
    g[y] ||= [];
    g[y].push(x);
  }

  for (let i = 0; i < numCourses; i++) {
    // 当元素的入度为0时，可以将该元素添加到队列中
    if (!inDeg[i]) {
      queue.unshift(i);
    }
  }

  let cnt = 0;
  while (queue.length) {
    // 依次出队队首元素，并统计出队元素的数量
    const x = queue.pop();
    cnt++;

    // 元素出队之后，表示它所指向的元素的入度可以减一
    g[x] ||= [];
    for (const i of g[x]) {
      inDeg[i]--;

      // 当元素的入度为0时，可以将该元素添加到队列中
      if (!inDeg[i]) {
        queue.unshift(i);
      }
    }
  }

  // 若出队元素数量与课程数量相同时，表示求得的课程有向图的拓扑序可以访问到所有课程
  return cnt === numCourses;
};
// @lc code=end
