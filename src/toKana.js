import memoizeOne from 'memoize-one';
import { dequal } from 'dequal';

import { TO_KANA_METHODS } from './constants';
import mergeWithDefaultOptions from './utils/mergeWithDefaultOptions';
import {
  getRomajiToKanaTree,
  IME_MODE_MAP,
  USE_OBSOLETE_KANA_MAP,
} from './utils/romajiToKanaMap';
import { applyMapping, mergeCustomMapping } from './utils/kanaMapping';
import isCharUpperCase from './utils/isCharUpperCase';
import hiraganaToKatakana from './utils/hiraganaToKatakana';

// memoize and deeply compare args so we only recreate when necessary
export const createRomajiToKanaMap = memoizeOne(
  (IMEMode, useObsoleteKana, customKanaMapping) => {
    let map = getRomajiToKanaTree();

    map = IMEMode ? IME_MODE_MAP(map) : map;
    map = useObsoleteKana ? USE_OBSOLETE_KANA_MAP(map) : map;

    if (customKanaMapping) {
      map = mergeCustomMapping(map, customKanaMapping);
    }

    return map;
  },
  dequal
);

/**
 * Convert [Romaji](https://en.wikipedia.org/wiki/Romaji) to [Kana](https://en.wikipedia.org/wiki/Kana), lowercase text will result in [Hiragana](https://en.wikipedia.org/wiki/Hiragana) and uppercase text will result in [Katakana](https://en.wikipedia.org/wiki/Katakana).
 * @param  {String} [input=''] text
 * @param  {DefaultOptions} [options=defaultOptions]
 * @return {String} converted text
 * @example
 * toKana('onaji BUTTSUUJI')
 * // => 'おなじ ブッツウジ'
 * toKana('ONAJI buttsuuji')
 * // => 'オナジ ぶっつうじ'
 * toKana('座禅‘zazen’スタイル')
 * // => '座禅「ざぜん」スタイル'
 * toKana('batsuge-mu')
 * // => 'ばつげーむ'
 * toKana('!?.:/,~-‘’“”[](){}') // Punctuation conversion
 * // => '！？。：・、〜ー「」『』［］（）｛｝'
 * toKana('we', { useObsoleteKana: true })
 * // => 'ゑ'
 * toKana('wanakana', { customKanaMapping: { na: 'に', ka: 'bana' } });
 * // => 'わにbanaに'
 */
export function toKana(input = '', options = {}, map) {
  let config;
  if (!map) {
    config = mergeWithDefaultOptions(options);
    map = createRomajiToKanaMap(
      config.IMEMode,
      config.useObsoleteKana,
      config.customKanaMapping
    );
  } else {
    config = options;
  }

  // throw away the substring index information and just concatenate all the kana
  return splitIntoConvertedKana(input, config, map)
    .map((kanaToken) => {
      const [start, end, kana] = kanaToken;
      if (kana === null) {
        // haven't converted the end of the string, since we are in IME mode
        return input.slice(start);
      }
      const enforceHiragana = config.IMEMode === TO_KANA_METHODS.HIRAGANA;
      const enforceKatakana = config.IMEMode === TO_KANA_METHODS.KATAKANA
        || [...input.slice(start, end)].every(isCharUpperCase);

      return enforceHiragana || !enforceKatakana
        ? kana
        : hiraganaToKatakana(kana);
    })
    .join('');
}

/**
 *
 * @private
 * @param {String} [input=''] input text
 * @param {DefaultOptions} [options=defaultOptions] toKana options
 * @param {Object} [map] custom mapping
 * @returns {Array[]} [[start, end, token]]
 * @example
 * splitIntoConvertedKana('buttsuuji')
 * // => [[0, 2, 'ぶ'], [2, 6, 'っつ'], [6, 7, 'う'], [7, 9, 'じ']]
 */
export function splitIntoConvertedKana(input = '', options = {}, map) {
  const { IMEMode, useObsoleteKana, customKanaMapping } = options;

  if (!map) {
    map = createRomajiToKanaMap(IMEMode, useObsoleteKana, customKanaMapping);
  }

  return applyMapping(input.toLowerCase(), map, !IMEMode);
}

export default toKana;
