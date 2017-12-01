import { DEFAULT_OPTIONS } from './constants';
import { applyMapping } from './kanaMappingUtils';
import toHiragana from './toHiragana';
import { getRomajiPostProcessing, getKanaToRomajiTree } from './kanaToRomajiMap';

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
  // just throw away the substring index information and just concatenate all the kana
  return splitIntoRomaji(input, options)
    .map((romajiToken) => romajiToken[2])
    .join('');
}

export function splitIntoRomaji(input = '', options = {}) {
  const config = Object.assign({}, DEFAULT_OPTIONS, options);
  const romajiPostProcessing = getRomajiPostProcessing(config);

  let map = getKanaToRomajiTree(config);
  map = config.customRomajiMapping(map);

  const mappingResult = applyMapping(
    toHiragana(input, { passRomaji: true }),
    map,
    !config.IMEMode
  );
  let result = romajiPostProcessing([input, mappingResult]);
  result = config.customRomajiPostProcessing(result);

  return result[1];
}

export default toRomaji;
