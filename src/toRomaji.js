import {
  DEFAULT_OPTIONS,
  TO_ROMAJI,
} from './constants';

import getChunkSize from './utils/getChunkSize';
import getChunk from './utils/getChunk';
import katakanaToHiragana from './utils/katakanaToHiragana';
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
function toRomaji(kana = '', options = {}) {
  const config = Object.assign({}, DEFAULT_OPTIONS, options);
  const len = kana.length;
  // Final output array
  const roma = [];
  // Position in the string that is being evaluated
  let cursor = 0;
  const maxChunk = 2;
  let chunkSize = 2;
  let chunk = '';
  let romaChar = '';
  let nextCharIsDoubleConsonant;

  while (cursor < len) {
    chunkSize = getChunkSize(maxChunk, len - cursor);
    let convertThisChunkToUppercase = false;
    while (chunkSize > 0) {
      chunk = getChunk(kana, cursor, cursor + chunkSize);
      if (isKatakana(chunk)) {
        convertThisChunkToUppercase = config.upcaseKatakana;
        chunk = katakanaToHiragana(chunk);
      }
      // special case for small tsus
      if (chunk.charAt(0) === 'っ' && chunkSize === 1 && cursor < (len - 1)) {
        nextCharIsDoubleConsonant = true;
        romaChar = '';
        break;
      }

      romaChar = TO_ROMAJI[chunk];

      if ((romaChar != null) && nextCharIsDoubleConsonant) {
        romaChar = romaChar.charAt(0).concat(romaChar);
        nextCharIsDoubleConsonant = false;
      }
      // console.log(`${cursor}x${chunkSize}:${chunk} => ${romaChar}`);
      if (romaChar != null) {
        break;
      }
      chunkSize -= 1;
    }
    if (romaChar == null) {
      // Passthrough undefined values
      romaChar = chunk;
    }

    if (convertThisChunkToUppercase) {
      romaChar = romaChar.toUpperCase();
    }
    roma.push(romaChar);
    cursor += chunkSize || 1;
  }
  return roma.join('');
}

export default toRomaji;
