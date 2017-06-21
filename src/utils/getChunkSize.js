/**
 * Limits picking chunk size to be no bigger than the remaining characters.
 * @param  {Number} max index limit
 * @param  {Number} remaining
 * @return {Number}
 */
function getChunkSize(max = 0, remaining = 0) {
  return Math.min(max, remaining);
}

export default getChunkSize;
