/*
 * @lc app=leetcode.cn id=705 lang=javascript
 *
 * [705] 设计哈希集合
 *
 * 思路：
 *    以链式存储法解决哈希冲突，链表结构易于增删元素
 */

// @lc code=start

// 链表节点
class Node {
  constructor(key = 0, next = null) {
    this.key = key;
    this.next = next;
  }

  // 在当前节点后插入一个元素
  insert_after(node) {
    node.next = this.next;
    this.next = node;
  }

  // 删除当前节点的后一个元素
  remove_after() {
    if (!this.next) return;
    this.next = this.next.next;
  }
}

var MyHashSet = function () {
  this.data = []; // 数据的存储区
};

// 哈希函数，将 key 映射成一个整数
const hash_func = (key) => {
  // return key & 0x7fffffff;
  return key;
};

/**
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.add = function (key) {
  if (this.contains(key)) return;
  const ind = hash_func(key) % this.data.length;
  if (!this.data[ind]) {
    this.data[ind] = new Node();
  }
  this.data[ind].insert_after(new Node(key));
};

/**
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.remove = function (key) {
  const ind = hash_func(key) % this.data.length;
  let p = this.data[ind];
  if (!p) return;
  while (p.next && p.next.key != key) p = p.next;
  p.remove_after();
};

/**
 * @param {number} key
 * @return {boolean}
 */
MyHashSet.prototype.contains = function (key) {
  let ind = hash_func(key) % this.data.length;
  let p = this.data[ind];
  if (!p) return false;
  p = p.next;
  while (p && p.key != key) p = p.next;
  return !!p;
};

/**
 * Your MyHashSet object will be instantiated and called as such:
 * var obj = new MyHashSet()
 * obj.add(key)
 * obj.remove(key)
 * var param_3 = obj.contains(key)
 */
// @lc code=end
