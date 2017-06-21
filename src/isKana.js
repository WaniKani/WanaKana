import isEmpty from './utils/isEmpty';
import isCharKana from './utils/isCharKana';

/**
 * Test if `input` is [Kana](https://en.wikipedia.org/wiki/Kana) ([Katakana](https://en.wikipedia.org/wiki/Katakana) and/or [Hiragana](https://en.wikipedia.org/wiki/Hiragana))
 * @param  {String} [input=''] text
 * @return {Boolean} true if all [Kana](https://en.wikipedia.org/wiki/Kana)
 * @example
 * isKana('あ')
 * // => true
 * isKana('ア')
 * // => true
 * isKana('あーア')
 * // => true
 * isKana('A')
 * // => false
 * isKana('あAア')
 * // => false
 */
function isKana(input = '') {
  if (isEmpty(input)) return false;
  return [...input].every(isCharKana);
}

export default isKana;
