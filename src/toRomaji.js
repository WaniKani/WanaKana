import memoizeOne from 'memoize-one';
import { dequal } from 'dequal';

import mergeWithDefaultOptions from './utils/mergeWithDefaultOptions';
import katakanaToHiragana from './utils/katakanaToHiragana';
import isKatakana from './isKatakana';
import { getKanaToRomajiTree } from './utils/kanaToRomajiMap';
import { applyMapping, mergeCustomMapping } from './utils/kanaMapping';

// memoize and deeply compare args so we only recreate when necessary
export const createKanaToRomajiMap = memoizeOne(
  (romanization, customRomajiMapping) => {
    let map = getKanaToRomajiTree(romanization);

    if (customRomajiMapping) {
      map = mergeCustomMapping(map, customRomajiMapping);
    }

    return map;
  },
  dequal
);

/**
 * Convert kana to romaji
 * @param  {String} kana text input
 * @param  {DefaultOptions} [options=defaultOptions]
 * @param  {Object} map custom mapping
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
export function toRomaji(input = '', options = {}, map) {
  const config = mergeWithDefaultOptions(options);

  if (!map) {
    map = createKanaToRomajiMap(
      config.romanization,
      config.customRomajiMapping
    );
  }

  // just throw away the substring index information and simply concatenate all the kana
  return splitIntoRomaji(input, config, map)
    .map((romajiToken) => {
      const [start, end, romaji] = romajiToken;
      const makeUpperCase = config.upcaseKatakana && isKatakana(input.slice(start, end));
      return makeUpperCase ? romaji.toUpperCase() : romaji;
    })
    .join('');
}

function splitIntoRomaji(input, options, map) {
  if (!map) {
    map = createKanaToRomajiMap(
      options.romanization,
      options.customRomajiMapping
    );
  }

  return applyMapping(
    katakanaToHiragana(input, toRomaji, {
      isDestinationRomaji: true,
      ...options,
    }),
    map,
    !options.IMEMode
  );
}

export default toRomaji;
