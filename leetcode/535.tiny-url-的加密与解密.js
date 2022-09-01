/*
 * @lc app=leetcode.cn id=535 lang=javascript
 *
 * [535] TinyURL 的加密与解密
 */

// @lc code=start

const dataBase = {
  id: 0,
  data: new Map(),
};

/**
 * Encodes a URL to a shortened URL.
 *
 * @param {string} longUrl
 * @return {string}
 */
var encode = function (longUrl) {
  dataBase.data.set(++dataBase.id, longUrl);
  return `http://tinyurl.com/${dataBase.id}`;
};

/**
 * Decodes a shortened URL to its original URL.
 *
 * @param {string} shortUrl
 * @return {string}
 */
var decode = function (shortUrl) {
  const p = shortUrl.lastIndexOf('/');
  const id = shortUrl.slice(p + 1);
  return dataBase.data.get(+id);
};

/**
 * Your functions will be called as such:
 * decode(encode(url));
 */
// @lc code=end
