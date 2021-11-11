const selectionSort = (array) => {
  let minIndex;

  for (let i = 0; i < array.length - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    [array[minIndex], array[i]] = [array[i], array[minIndex]];
  }

  return array;
};

const list = [3, 4, 5, 1, 2, 6, 1.2];
console.log(selectionSort(list));
