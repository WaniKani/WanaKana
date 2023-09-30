import isEmpty from './isEmpty';
import { KANJI_ITERATION_MARK } from '../constants';

/**
 * Returns true if char is '々'
 * @param  {String} char to test
 * @return {Boolean}
 */
function isCharIterationMark(char = '') {
  if (isEmpty(char)) return false;
  return char.charCodeAt(0) === KANJI_ITERATION_MARK;
}

export default isCharIterationMark;
