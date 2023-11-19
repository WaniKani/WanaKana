import typeOf from './utils/typeOf';
import isEmpty from './utils/isEmpty';
import isCharJapanese from './utils/isCharJapanese';

/**
 * Test if `input` only includes [Kanji](https://en.wikipedia.org/wiki/Kanji), [Kana](https://en.wikipedia.org/wiki/Kana), zenkaku numbers, and JA punctuation/symbols.”
 * @param  {String} [input=''] text
 * @param  {RegExp} [allowed] additional test allowed to pass for each char
 * @return {Boolean} true if passes checks
 * @example
 * isJapanese('泣き虫')
 * // => true
 * isJapanese('あア')
 * // => true
 * isJapanese('２月') // Zenkaku numbers allowed
 * // => true
 * isJapanese('泣き虫。！〜＄') // Zenkaku/JA punctuation
 * // => true
 * isJapanese('泣き虫.!~$') // Latin punctuation fails
 * // => false
 * isJapanese('A泣き虫')
 * // => false
 * isJapanese('≪偽括弧≫', /[≪≫]/);
 * // => true
 */
function isJapanese(input = '', allowed) {
  const augmented = typeOf(allowed) === 'regexp';
  return isEmpty(input)
    ? false
    : [...input].every((char) => {
      const isJa = isCharJapanese(char);
      return !augmented ? isJa : isJa || allowed.test(char);
    });
}

export default isJapanese;
