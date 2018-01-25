import { DEFAULT_OPTIONS } from './constants';
import { getKanaToRomajiTree } from './kanaToRomajiMap';
import { applyMapping, createCustomMapping } from './kanaMappingUtils';
import typeOf from './utils/typeOf';
import toHiragana from './toHiragana';
import isKatakana from './isKatakana';

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
 * toRomaji('つじぎり', { customRomajiMapping: createCustomMapping({ じ: 'zi', つ: 'tu', り: 'li' }) });
 * // => 'tuzigili'
 */
export function toRomaji(input = '', options = {}) {
  const config = Object.assign({}, DEFAULT_OPTIONS, options);
  // just throw away the substring index information and just concatenate all the kana
  return splitIntoRomaji(input, config)
    .map((romajiToken) => {
      const [start, end, romaji] = romajiToken;
      const makeUpperCase = options.upcaseKatakana && isKatakana(input.slice(start, end));
      return makeUpperCase ? romaji.toUpperCase() : romaji;
    })
    .join('');
}

function splitIntoRomaji(input, config) {
  let map = getKanaToRomajiTree(config);
  // allow consumer to pass either function or object as customKanaMapping
  if (typeOf(config.customRomajiMapping) === 'function') {
    map = config.customRomajiMapping(map);
  } else if (typeOf(config.customRomajiMapping) === 'object') {
    map = createCustomMapping(config.customRomajiMapping)(map);
  }

  return applyMapping(toHiragana(input, { passRomaji: true }), map, !config.IMEMode);
}

export default toRomaji;
