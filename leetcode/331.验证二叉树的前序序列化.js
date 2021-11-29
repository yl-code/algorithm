/*
 * @lc app=leetcode.cn id=331 lang=javascript
 *
 * [331] 验证二叉树的前序序列化
 */

// @lc code=start
/**
 * @param {string} preorder
 * @return {boolean}
 *
 * 前序遍历： 根 左 右
 *
 * 思路：
 *    题目表示 # 代表空节点，那么类似于 [4, #, #] 可以被认为是一个节点 #
 *    所以遍历一边序列，将所有符合条件的，三个值合并为一个 #
 *    合并到最后，序列就会只剩下一个 #，则原序列是正确的二叉树前序遍历
 *
 */
var isValidSerialization = function (preorder) {
  let preorderList = preorder.split(",");
  let stack = [];

  for (let index = 0; index < preorderList.length; index++) {
    stack.push(preorderList[index]);

    while (stack.length >= 3 && stack[stack.length - 1] === "#" && stack[stack.length - 2] === "#") {
      stack.pop();
      stack.pop();
      stack[stack.length - 1] = "#";
    }

    // 处理非法情况: [#, #], 这种情况表示根节点都是 # 了, 就离谱
    if (stack.length === 2 && stack[0] === "#" && stack[1] === "#") return false;
  }

  return stack.length === 1 && stack[0] === "#";
};
// @lc code=end
