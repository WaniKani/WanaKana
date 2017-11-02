import {
  DEFAULT_OPTIONS,
} from './constants';
import {
  getKanaPostProcessing,
  getRomajiToKanaTree,
  IME_MODE_MAP,
  USE_OBSOLETE_KANA_MAP,
} from './romajiToKanaMap';
import { applyMapping } from './kanaMappingUtils';

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
 */
export function toKana(input = '', options = {}) {
  // just throw away the substring index information and just concatenate all the kana
  return splitIntoKana(input, options).map((kanaToken) => kanaToken[2]).join('');
}

export function splitIntoKana(input = '', options = {}) {
  const config = Object.assign({}, DEFAULT_OPTIONS, options);
  const kanaPostProcessing = getKanaPostProcessing(config);

  let map = getRomajiToKanaTree(config);
  map = config.IMEMode? IME_MODE_MAP(map): map;
  map = config.useObsoleteKana? USE_OBSOLETE_KANA_MAP(map): map;
  map = config.customKanaMapping(map);

  const mappingResult = applyMapping(input.toLowerCase(), map, !config.IMEMode);
  let result = kanaPostProcessing([input, mappingResult]);
  result = config.customKanaPostProcessing(result);

  return result[1];
}

export default toKana;
