import isEmpty from './utils/isEmpty';
import isCharJapanese from './utils/isCharJapanese';

/**
 * Test if `input` only includes [Kanji](https://en.wikipedia.org/wiki/Kanji), [Kana](https://en.wikipedia.org/wiki/Kana), zenkaku punctuation, japanese symbols and numbers.”
 * @param  {String} [input=''] text
 * @return {Boolean} true if passes checks
 * @example
 * isJapanese('泣き虫')
 * // => true
 * isJapanese('あア')
 * // => true
 * isJapanese('２月1日') // Full and half-width numbers allowed
 * // => true
 * isJapanese('泣き虫。！〜＄')
 * // => true
 * isJapanese('泣き虫.!~$') // Half-width / Latin punctuation fails
 * // => false
 * isJapanese('A泣き虫')
 * // => false
 * isJapanese('A')
 * // => false
 */
function isJapanese(input = '') {
  if (isEmpty(input)) return false;
  return [...input].every(isCharJapanese);
}

export default isJapanese;
