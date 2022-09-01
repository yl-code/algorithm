/**
 * 面试题 16.25. LRU 缓存
 * https://leetcode.cn/problems/lru-cache-lcci/
 *
 * 设计和构建一个“最近最少使用”缓存，该缓存会删除最近最少使用的项目。
 * 缓存应该从键映射到值(允许你插入和检索特定键对应的值)，并在初始化时指定最大容量。
 * 当缓存被填满时，它应该删除最近最少使用的项目。
 *
 * 它应该支持以下操作： 获取数据 get 和 写入数据 put 。
 * 获取数据 get(key) - 如果密钥 (key) 存在于缓存中，则获取密钥的值（总是正数），否则返回 -1。
 * 写入数据 put(key, value) - 如果密钥不存在，则写入其数据值。
 * 当缓存容量达到上限时，它应该在写入新数据之前删除最近最少使用的数据值，从而为新的数据值留出空间。
 *
 */

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
    this.prev = null;
  }

  remove_this() {
    if (this.next) this.next.prev = this.prev;
    if (this.prev) this.prev.next = this.next;
    this.next = null;
    this.prev = null;
    return this;
  }

  insert_prev(node) {
    node.next = this;
    node.prev = this.prev;
    if (this.prev) this.prev.next = node;
    this.prev = node;
  }
}

class HashList {
  constructor(capacity) {
    this.capacity = capacity;
    this.data = new Map();

    this.head = new Node();
    this.tail = new Node();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  put(key, value) {
    const { data, head, tail, capacity } = this;

    if (data.has(key)) {
      const item = data.get(key);
      item.value = value;
      data.set(key, item); // 更新 key 对应的 value
      item.remove_this(); // 然后将该节点从 双向链表 中移除
    } else {
      data.set(key, new Node(key, value)); // key 不存在时，在 hash 表中新增
    }
    tail.insert_prev(data.get(key)); // 将 key 对应的节点放到 链表 的末尾

    if (data.size > capacity) {
      // 如果存储数据量发生溢出，则移除第一个元素
      const item = head.next.remove_this(); // 移除链表第一个节点
      data.delete(item.key); // 从 hash 表中方删除数据
    }
  }

  get(key) {
    const { data, tail } = this;
    if (!data.has(key)) return -1;

    // LRU 的规则就是访问过的元素会被放到链表末尾，这样链表头节点就是访问次数最少的，便于删除，如上 put 方法中的删除操作
    const item = data.get(key).remove_this();
    tail.insert_prev(item);
    return item.value;
  }
}

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.h = new HashList(capacity);
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  return this.h.get(key);
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  this.h.put(key, value);
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
