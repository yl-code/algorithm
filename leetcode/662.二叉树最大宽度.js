/*
 * @lc app=leetcode.cn id=662 lang=javascript
 *
 * [662] 二叉树最大宽度
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
 * @return {number}
 *
 * 思路：
 *
 * 层序遍历整颗树，给每个节点编号，每一层的宽度 = 右侧的节点编号 - 最左侧的节点编号
 *
 * 如何层序遍历？   利用队列可以做到
 * 初始放入根结点，然后只要队列不为空，都开启循环
 * 每轮循环遍历队列中的节点，从队首出队节点之前，将其子节点从队尾入队
 * 上述操作可保证每轮循环开始时，只有同一层的节点在队列中
 * 在入队每个节点的子节点之前，可完成当前层的宽度计算
 *
 */
var widthOfBinaryTree = function (root) {
  if (!root) return 0;

  // 先创建一个队列，初始化时，放入 根节点与其编号 0
  let queue = [[root, 0]];

  let maxWidth = 1;

  // 只要队列中还存在节点，表示下一层还有节点
  while (queue.length) {
    // 当前层的最小编号在队首，最小编号在队尾
    let lIndex = queue[0][1];
    let rIndex = queue[queue.length - 1][1];

    // 计算当前层的最大宽度
    maxWidth = Math.max(maxWidth, rIndex - lIndex + 1);

    // 记录当前层的节点数量
    const lastLevelCount = queue.length;

    for (let i = 0; i < lastLevelCount; i++) {
      // 遍历每个节点，将当前节点的左右子节点，从队列尾部入队
      // 仿照完全二叉树的性质，给每个节点进行编号
      // 由于每一层编号都会成倍增加，所以每次 index - lIndex 可以缩小编号的数量级，
      const [node, index] = queue[i];
      if (node.left) {
        queue.push([node.left, (index - lIndex) * 2]);
      }
      if (node.right) {
        queue.push([node.right, (index - lIndex) * 2 + 1]);
      }
    }

    // 此时当前层的节点还在队中，下一层的子节点也都入队完成
    // 直接从队首将上一层的节点出队
    queue.splice(0, lastLevelCount);
  }

  return maxWidth;
};
// @lc code=end
