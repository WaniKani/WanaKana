import {
  LOWERCASE_START,
  UPPERCASE_START,
  LOWERCASE_ZENKAKU_START,
  LOWERCASE_ZENKAKU_END,
  UPPERCASE_ZENKAKU_START,
  UPPERCASE_ZENKAKU_END,
} from '../constants';

import isCharInRange from './isCharInRange';

/**
 * Converts all fullwidth latin letters in string to proper ASCII
 * @param  {String} text Fullwidth (zenkaku) latin letters
 * @return {String} ASCII
 */
function zenkakuToASCII(text = '') {
  const asciiChars = [...text].map((char, index) => {
    const code = char.charCodeAt(0);
    const lower = isCharInRange(char, LOWERCASE_ZENKAKU_START, LOWERCASE_ZENKAKU_END);
    const upper = isCharInRange(char, UPPERCASE_ZENKAKU_START, UPPERCASE_ZENKAKU_END);
    if (lower) {
      return String.fromCharCode(code - (LOWERCASE_ZENKAKU_START + LOWERCASE_START));
    } else if (upper) {
      return String.fromCharCode(code - (UPPERCASE_ZENKAKU_START + UPPERCASE_START));
    }
    return char;
  });
  return asciiChars.join('');
}

export default zenkakuToASCII;
