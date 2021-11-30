/*
 * @lc app=leetcode.cn id=636 lang=javascript
 *
 * [636] 函数的独占时间
 */

// @lc code=start
/**
 * @param {number} n
 * @param {string[]} logs
 * @return {number[]}
 *
 * 思路：
 *    这个思路很牛
 *    依然使用栈的思维来解题，函数的调用本质上就是具有完全包含关系的栈结构
 *
 *    遇到 start 的 log 就将该 log 入栈
 *    遇到 end 的 log 时，就将栈顶 log 出栈
 *    正常的程序执行，这两条 log 一定是同一个函数产生的
 *    因此求出两条 log 时间戳的差值，并且累加到该函数的执行时间
 *    同时，当前栈顶 log 的函数，是包含着当前函数的，所以，栈顶 log 的函数的执行时间应该减去上面求得的时间差
 *
 *    函数的嵌套执行，这个括号序列本质是一样的
 *    ( ( ( ) ) )
 *
 */
var exclusiveTime = function (n, logs) {
  let stack = [];
  let res = new Array(n).fill(0);

  for (const log of logs) {
    const [id, type, timeStamp] = log.split(":");

    if (type === "start") {
      //
      // 遇到 start 就入栈
      stack.push({ id, timeStamp });
    } else {
      //
      // 遇到 end 就出栈
      // 出栈的 log 与当前 log 一定是同一个函数的执行日志
      // 因此求出的这段时间应该累加起来
      const durtion = timeStamp - stack.pop().timeStamp + 1;
      res[id] += durtion;

      //
      // 如果存在 top，其实就是 当前函数 的 父函数
      // 父函数的执行时间应该减去 当前函数 的这一段执行时间
      const top = stack[stack.length - 1];
      if (top) {
        res[top.id] -= durtion;
      }
    }
  }

  return res;
};
// @lc code=end
