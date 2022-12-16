class Node {
  constructor(key = 0, h = 0, left = emptyNode, right = emptyNode) {
    this.key = key;
    this.left = left;
    this.right = right;
    this.h = h;
  }
}

// 虚拟空节点，暂时用 null 代替
const emptyNode = null;

// 生成新节点
const getNewNode = (key) => new Node(key, 1);

// 更新节点高度
const update_height = (root) => {
  root.h = Math.max(root.left?.h ?? 0, root.right?.h ?? 0) + 1;
};

// 获取节点前驱
const getPredeccessor = (root) => {
  let p = root.left;
  while (p.right !== emptyNode) p = p.right;
  return p;
};

// 左旋操作
const left_rotate = (root) => {
  const new_root = root.right;
  root.right = new_root?.left;
  new_root.left = root;

  update_height(root);
  update_height(new_root);
  return new_root;
};

// 右旋操作
const right_rotate = (root) => {
  const new_root = root.left;
  root.left = new_root?.right;
  new_root.right = root;

  update_height(root);
  update_height(new_root);
  return new_root;
};

// 根据左右子树高度差来调整树的平衡
const maintain = (root) => {
  // 高度差小于 2 无需调整
  if (Math.abs((root.left?.h ?? 0) - (root.right?.h ?? 0)) < 2) return root;

  if ((root.left?.h ?? 0) > (root.right?.h ?? 0)) {
    // 左子树更高 L
    if ((root.left?.right?.h ?? 0) > (root.left?.left?.h ?? 0)) {
      // 左子树的右子树更高 LR

      root.left = left_rotate(root.left);
    }

    // 此时左子树的左子树更高 LL

    root = right_rotate(root);
  } else {
    // 右子树更高 R
    if ((root.right?.left?.h ?? 0) > (root.right?.right?.h ?? 0)) {
      // 右子树的左子树更高 RL
      root.right = right_rotate(root.right);
    }

    // 此时右子树的右子树更高 RR

    root = left_rotate(root);
  }

  return root;
};

// 插入操作
const insert = (root, key) => {
  if (!root) return getNewNode(key);
  if (root.key === key) return root;
  if (key < root.key) root.left = insert(root.left, key);
  else root.right = insert(root.right, key);

  update_height(root);
  return maintain(root);
};

// 删除操作
const erase = (root, key) => {
  if (root === emptyNode) return root;
  if (key < root.key) {
    root.left = erase(root.left, key);
  } else if (key > root.key) {
    root.right = erase(root.right, key);
  } else {
    // 删除当前节点
    if (root.left === emptyNode || root.right === emptyNode) {
      // 当前节点度为 1 或 0
      return root.left === emptyNode ? root.right : root.left;
    } else {
      // 当前节点度为 2
      const temp = getPredeccessor(root);
      root.key = temp.key;
      root.left = erase(root.left, temp.key);
    }
  }
  update_height(root);

  return maintain(root);
};

// 前序遍历输出树中节点信息
const output = (root) => {
  if (!root) return;

  // 节点key值[节点高度]:{左子树key值，右子树key值}
  console.log(
    `${root.key}[${root.h}]:{${root.left?.key ?? ' '},${
      root.right?.key ?? ' '
    }}`
  );

  output(root.left);
  output(root.right);
};

let tree = null;
[5, 9, 8, 3, 2, 4, 1, 7].forEach((key) => {
  tree = insert(tree, key);
  console.log(`insert ${key}--------------`);
  output(tree);
});

[8, 7].forEach((key) => {
  tree = erase(tree, key);
  console.log(`erase ${key}--------------`);
  output(tree);
});
