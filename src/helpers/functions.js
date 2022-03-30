// setup random colors
export const randColor = () => {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
      .toUpperCase()
  );
};

// random colors for each cell
export const randomItem = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};

// Array to Matrix
export const arrayToMatrix = (arr, width) =>
  arr.reduce(
    (rows, key, index) =>
      (index % width === 0
        ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows,
    []
  );

//Find the largest Ares in Matrix
export const LargestAreaMatrix = (matrix, arr) => {
  let bigArea = null;
  arr.map((el, index) => {
    var cache = {};
    function pulse(x, y) {
      var queue = [],
        visited = {},
        size = 0;

      // Current cell is the first element
      queue.push({
        x: x,
        y: y,
      });
      visited[x + " " + y] = true;
      size = 1;

      function test(x, y, value) {
        if (
          !visited[x + " " + y] &&
          y >= 0 &&
          y < matrix.length &&
          x >= 0 &&
          x < matrix[y].length &&
          matrix[y][x] === value
        ) {
          queue.push({
            x: x,
            y: y,
          });
          visited[x + " " + y] = true;
          size += 1;
        }
      }
      while (queue.length) {
        var cell = queue.pop(),
          value = matrix[cell.y][cell.x];
        // Add neighbors of the same value to the queue
        test(cell.x - 1, cell.y, value);
        test(cell.x + 1, cell.y, value);
        test(cell.x, cell.y - 1, value);
        test(cell.x, cell.y + 1, value);
      }
      // Cache the size for all visited cells for performances
      console.log(visited);
      let obj = Object.keys(visited);
      console.log("cccx", obj);
      for (var key in visited) {
        cache[key] = size;
      }
      return size;
    }
    var max = 0;
    for (var y = 0; y < matrix.length; ++y) {
      for (var x = 0; x < matrix[y].length; ++x) {
        if (!cache[x + " " + y]) {
          var size = pulse(x, y);
          if (size > max) {
            max = size;
          }
        }
      }
    }
    bigArea = max;
  });
  return bigArea;
};

// Highest Reapeated Color in colors Array
export const highestColor = (arr) =>
  (arr || []).reduce(
    (acc, el) => {
      acc.k[el] = acc.k[el] ? acc.k[el] + 1 : 1;
      acc.max = acc.max ? (acc.max < acc.k[el] ? el : acc.max) : el;
      return acc;
    },
    { k: {} }
  ).max;
