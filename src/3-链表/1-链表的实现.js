// 创建链表的 4 种方式
// 方式 1
const createListNode1 = () => {
  function ListNode(value) {
    this.value = value;
    this.next = null;
  }

  const head = new ListNode(1); // 创建头节点

  head.next = new ListNode(2);
  head.next.next = new ListNode(3);
  head.next.next.next = new ListNode(4);

  let current = head;
  let listNodeValue = [];
  while (current !== null) {
    listNodeValue.push(current.value);
    current = current.next;
  }
  console.log(listNodeValue.join("->"));
};
createListNode1();

/**
 *
 */

const createListNode2 = () => {
  let next = []; // 指针域
  let data = []; // 数据域

  // 在 index 的位置，添加一个节点 node，其值为 value
  const addNode = (index, node, value) => {
    // 将插入的节点的指针指向 当前插入位置的 下一个节点
    next[node] = next[index]; // 这行代码是防止不按顺序插入节点
    next[index] = node;
    data[node] = value;
  };

  const head = 3; // 定义头节点 3，其值为 0
  data[3] = 0;

  addNode(3, 5, 1); // 在节点 3 的后面添加节点 5，其值为 1
  addNode(5, 2, 2);
  addNode(2, 7, 3);
  addNode(7, 9, 4); // 现在的链表为 0->1->2->3->4

  addNode(5, 6, 5); // 不按顺序插入节点，0->1->5->2->3->4

  let node = head;
  let listNodeValue = [];
  while (node) {
    listNodeValue.push(data[node]);
    node = next[node];
  }
  console.log(listNodeValue.join("->"));
};
createListNode2();
