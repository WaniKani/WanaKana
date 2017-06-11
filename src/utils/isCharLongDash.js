import isEmpty from './isEmpty';
import { PROLONGED_SOUND_MARK } from '../constants';

/**
 * Returns true if char is 'ー'
 * @param  {String} char to test
 * @return {Boolean}
 */
function isCharLongDash(char = '') {
  if (isEmpty(char)) return false;
  return char.charCodeAt(0) === PROLONGED_SOUND_MARK;
}

export default isCharLongDash;
