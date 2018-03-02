import typeOf from './utils/typeOf';
import isEmpty from './utils/isEmpty';
import isCharRomaji from './utils/isCharRomaji';

/**
 * Test if `input` is [Romaji](https://en.wikipedia.org/wiki/Romaji) (allowing [Hepburn romanisation](https://en.wikipedia.org/wiki/Hepburn_romanization))
 * @param  {String} [input=''] text
 * @param  {Regexp} [allowed] additional test allowed to pass for each char
 * @return {Boolean} true if [Romaji](https://en.wikipedia.org/wiki/Romaji)
 * @example
 * isRomaji('Tōkyō and Ōsaka')
 * // => true
 * isRomaji('12a*b&c-d')
 * // => true
 * isRomaji('あアA')
 * // => false
 * isRomaji('お願い')
 * // => false
 * isRomaji('a！b&cーd') // Zenkaku punctuation fails
 * // => false
 * isRomaji('a！b&cーd', /[！ー]/)
 * // => true
 */
function isRomaji(input = '', allowed) {
  const augmented = typeOf(allowed) === 'regexp';
  return isEmpty(input)
    ? false
    : [...input].every((char) => {
      const isRoma = isCharRomaji(char);
      return !augmented ? isRoma : isRoma || allowed.test(char);
    });
}

export default isRomaji;
