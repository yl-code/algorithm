/**
 * 创建链表
 */
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
  return current;
};
const listNode = createListNode1();

/**
 * 逆序打印 链表节点的 value
 */
const reverseList = (head) => {
  if (!head) return head;
  reverseList(head.next);
  console.log(head.value);
};
// reverseList(listNode);
// 4
// 3
// 2
// 1

/**
 * 递归翻转链表
 *
 * 翻转前 n 个节点
 */
const recursionReverseList = (head, n) => {
  if (!head || !head.next || n === 1) return head;

  // tail 就是 head 后面的链表翻转后的最后一个节点
  const tail = head.next;

  // newHead 就是递归开始回溯时的第一个节点，就是不满足递归条件的那个 head
  const newHead = recursionReverseList(tail, n - 1);

  // 回溯过程中的 当前节点就是 tail，前面一个节点就是 head
  // 所以把 head.next 指向 tail 的下一个节点
  // 其实如果是要反转整个链表，也可以直接 head.next = null，以防止最后让链表中存在环，但是这样就不能只翻转链表中的前几个节点，自己画画图就明白了
  head.next = tail.next;

  // 然后再让 tail.next 指向 head
  // 完成翻转
  tail.next = head;

  return newHead;
};

/**
 * 打印链表
 */
const printListNode = (listNode) => {
  let listNodeValue = [];

  // 翻转后的链表
  listNode = recursionReverseList(listNode, 3);

  while (listNode !== null) {
    listNodeValue.push(listNode.value);
    listNode = listNode.next;
  }
  console.log(listNodeValue.join("->")); // 3->2->1->4
};
printListNode(listNode);
