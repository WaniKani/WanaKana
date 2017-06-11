import isEmpty from './isEmpty';
import { ROMAJI_REGEX } from '../constants';

/**
 * Tests a character. Returns true if the character is [Romaji](https://en.wikipedia.org/wiki/Romaji)
 * @param  {String} char character string to test
 * @return {Boolean}
 */
function isCharKana(char = '') {
  if (isEmpty(char)) return false;
  return ROMAJI_REGEX.test(char);
}

export default isCharKana;
