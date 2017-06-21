import isEmpty from './isEmpty';
import { KANA_SLASH_DOT } from '../constants';

/**
 * Tests if char is '・'
 * @param  {String} char
 * @return {Boolean} true if '・'
 */
function isCharSlashDot(char = '') {
  if (isEmpty(char)) return false;
  return char.charCodeAt(0) === KANA_SLASH_DOT;
}

export default isCharSlashDot;
