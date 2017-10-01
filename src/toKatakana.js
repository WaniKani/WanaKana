import { DEFAULT_OPTIONS } from './constants';
import isRomaji from './isRomaji';
import isMixed from './isMixed';
import hiraganaToKatakana from './utils/hiraganaToKatakana';
import romajiToHiragana from './utils/romajiToHiragana';

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
  const config = Object.assign({}, DEFAULT_OPTIONS, options);
  if (config.passRomaji) return hiraganaToKatakana(input);
  if (isRomaji(input) || isMixed(input)) {
    const romaji = romajiToHiragana(input, config);
    return hiraganaToKatakana(romaji);
  }
  return hiraganaToKatakana(input);
}

export default toKatakana;
