/*
 * @lc app=leetcode.cn id=706 lang=javascript
 *
 * [706] 设计哈希映射
 *
 */

// @lc code=start

class Node {
  constructor(key = -1, value = -1, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }

  insert_after(node) {
    node.next = this.next;
    this.next = node;
  }

  remove_after() {
    if (!this.next) return;
    this.next = this.next.next;
  }
}

const hash_func = (key) => key;

var MyHashMap = function () {
  this.data = [];
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
MyHashMap.prototype.put = function (key, value) {
  const ind = hash_func(key) % this.data.length;
  if (!this.data[ind]) this.data[ind] = new Node();

  let p = this.data[ind];
  while (p.next && p.next.key !== key) p = p.next;

  if (p.next) {
    p.next.value = value;
  } else {
    p.next = new Node(key, value);
  }
};

/**
 * @param {number} key
 * @return {number}
 */
MyHashMap.prototype.get = function (key) {
  const ind = hash_func(key) % this.data.length;
  if (!this.data[ind]) return -1;
  p = this.data[ind].next;

  while (p && p.key !== key) p = p.next;
  return p ? p.value : -1;
};

/**
 * @param {number} key
 * @return {void}
 */
MyHashMap.prototype.remove = function (key) {
  const ind = hash_func(key) % this.data.length;
  if (!this.data[ind]) return;

  let p = this.data[ind];

  while (p.next && p.next.key !== key) p = p.next;

  if (p.next) {
    p.remove_after();
  }
};

/**
 * Your MyHashMap object will be instantiated and called as such:
 * var obj = new MyHashMap()
 * obj.put(key,value)
 * var param_2 = obj.get(key)
 * obj.remove(key)
 */
// @lc code=end
