import {
  DEFAULT_OPTIONS,
  UPPERCASE_START,
  UPPERCASE_END,
  FOUR_CHAR_EDGECASES,
  FROM_ROMAJI,
} from './constants';

import isCharInRange from './utils/isCharInRange';
import isCharUpperCase from './utils/isCharUpperCase';
import getChunkSize from './utils/getChunkSize';
import getChunk from './utils/getChunk';
import isCharConsonant from './utils/isCharConsonant';
import isCharVowel from './utils/isCharVowel';
import hiraganaToKatakana from './utils/hiraganaToKatakana';
import isKana from './isKana';

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
  return splitIntoKana(input, options)
    .map((kanaToken) => kanaToken[2])
    .join('');
}

export function splitIntoKana(input = '', options = {}) {
  const config = Object.assign({}, DEFAULT_OPTIONS, options);
  // Final output array containing arrays [start index of the translitterated substring, end index, kana]
  const kana = [];
  // Position in the string that is being evaluated
  let cursor = 0;
  const len = input.length;
  const maxChunk = 3;
  let chunkSize = 3;
  let chunk = '';
  let chunkLC = '';

  // Steps through the string pulling out chunks of characters. Each chunk will be evaluated
  // against the romaji to kana table. If there is no match, the last character in the chunk
  // is dropped and the chunk is reevaluated. If nothing matches, the character is assumed
  // to be invalid or punctuation or other and gets passed through.
  while (cursor < len) {
    let kanaChar = null;
    chunkSize = getChunkSize(maxChunk, len - cursor);
    while (chunkSize > 0) {
      chunk = getChunk(input, cursor, cursor + chunkSize);
      chunkLC = chunk.toLowerCase();
      // Handle super-rare edge cases with 4 char chunks (like ltsu, chya, shya)
      if (FOUR_CHAR_EDGECASES.includes(chunkLC) && len - cursor >= 4) {
        chunkSize += 1;
        chunk = getChunk(input, cursor, cursor + chunkSize);
        chunkLC = chunk.toLowerCase();
      } else {
        // Handle edge case of n followed by consonant
        if (chunkLC.charAt(0) === 'n') {
          if (chunkSize === 2) {
            // Handle edge case of n followed by a space (only if not in IME mode)
            if (!config.IMEMode && chunkLC.charAt(1) === ' ') {
              kanaChar = 'ん ';
              break;
            }
            // Convert IME input of n' to "ん"
            if (config.IMEMode && chunkLC === "n'") {
              kanaChar = 'ん';
              break;
            }
          }
          // Handle edge case of n followed by n and vowel
          if (
            isCharConsonant(chunkLC.charAt(1), false) &&
            isCharVowel(chunkLC.charAt(2))
          ) {
            chunkSize = 1;
            chunk = getChunk(input, cursor, cursor + chunkSize);
            chunkLC = chunk.toLowerCase();
          }
        }

        // Handle case of double consonants
        if (
          chunkLC.charAt(0) !== 'n' &&
          isCharConsonant(chunkLC.charAt(0)) &&
          chunk.charAt(0) === chunk.charAt(1)
        ) {
          chunkSize = 1;
          // Return katakana ッ if chunk is uppercase, otherwise return hiragana っ
          if (isCharInRange(chunk.charAt(0), UPPERCASE_START, UPPERCASE_END)) {
            chunkLC = 'ッ';
            chunk = 'ッ';
          } else {
            chunkLC = 'っ';
            chunk = 'っ';
          }
        }
      }

      kanaChar = FROM_ROMAJI[chunkLC];
      // console.log(`${chunkLC}, ${cursor}x${chunkSize}:${chunk} => ${kanaChar}`); // DEBUG
      if (kanaChar != null) {
        break;
      }
      // Step down the chunk size.
      // If chunkSize was 4, step down twice.
      if (chunkSize === 4) {
        chunkSize -= 2;
      } else {
        chunkSize -= 1;
      }
    }

    // Passthrough undefined values
    if (kanaChar == null) {
      kanaChar = chunk;
    }

    // Handle special cases.
    if (config.useObsoleteKana) {
      if (chunkLC === 'wi') kanaChar = 'ゐ';
      if (chunkLC === 'we') kanaChar = 'ゑ';
    }

    if (!!config.IMEMode && chunkLC.charAt(0) === 'n') {
      if (
        (input.charAt(cursor + 1).toLowerCase() === 'y' &&
          isCharVowel(input.charAt(cursor + 2)) === false) ||
        cursor === len - 1 ||
        isKana(input.charAt(cursor + 1))
      ) {
        // Don't transliterate this yet.
        kanaChar = chunk.charAt(0);
      }
    }

    // Use katakana if first letter in chunk is uppercase
    if (isCharUpperCase(chunk.charAt(0))) {
      kanaChar = hiraganaToKatakana(kanaChar);
    }

    const nextCursor = cursor + (chunkSize || 1);
    kana.push([cursor, nextCursor, kanaChar]);
    cursor = nextCursor;
  }
  return kana;
}

export default toKana;
