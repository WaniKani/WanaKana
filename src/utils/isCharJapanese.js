import isCharInRange from './isCharInRange';
import { JAPANESE_RANGES } from '../constants';

/**
 * Tests a character. Returns true if the character is [Katakana](https://en.wikipedia.org/wiki/Katakana).
 * @param  {String} char character string to test
 * @return {Boolean}
 */
function isCharJapanese(char = '') {
  return JAPANESE_RANGES.some(([start, end]) => isCharInRange(char, start, end));
}

export default isCharJapanese;
