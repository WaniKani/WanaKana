import isEmpty from './isEmpty';
import { JA_PUNCTUATION_RANGES } from '../constants';
import isCharInRange from './isCharInRange';
import isCharIterationMark from './isCharIterationMark';

/**
 * Tests a character. Returns true if the character is considered Japanese punctuation.
 * @param  {String} char character string to test
 * @return {Boolean}
 */
function isCharJapanesePunctuation(char = '') {
  if (isEmpty(char) || isCharIterationMark(char)) return false;
  return JA_PUNCTUATION_RANGES.some(([start, end]) => isCharInRange(char, start, end));
}

export default isCharJapanesePunctuation;
