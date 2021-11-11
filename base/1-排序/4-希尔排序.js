const shellSort = (list) => {
  const len = list.length;
  let gap = Math.floor(len / 2);

  const insertionSort = (array, gap) => {
    for (let i = gap; i < array.length; i++) {
      for (let j = i - gap; j >= 0; j -= gap) {
        if (array[j] > array[j + gap]) {
          [array[j], array[j + gap]] = [array[j + gap], array[j]];
        } else {
          break;
        }
      }
    }
  };

  for (gap; gap > 0; gap = Math.floor(gap / 2)) {
    insertionSort(list, gap);
  }

  return list;
};

const list = [1, 4, 2, 6, 5, 8];
console.log(shellSort(list));

// let shellSort2 = (arr) => {
//   let len = arr.length; // 6
//   let gap = Math.floor(len / 2); // 3
//   for (gap; gap > 0; gap = Math.floor(gap / 2)) {
//     for (var i = gap; i < len; i++) {
//       temp = arr[i];
//       for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
//         arr[j + gap] = arr[j];
//       }
//       arr[j + gap] = temp;
//     }
//   }
//   return arr;
// };
// console.log(fn(list));
