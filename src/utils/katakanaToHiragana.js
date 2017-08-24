import {
  LONG_VOWELS,
  KATAKANA_START,
  HIRAGANA_START,
  TO_ROMAJI,
} from '../constants';

import isCharLongDash from './isCharLongDash';
import isCharSlashDot from './isCharSlashDot';
import isCharKatakana from './isCharKatakana';

/**
 * Convert [Katakana](https://en.wikipedia.org/wiki/Katakana) to [Hiragana](https://en.wikipedia.org/wiki/Hiragana)
 * Passes through any non-katakana chars
 * @param  {String} [input=''] text input
 * @return {String} converted text
 * @example
 * katakanaToHiragana('カタカナ')
 * // => "かたかな"
 * katakanaToHiragana('カタカナ is a type of kana')
 * // => "かたかな is a type of kana"
 * @ignore
 */
function katakanaToHiragana(input = '') {
  const hira = [];
  let previousKana = '';
  const iterable = input.split('');
  for (let index = 0; index < iterable.length; index += 1) {
    const char = iterable[index];
    const [slashDot, longDash] = [isCharSlashDot(char), isCharLongDash(char)];
    // Short circuit to avoid incorrect codeshift for 'ー' and '・'
    if (slashDot || (longDash && index < 1)) {
      hira.push(char);
      // Transform long vowels: 'オー' to 'おう'
    } else if (previousKana && longDash && index > 0) {
      // Transform previousKana back to romaji, and slice off the vowel
      const romaji = TO_ROMAJI[previousKana].slice(-1);
      hira.push(LONG_VOWELS[romaji]);
    } else if (!longDash && isCharKatakana(char)) {
      // Shift charcode.
      const code = char.charCodeAt(0) + (HIRAGANA_START - KATAKANA_START);
      const hiraChar = String.fromCharCode(code);
      hira.push(hiraChar);
      previousKana = hiraChar;
    } else {
      // Pass non katakana chars through
      hira.push(char);
      previousKana = '';
    }
  }
  return hira.join('');
}

export default katakanaToHiragana;
