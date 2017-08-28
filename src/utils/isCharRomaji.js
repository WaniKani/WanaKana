import isEmpty from './isEmpty';
import isCharInRange from './isCharInRange';
import { ROMAJI_RANGES } from '../constants';

/**
 * Tests a character. Returns true if the character is [Romaji](https://en.wikipedia.org/wiki/Romaji) (allowing [Hepburn romanisation](https://en.wikipedia.org/wiki/Hepburn_romanization))
 * @param  {String} char character string to test
 * @return {Boolean}
 */
function isCharRomaji(char = '') {
  if (isEmpty(char)) return false;
  return ROMAJI_RANGES.some(([start, end]) => isCharInRange(char, start, end));
}

export default isCharRomaji;
