function swap(arr, start, end) {
  arr[start] = arr.splice(end, 1, arr[start])[0];

  return arr;
}

export default swap;
