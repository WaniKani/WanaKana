import {
  KATAKANA_START,
  KATAKANA_END,
} from '../constants';

import isCharInRange from './isCharInRange';

/**
 * Tests a character. Returns true if the character is [Katakana](https://en.wikipedia.org/wiki/Katakana).
 * @param  {String} char character string to test
 * @return {Boolean}
 */
function isCharKatakana(char = '') {
  return isCharInRange(char, KATAKANA_START, KATAKANA_END);
}

export default isCharKatakana;
