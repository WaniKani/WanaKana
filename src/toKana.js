import { DEFAULT_OPTIONS } from './constants';
import { getRomajiToKanaTree, IME_MODE_MAP, USE_OBSOLETE_KANA_MAP } from './utils/romajiToKanaMap';
import { applyMapping, mergeCustomMapping } from './utils/kanaMappingUtils';
import typeOf from './utils/typeOf';
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
export function toKana(input = '', options = {}) {
  // just throw away the substring index information and just concatenate all the kana
  return splitIntoKana(input, options)
    .map((kanaToken) => {
      const [start, , kana] = kanaToken;
      if (kana === null) {
        // haven't converted the end of the string, since we are in IME mode
        return input.slice(start);
      }
      // make katakana, if the first letter of the syllable is upper case
      return isCharUpperCase(input.charAt(start)) ? hiraganaToKatakana(kana) : kana;
    })
    .join('');
}

export function splitIntoKana(input = '', options = {}) {
  const config = Object.assign({}, DEFAULT_OPTIONS, options);

  let map = getRomajiToKanaTree(config);
  map = config.IMEMode ? IME_MODE_MAP(map) : map;
  map = config.useObsoleteKana ? USE_OBSOLETE_KANA_MAP(map) : map;
  map = mergeCustomMapping(map, config.customKanaMapping);

  return applyMapping(input.toLowerCase(), map, !config.IMEMode);
}

export default toKana;
