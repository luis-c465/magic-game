/**
 * @param {string} string
 * @return {string} String with its first letter capitalized
 */
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Returns a range of numbers
 *
 * @param {number} start
 * @param {number} stop
 * @param {number} [step=1]
 *
 * @return {number[]}
 */
function range(start, stop, step = 1) {
  var a = [start],
    b = start;
  while (b < stop) {
    a.push((b += step || 1));
  }
  return b > stop ? a.slice(0, -1) : a;
}

/**
 * @returns {boolean}
 */
function randomBoolean() {
  return random(1) >= 0.5;
}
