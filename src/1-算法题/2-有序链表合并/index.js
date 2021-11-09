// 输入两个递增排序的链表，合并后新链表任然是递增排序的

function ListNode(val) {
  this.val = val;
  this.next = null;
}

const toListNode = (array) => {
  const fakeHead = new ListNode(0);
  let current = fakeHead;

  for (let index = 0; index < array.length; index++) {
    current.next = new ListNode(array[index]);
    current = current.next;
  }

  return fakeHead.next;
};

const toArray = (listNode) => {
  let array = [];
  while (listNode) {
    array.push(listNode.val);
    listNode = listNode.next;
  }
  return array;
};

const mergeListNode = (list1, list2) => {
  let fakeHead = new ListNode();
  let current = fakeHead;

  while (list1 && list2) {
    if (list1.val >= list2.val) {
      current.next = list2;
      list2 = list2.next;
    } else {
      current.next = list1;
      list1 = list1.next;
    }

    current = current.next;
  }

  if (!list1) {
    current.next = list2;
  } else {
    current.next = list1;
  }

  return fakeHead.next;
};

const array1 = [1, 2, 3, 4, 5];
const array2 = [4, 5, 6, 7];
const listNode1 = toListNode(array1);
const listNode2 = toListNode(array2);

const newListNode = mergeListNode(listNode1, listNode2);

console.log(toArray(newListNode));
