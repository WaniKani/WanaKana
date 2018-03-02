import isEmpty from './isEmpty';
import isCharInRange from './isCharInRange';
import { LATIN_UPPERCASE_START, LATIN_UPPERCASE_END } from '../constants';

/**
 * Tests if char is in English unicode uppercase range
 * @param  {String} char
 * @return {Boolean}
 */
function isCharUpperCase(char = '') {
  if (isEmpty(char)) return false;
  return isCharInRange(char, LATIN_UPPERCASE_START, LATIN_UPPERCASE_END);
}

export default isCharUpperCase;
