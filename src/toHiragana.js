import mergeWithDefaultOptions from './utils/mergeWithDefaultOptions';
import katakanaToHiragana from './utils/katakanaToHiragana';
import isCharEnglishPunctuation from './utils/isCharEnglishPunctuation';
import isRomaji from './isRomaji';
import isMixed from './isMixed';
import toKana from './toKana';
import toRomaji from './toRomaji';

/**
 * Convert input to [Hiragana](https://en.wikipedia.org/wiki/Hiragana)
 * @param  {String} [input=''] text
 * @param  {DefaultOptions} [options=defaultOptions]
 * @return {String} converted text
 * @example
 * toHiragana('toukyou, オオサカ')
 * // => 'とうきょう、　おおさか'
 * toHiragana('only カナ', { passRomaji: true })
 * // => 'only かな'
 * toHiragana('wi')
 * // => 'うぃ'
 * toHiragana('wi', { useObsoleteKana: true })
 * // => 'ゐ'
 */
function toHiragana(input = '', options = {}) {
  const config = mergeWithDefaultOptions(options);
  if (config.passRomaji) {
    return katakanaToHiragana(input, toRomaji, config);
  }

  if (isMixed(input, { passKanji: true })) {
    const convertedKatakana = katakanaToHiragana(input, toRomaji, config);
    return toKana(convertedKatakana.toLowerCase(), config);
  }

  if (isRomaji(input) || isCharEnglishPunctuation(input)) {
    return toKana(input.toLowerCase(), config);
  }

  return katakanaToHiragana(input, toRomaji, config);
}

export default toHiragana;
