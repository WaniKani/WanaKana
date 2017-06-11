import isEmpty from './utils/isEmpty';
import isCharKatakana from './utils/isCharKatakana';

/**
 * Test if `input` is [Katakana](https://en.wikipedia.org/wiki/Katakana)
 * @param  {String} [input=''] text
 * @return {Boolean} true if all [Katakana](https://en.wikipedia.org/wiki/Katakana)
 * @example
 * isKatakana('ゲーム')
 * // => true
 * isKatakana('あ')
 * // => false
 * isKatakana('A')
 * // => false
 * isKatakana('あア')
 * // => false
 */
function isKatakana(input = '') {
  if (isEmpty(input)) return false;
  return [...input].every(isCharKatakana);
}

export default isKatakana;
