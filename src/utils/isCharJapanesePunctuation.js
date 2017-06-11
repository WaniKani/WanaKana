import { JAPANESE_FULLWIDTH_PUNCTUATION_RANGES } from '../constants';
import isCharInRange from './isCharInRange';

/**
 * Tests a character. Returns true if the character is considered Japanese punctuation.
 * @param  {String} char character string to test
 * @return {Boolean}
 */
function isCharJapanesePunctuation(char = '') {
  return JAPANESE_FULLWIDTH_PUNCTUATION_RANGES.some(([start, end]) => isCharInRange(char, start, end));
}

export default isCharJapanesePunctuation;
