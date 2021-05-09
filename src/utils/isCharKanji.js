import { KANJI_START, KANJI_END, KANJI_ITERATION_MARK } from '../constants';

import isCharInRange from './isCharInRange';
/**
 * Tests a character. Returns true if the character is a CJK ideograph (kanji).
 * @param  {String} char character string to test
 * @return {Boolean}
 */
function isCharKanji(char = '') {
  return (
    isCharInRange(char, KANJI_START, KANJI_END) ||
    char.charCodeAt(0) === KANJI_ITERATION_MARK
  );
}

export default isCharKanji;
