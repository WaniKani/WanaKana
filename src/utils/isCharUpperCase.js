import isEmpty from './isEmpty';
import isCharInRange from './isCharInRange';
import {
  UPPERCASE_START,
  UPPERCASE_END,
} from '../constants';

/**
 * Tests if char is in English unicode uppercase range
 * @param  {String} char
 * @return {Boolean}
 */
function isCharUpperCase(char = '') {
  if (isEmpty(char)) return false;
  return isCharInRange(char, UPPERCASE_START, UPPERCASE_END);
}

export default isCharUpperCase;
