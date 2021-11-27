/*
 * @lc app=leetcode.cn id=946 lang=javascript
 *
 * [946] 验证栈序列
 */

// @lc code=start
/**
 * @param {number[]} pushed
 * @param {number[]} popped
 * @return {boolean}
 */
//
// 思路：
//
// 初始化一个辅助栈
// 扫描 pushed 序列，当前 pushed 元素满足两个条件时，即可被压入 stack 辅助栈
// 1、辅助栈为空
// 2、辅助栈的栈顶元素 与 当前popped 元素不相等

// 辅助栈的栈顶元素 与 当前popped 元素相等相等时，需要将辅助栈的栈顶元素出栈，且 popped 指针往后移动一位

// 若 pushed 与 popped 两个序列是正常的，则最后辅助栈一定是空的
var validateStackSequences = function (pushed, popped) {
  let stack = [];

  for (let push_i = 0, pop_i = 0; pop_i < popped.length; ) {
    while (push_i < pushed.length && (!stack.length || stack[stack.length - 1] !== popped[pop_i])) {
      stack.push(pushed[push_i]);
      push_i++;
    }

    if (stack[stack.length - 1] !== popped[pop_i]) return false;
    stack.pop();
    pop_i++;
  }

  return true;
};
// @lc code=end
