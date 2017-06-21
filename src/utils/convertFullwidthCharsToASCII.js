import {
  LOWERCASE_START,
  UPPERCASE_START,
  LOWERCASE_FULLWIDTH_START,
  LOWERCASE_FULLWIDTH_END,
  UPPERCASE_FULLWIDTH_START,
  UPPERCASE_FULLWIDTH_END,
} from '../constants';

import isCharInRange from './isCharInRange';

/**
 * Converts all fullwidth roman letters in string to proper ASCII
 * @param  {String} text Full Width roman letters
 * @return {String} ASCII
 */
function convertFullwidthCharsToASCII(text = '') {
  const asciiChars = [...text].map((char, index) => {
    const code = char.charCodeAt(0);
    const lower = isCharInRange(char, LOWERCASE_FULLWIDTH_START, LOWERCASE_FULLWIDTH_END);
    const upper = isCharInRange(char, UPPERCASE_FULLWIDTH_START, UPPERCASE_FULLWIDTH_END);
    if (lower) {
      return String.fromCharCode((code - LOWERCASE_FULLWIDTH_START) + LOWERCASE_START);
    } else if (upper) {
      return String.fromCharCode((code - UPPERCASE_FULLWIDTH_START) + UPPERCASE_START);
    }
    return char;
  });
  return asciiChars.join('');
}

export default convertFullwidthCharsToASCII;
