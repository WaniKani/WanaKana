import { KANJI_START, KANJI_END } from '../constants.ts';

import isCharInRange from './isCharInRange';
import isCharIterationMark from './isCharIterationMark';
/**
 * Tests a character. Returns true if the character is a CJK ideograph (kanji).
 * @param  {String} char character string to test
 * @return {Boolean}
 */
function isCharKanji(char = '') {
  return isCharInRange(char, KANJI_START, KANJI_END) || isCharIterationMark(char);
}

export default isCharKanji;
