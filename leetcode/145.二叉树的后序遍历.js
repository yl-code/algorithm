/*
 * @lc app=leetcode.cn id=145 lang=javascript
 *
 * [145] 二叉树的后序遍历
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 *
 *
 * 二叉树的 前中后序遍历，指的是 根结点 的相对位置
 *    前序遍历：根->左->右
 *    中序遍历：左->根->右
 *    后序遍历：左->右->根
 *
 */
// 迭代算法，就需要自己模拟系统栈
// 下面用数组模拟栈
var postorderTraversal = function (root) {
  if (!root) return [];

  let res = [];

  /**
   * data栈 用来存储 程序的关键性数据
   * 也就是递归过程中的局部变量
   *
   * 当前程序存储的是 节点
   */
  let data = [];

  /**
   * status栈 用来存储 程序的状态，就是根据栈顶元素的值来判断接下来程序该干嘛
   * 也是递归到的程序位置
   *
   * 当前程序为 二叉树的后序遍历，因此约定如下：
   *    0: 若 data 栈顶元素的左子树存在，则往 data 栈中压入其左子树
   *    1: 若 data 栈顶元素的右子树存在，则往 data 栈中压入其右子树
   *    2: 将 data 栈顶元素出栈
   */
  let status = []; // status 栈 用来存储 程序状态

  data.push(root); // 首先入栈 根结点
  status.push(0); // 表示 接下来需要入栈其左子树

  while (data.length) {
    // 每种状态完成自己的操作即可
    switch (status.pop()) {
      case 0:
        // 左子树 处理完就需要处理 右子树
        status.push(1);

        if (data[data.length - 1].left) {
          // 如果 左子树 存在，就将其入栈到 data 中
          data.push(data[data.length - 1].left);

          // 左子树 入栈意味着，又需要处理它的 左子树
          status.push(0);
        }
        break;
      case 1:
        // 右子树 处理完就需要处理 根元素
        status.push(2);

        if (data[data.length - 1].right) {
          // 如果 右子树 存在，就将其入栈到 data 中
          data.push(data[data.length - 1].right);

          // 右子树 入栈意味着，又需要处理它的 左子树
          status.push(0);
        }
        break;
      case 2:
        // 此时 出栈 的就是根元素
        if (data[data.length - 1].val) res.push(data.pop().val);
        break;

      default:
        break;
    }
  }

  return res;
};

// 递归算法 非常 easy，本质其实使用的是系统栈
var postorderTraversal_1 = function (root) {
  let res = [];

  const postOrder = (root) => {
    if (!root) return;
    root.left && postOrder(root.left);
    root.right && postOrder(root.right);
    res.push(root.val);
  };

  postOrder(root);

  return res;
};
// @lc code=end
