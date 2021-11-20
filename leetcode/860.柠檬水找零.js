/*
 * @lc app=leetcode.cn id=860 lang=javascript
 *
 * [860] 柠檬水找零
 */

// @lc code=start
/**
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function (bills) {
  let five = 0,
    ten = 0;

  for (let index = 0; index < bills.length; index++) {
    bill = bills[index];

    if (bill === 5) {
      five += 1;
    } else if (bill === 10) {
      if (five === 0) return false;
      five -= 1;
      ten += 1;
    } else {
      if (five > 0 && ten > 0) {
        five -= 1;
        ten -= 1;
      } else if (five >= 3) {
        five -= 3;
      } else {
        return false;
      }
    }
    console.log(five, ten);
  }

  //
  // 在 forEach 的回调函数中 return 是不会中断循环的 ！！！
  //
  //
  // bills.forEach((bill) => {
  //   if (bill === 5) {
  //     five += 1;
  //   } else if (bill === 10) {
  //     if (five === 0) return false;
  //     five -= 1;
  //     ten += 1;
  //   } else {
  //     if (five > 0 && ten > 0) {
  //       five -= 1;
  //       ten -= 1;
  //     } else if (five >= 3) {
  //       five -= 3;
  //     } else {
  //       return false;
  //     }
  //   }
  //   console.log(five, ten);
  // });

  return true;
};
// @lc code=end
