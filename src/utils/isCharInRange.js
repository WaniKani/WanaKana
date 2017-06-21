import isEmpty from './isEmpty';

/**
 * Takes a character and a unicode range. Returns true if the char is in the range.
 * @param  {String}  char  unicode character
 * @param  {Number}  start unicode start range
 * @param  {Number}  end   unicode end range
 * @return {Boolean}
 */
function isCharInRange(char = '', start, end) {
  if (isEmpty(char)) return false;
  const code = char.charCodeAt(0);
  return start <= code && code <= end;
}

export default isCharInRange;
