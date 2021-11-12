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
  // let listNodeValue = [];
  // while (current !== null) {
  //   listNodeValue.push(current.value);
  //   current = current.next;
  // }
  // console.log(listNodeValue.join("->")); //1->2->3->4
  return current;
};
const listNode = createListNode1();

const reverseList = (head) => {
  if (!head) return head;
  reverseList(head.next);
  console.log(head.value);
};
reverseList(listNode);
// 4
// 3
// 2
// 1
