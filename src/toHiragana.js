import mergeWithDefaultOptions from './utils/mergeWithDefaultOptions';
import katakanaToHiragana from './utils/katakanaToHiragana';
import romajiToHiragana from './utils/romajiToHiragana';
import isCharEnglishPunctuation from './utils/isCharEnglishPunctuation';
import isRomaji from './isRomaji';
import isMixed from './isMixed';
import isKatakana from './isKatakana';

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
    return katakanaToHiragana(input);
  }

  if (isRomaji(input) || isCharEnglishPunctuation(input)) {
    return romajiToHiragana(input, config);
  }

  if (isMixed(input, { passKanji: true })) {
    const romaji = katakanaToHiragana(input);
    return romajiToHiragana(romaji, config);
  }

  return katakanaToHiragana(input);
}

export default toHiragana;
