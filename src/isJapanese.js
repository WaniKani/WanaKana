import isEmpty from './utils/isEmpty';
import { KANJI_KANA_REGEX } from './constants';

/**
 * Test if `input` is [Kanji](https://en.wikipedia.org/wiki/Kanji) and/or [Kana](https://en.wikipedia.org/wiki/Kana) like “「泣き虫」”
 * Includes Japanese full-width punctuation ranges
 * @param  {String} [input=''] text
 * @return {Boolean} true if all [Kanji](https://en.wikipedia.org/wiki/Kanji) and/or [Kana](https://en.wikipedia.org/wiki/Kana)
 * @example
 * isJapanese('泣き虫')
 * // => true
 * isJapanese('あア')
 * // => true
 * isJapanese('泣き虫。！〜') // Full-width punctuation
 * // => true
 * isJapanese('泣き虫.!~') // Half-width / Latin punctuation
 * // => false
 * isJapanese('泣き虫A')
 * // => false
 * isJapanese('A')
 * // => false
 */
function isJapanese(input = '') {
  if (isEmpty(input)) return false;
  return [...input].every((char) => KANJI_KANA_REGEX.test(char));
}

export default isJapanese;
