import { DEFAULT_OPTIONS } from './constants';
import { applyMapping } from './kanaMappingUtils';
import toHiragana from './toHiragana';
import { getKanaToRomajiTree } from './kanaToRomajiMap';
import isKatakana from './isKatakana';

/**
 * Convert kana to romaji
 * @param  {String} kana text input
 * @param  {DefaultOptions} [options=defaultOptions]
 * @return {String} converted text
 * @example
 * toRomaji('ひらがな　カタカナ')
 * // => 'hiragana katakana'
 * toRomaji('ひらがな　カタカナ', { upcaseKatakana: true })
 * // => 'hiragana KATAKANA'
 */
export function toRomaji(input = '', options = {}) {
  const config = Object.assign({}, DEFAULT_OPTIONS, options);
  // just throw away the substring index information and just concatenate all the kana
  return splitIntoRomaji(input, config).map((romajiToken) => {
    const [start, end, romaji] = romajiToken;
    const makeUpperCase = options.upcaseKatakana && isKatakana(input.slice(start, end));
    return makeUpperCase? romaji.toUpperCase(): romaji;
  }).join('');
}

function splitIntoRomaji(input, config) {
  let map = getKanaToRomajiTree(config);
  map = config.customRomajiMapping(map);
  return applyMapping(toHiragana(input, { passRomaji: true }), map, !config.IMEMode);
}

export default toRomaji;
