import mergeWithDefaultOptions from './utils/mergeWithDefaultOptions';
import hiraganaToKatakana from './utils/hiraganaToKatakana';
import isCharEnglishPunctuation from './utils/isCharEnglishPunctuation';
import toKana from './toKana';
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

  if (isMixed(input) || isRomaji(input) || isCharEnglishPunctuation(input)) {
    const hiragana = toKana(input.toLowerCase(), mergedOptions);
    return hiraganaToKatakana(hiragana);
  }

  return hiraganaToKatakana(input);
}

export default toKatakana;
