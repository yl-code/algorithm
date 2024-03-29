/**
 *
 * 𝑢，𝑣 两个序列趋势相同，当且仅当对于任意 𝑙 和 𝑟，均有 𝑅𝑀𝑄 (𝑢,𝑙,𝑟)=𝑅𝑀𝑄(𝑣,𝑙,𝑟) (1 ≤ 𝑙 ≤ 𝑟 ≤ 𝑛)，
 * 其中 𝑛 是序列长度，𝑅𝑀𝑄(𝑢, 𝑙, 𝑟) 是 𝑢 序列从 𝑙 到 𝑟 中的最小值（有可能有多个最小值）的最大下标。
 *
 * 现有两个序列 𝐴={𝑎1, 𝑎2, 𝑎3, …, 𝑎𝑛}，𝐵={𝑏1, 𝑏2, 𝑏3, …, 𝑏𝑛} 两个序列
 * 请求出最大的 𝑝，使得 𝐴‘={𝑎1, 𝑎2, 𝑎3, …, 𝑎𝑝} 与 𝐵‘={𝑏1, 𝑏2, 𝑏3, …, 𝑏𝑝} 趋势相同。
 *
 * eg:
 * 输入为：
 * 5
 * 3 1 5 2 4
 * 5 2 4 3 1
 *
 * 输出为：
 * 4
 */

/**
 *
 * 思路：
 *    题目明显要求的是固定末尾的 RMQ 问题，所以使用单调队列来解体
 *    题目要求的在 前 p 个元素 的区间内， A' 与 B' 趋势相同，所以区间内它俩对应的单调队列中的元素数量相同
 *    如果出现数量不同，则表明新加入的元素以及超过 p 合理的范围
 *
 *
 * @param {*} n 序列长度
 * @param {*} a 序列 a
 * @param {*} b 序列 b
 */
const twin = (n, a, b) => {
  let p;
  let q_a = [];
  let q_b = [];
  for (p = 0; p < n; p++) {
    while (q_a.length && q_a[q_a.length - 1] > a[p]) q_a.pop();
    while (q_b.length && q_b[q_b.length - 1] > b[p]) q_b.pop();
    q_a.push(a[p]);
    q_b.push(b[p]);

    if (q_a.length !== q_b.length) break;
  }

  return p;
};

console.log(twin(5, [3, 1, 5, 2, 4], [5, 2, 4, 3, 1])); // 4
