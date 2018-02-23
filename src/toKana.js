import { TO_KANA_METHODS } from './constants';
import mergeWithDefaultOptions from './utils/mergeWithDefaultOptions';
import { getRomajiToKanaTree, IME_MODE_MAP, USE_OBSOLETE_KANA_MAP } from './utils/romajiToKanaMap';
import { applyMapping, mergeCustomMapping } from './utils/kanaMapping';
import isCharUpperCase from './utils/isCharUpperCase';
import hiraganaToKatakana from './utils/hiraganaToKatakana';

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
 * toKana('WanaKana', { customKanaMapping: { na: 'に', ka: 'Bana' } });
 * // => 'ワにBanaに'
 */
export function toKana(input = '', options = {}, map) {
  let config;
  if (!map) {
    config = mergeWithDefaultOptions(options);
    map = createRomajiToKanaMap(config);
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
      const enforceKatakana =
        config.IMEMode === TO_KANA_METHODS.KATAKANA ||
        [...input.slice(start, end)].every(isCharUpperCase);

      return enforceHiragana || !enforceKatakana ? kana : hiraganaToKatakana(kana);
    })
    .join('');
}

/**
 *
 * @param {String} [input=''] input text
 * @param {Object} [options={}] toKana options
 * @returns {Array[]} [[start, end, token]]
 * @ignore
 * @example
 * splitIntoConvertedKana('buttsuuji')
 * // => [[0, 2, 'ぶ'], [2, 6, 'っつ'], [6, 7, 'う'], [7, 9, 'じ']]
 */
export function splitIntoConvertedKana(input = '', options = {}, map) {
  if (!map) {
    map = createRomajiToKanaMap(options);
  }
  return applyMapping(input.toLowerCase(), map, !options.IMEMode);
}

export function createRomajiToKanaMap(config = {}) {
  let map = getRomajiToKanaTree();
  map = config.IMEMode ? IME_MODE_MAP(map) : map;
  map = config.useObsoleteKana ? USE_OBSOLETE_KANA_MAP(map) : map;
  return mergeCustomMapping(map, config.customKanaMapping);
}

export default toKana;
