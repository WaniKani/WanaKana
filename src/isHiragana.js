import isEmpty from './utils/isEmpty';
import isCharHiragana from './utils/isCharHiragana';

/**
 * Test if `input` is [Hiragana](https://en.wikipedia.org/wiki/Hiragana)
 * @param  {String} [input=''] text
 * @return {Boolean} true if all [Hiragana](https://en.wikipedia.org/wiki/Hiragana)
 * @example
 * isHiragana('げーむ')
 * // => true
 * isHiragana('A')
 * // => false
 * isHiragana('あア')
 * // => false
 */
function isHiragana(input = '') {
  if (isEmpty(input)) return false;
  return [...input].every(isCharHiragana);
}

export default isHiragana;
