/*
 * @lc app=leetcode.cn id=993 lang=javascript
 *
 * [993] 二叉树的堂兄弟节点
 *
 * 思路：
 *    遍历树中的每个节点，记录下来两个目标节点的父节点和它的深度，最后比较一下就行
 *
 *    下面采用深搜和广搜两种做法
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
 *
 * bfs
 *
 */
const isCousins = (root, x, y) => {
  let depth = {};
  let father = {};
  bfs(root, x, y, depth, father);
  return depth[x] === depth[y] && father[x] !== father[y];
};

const bfs = (root, x, y, depth, father) => {
  const queue = [
    {
      node: root,
      depth: 0,
      father: null,
    },
  ];

  while (queue.length) {
    const item = queue.pop();

    if (item.node.val === x) {
      depth[x] = item.depth;
      father[x] = item.father;
    }

    if (item.node.val === y) {
      depth[y] = item.depth;
      father[y] = item.father;
    }

    if (Object.keys(depth).length === 2) break; // 找到了就不找了

    // 下面两个 if 是根据当前节点状态衍生出下一层的节点状态
    if (item.node.left) {
      queue.unshift({
        node: item.node.left,
        depth: item.depth + 1,
        father: item.node.val,
      });
    }

    if (item.node.right) {
      queue.unshift({
        node: item.node.right,
        depth: item.depth + 1,
        father: item.node.val,
      });
    }
  }
};

/**
 *
 * dfs
 *
 */
var isCousins_bfs = function (root, x, y) {
  let x_level;
  let y_level;
  let father = {};

  x_level = dfs(root, x, father);
  y_level = dfs(root, y, father);

  return x_level === y_level && father[x] !== father[y];
};

/**
 * 深度优先遍历
 *
 * @param {*} root 二叉树的根节点
 * @param {*} k 目标节点
 * @param {*} father 存放目标节点的父节点
 * @returns 在当前树中找到目标节点，则返回其深度，找不到则返回 -1
 */
const dfs = (root, k, father) => {
  if (!root) return -1;
  if (root.val === k) return 0; // 从当前目标节点开始，往上回溯的过程，累加得到目标节点的 深度

  father[k] = root.val; // 继续向下递归时，当前节点有可能是目标节点的父节点
  let l = dfs(root.left, k, father); // 如果左子树中找到了目标节点，那么 dfs 返回的就是左子节点，到目标节点的是深度
  if (l !== -1) return l + 1; // 返回当前节点到目标节点的深度

  father[k] = root.val; // 向下递归的过程中，father 一直被改变，这里重置为当前节点
  let r = dfs(root.right, k, father);
  if (r !== -1) return r + 1;

  return -1; // 这棵树找不到目标节点
};
// @lc code=end
