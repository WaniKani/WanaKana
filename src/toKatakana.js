import mergeWithDefaultOptions from './utils/mergeWithDefaultOptions';
import hiraganaToKatakana from './utils/hiraganaToKatakana';
import romajiToHiragana from './utils/romajiToHiragana';
import isRomaji from './isRomaji';
import isMixed from './isMixed';

/**
 * Convert input to [Katakana](https://en.wikipedia.org/wiki/Katakana)
 * @param  {String} [input=''] text
 * @param  {DefaultOptions} [options=defaultOptions]
 * @return {String} converted text
 * @example
 * toKatakana('toukyou, おおさか')
 * // => 'トウキョウ、　オオサカ'
 * toKatakana('only かな', { passRomaji: true })
 * // => 'only カナ'
 * toKatakana('wi')
 * // => 'ウィ'
 * toKatakana('wi', { useObsoleteKana: true })
 * // => 'ヰ'
 */
function toKatakana(input = '', options = {}) {
  const mergedOptions = mergeWithDefaultOptions(options);
  if (mergedOptions.passRomaji) {
    return hiraganaToKatakana(input);
  }
  if (isRomaji(input) || isMixed(input)) {
    const romaji = romajiToHiragana(input, mergedOptions);
    return hiraganaToKatakana(romaji);
  }
  return hiraganaToKatakana(input);
}

export default toKatakana;
