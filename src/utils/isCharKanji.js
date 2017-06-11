import {
  KANJI_START,
  KANJI_END,
} from '../constants';

import isCharInRange from './isCharInRange';
/**
 * Tests a character. Returns true if the character is a CJK ideograph (kanji).
 * @param  {String} char character string to test
 * @return {Boolean}
 */
function isCharKanji(char = '') {
  return isCharInRange(char, KANJI_START, KANJI_END);
}

export default isCharKanji;
