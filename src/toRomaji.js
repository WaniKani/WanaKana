import mergeWithDefaultOptions from './utils/mergeWithDefaultOptions';
import toHiragana from './toHiragana';
import isKatakana from './isKatakana';
import { getKanaToRomajiTree } from './utils/kanaToRomajiMap';
import { applyMapping, mergeCustomMapping } from './utils/kanaMapping';

/**
 * Convert kana to romaji
 * @param  {String} kana text input
 * @param  {DefaultOptions} [options=defaultOptions]
 * @return {String} converted text
 * @example
 * toRomaji('ひらがな　カタカナ')
 * // => 'hiragana katakana'
 * toRomaji('げーむ　ゲーム')
 * // => 'ge-mu geemu'
 * toRomaji('ひらがな　カタカナ', { upcaseKatakana: true })
 * // => 'hiragana KATAKANA'
 * toRomaji('つじぎり', { customRomajiMapping: { じ: 'zi', つ: 'tu', り: 'li' } });
 * // => 'tuzigili'
 */
export function toRomaji(input = '', options = {}) {
  const mergedOptions = mergeWithDefaultOptions(options);
  // just throw away the substring index information and just concatenate all the kana
  return splitIntoRomaji(input, mergedOptions)
    .map((romajiToken) => {
      const [start, end, romaji] = romajiToken;
      const makeUpperCase = options.upcaseKatakana && isKatakana(input.slice(start, end));
      return makeUpperCase ? romaji.toUpperCase() : romaji;
    })
    .join('');
}

function splitIntoRomaji(input, options) {
  let map = getKanaToRomajiTree(options);
  map = mergeCustomMapping(map, options.customRomajiMapping);

  return applyMapping(toHiragana(input, { passRomaji: true }), map, !options.IMEMode);
}

export default toRomaji;
