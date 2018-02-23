import { KATAKANA_START, HIRAGANA_START } from '../constants';
import toRomaji from '../toRomaji';

import isCharLongDash from './isCharLongDash';
import isCharSlashDot from './isCharSlashDot';
import isCharKatakana from './isCharKatakana';
const isCharInitialLongDash = (char, index) => isCharLongDash(char) && index < 1;
const isCharInnerLongDash = (char, index) => isCharLongDash(char) && index > 0;
const isKanaAsSymbol = (char) => ['ヶ', 'ヵ'].includes(char);
const LONG_VOWELS = {
  a: 'あ',
  i: 'い',
  u: 'う',
  e: 'え',
  o: 'う',
};

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
  let previousKana = '';

  return input
    .split('')
    .reduce((hira, char, index) => {
      // Short circuit to avoid incorrect codeshift for 'ー' and '・'
      if (isCharSlashDot(char) || isCharInitialLongDash(char, index) || isKanaAsSymbol(char)) {
        return hira.concat(char);
        // Transform long vowels: 'オー' to 'おう'
      } else if (previousKana && isCharInnerLongDash(char, index)) {
        // Transform previousKana back to romaji, and slice off the vowel
        const romaji = toRomaji(previousKana).slice(-1);
        return hira.concat(LONG_VOWELS[romaji]);
      } else if (!isCharLongDash(char) && isCharKatakana(char)) {
        // Shift charcode.
        const code = char.charCodeAt(0) + (HIRAGANA_START - KATAKANA_START);
        const hiraChar = String.fromCharCode(code);
        previousKana = hiraChar;
        return hira.concat(hiraChar);
      }
      // Pass non katakana chars through
      previousKana = '';
      return hira.concat(char);
    }, [])
    .join('');
}

export default katakanaToHiragana;
