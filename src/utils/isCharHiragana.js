import isEmpty from './isEmpty';
import isCharLongDash from './isCharLongDash';
import isCharInRange from './isCharInRange';
import {
  HIRAGANA_START,
  HIRAGANA_END,
} from '../constants.ts';

/**
 * Tests a character. Returns true if the character is [Hiragana](https://en.wikipedia.org/wiki/Hiragana).
 * @param  {String} char character string to test
 * @return {Boolean}
 */
function isCharHiragana(char = '') {
  if (isEmpty(char)) return false;
  if (isCharLongDash(char)) return true;
  return isCharInRange(char, HIRAGANA_START, HIRAGANA_END);
}

export default isCharHiragana;
