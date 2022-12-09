// 节点
class Node {
  constructor(key, left = null, right = null) {
    this.key = key;
    this.left = left;
    this.right = right;
  }
}

const getNewNode = (key) => new Node(key);

// 销毁整棵树
const clear = (root) => {
  if (!root) return;
  clear(root.left);
  clear(root.right);
  root = null;
};

// 插入节点
// 此方法返回插入节点之后的，这棵树的根节点
const insert = (root, key) => {
  if (!root) return getNewNode(key);

  // 当前 key 已存在于树中，则不插入
  if (root.key === key) return root;

  // 左子树插入节点后的子树根节点赋值给 root.lefts
  if (key < root.key) root.left = insert(root.left, key); // 🐮
  else root.right = insert(root.right, key);

  return root; // 返回插完节点后的树的根节点
};

// 获取前驱，也就是当前节点的左子树中最右边的叶子节点
const getPredeccessor = (root) => {
  let p = root.left;
  while (p.right) p = p.right;
  return p;
};

// 删除节点
// 此方法返回删除节点之后的，这棵树的根节点
const erase = (root, key) => {
  if (!root) return root;

  if (key < root.key) root.left = erase(root.left, key);
  else if (key > root.key) root.right = erase(root.right, key);
  else {
    // 此时当前节点值与 key 值相等，需要被删除
    if (!root.left && !root.right) {
      // 若度为 0 则可直接删除
      return (root = null);
    } else if (!root.left || !root.right) {
      // 若度为 1 则需要将其子节点过继给其父节点
      const tempNode = !root.left ? root.right : root.left;
      return tempNode;
    } else {
      // 此时度为 2 则找到前驱或者后继惊喜替换，然后删除前驱或者后继即可
      const predeccessor = getPredeccessor(root);
      root.key = predeccessor.key;
      root.left = erase(root.left, predeccessor.key);
    }
  }
  return root;
};

// 打印二叉排序树的中序遍历结果，正常情况下一定是升序排列的
const output = (root, list = []) => {
  if (!root) return;

  output(root.left, list);
  list.push(root.key);
  output(root.right, list);

  return list.join(' ');
};

let tree = null;
tree = insert(tree, 3);
console.log(output(tree)); // 3
tree = insert(tree, 1);
console.log(output(tree)); // 1 3
tree = insert(tree, 1);
console.log(output(tree)); // 1 3
tree = insert(tree, 4);
console.log(output(tree)); // 1 3 4
tree = insert(tree, 5);
console.log(output(tree)); // 1 3 4 5
tree = insert(tree, 6);
console.log(output(tree)); // 1 3 4 5 6
erase(tree, 3);
console.log(output(tree)); // 1 4 5 6
erase(tree, 4);
console.log(output(tree)); // 1 5 6
