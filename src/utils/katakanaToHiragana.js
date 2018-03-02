import { KATAKANA_START, HIRAGANA_START } from '../constants';

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

// inject toRomaji to avoid circular dependency between toRomaji <-> katakanaToHiragana
function katakanaToHiragana(input = '', toRomaji, isDestinationRomaji) {
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
        // However, ensure 'オー' => 'おお' => 'oo' if this is a transform on the way to romaji
        if (isCharKatakana(input[index - 1]) && romaji === 'o' && isDestinationRomaji) {
          return hira.concat('お');
        }
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
