import isEmpty from './utils/isEmpty';
import isCharKana from './utils/isCharKana';
import isCharPunctuation from './utils/isCharPunctuation';
import isJapanese from './isJapanese';
import isKana from './isKana';
import isKanji from './isKanji';

/**
 * Strips trailing [Okurigana](https://en.wikipedia.org/wiki/Okurigana) if `input` is a mix of [Kanji](https://en.wikipedia.org/wiki/Kanji) and [Kana](https://en.wikipedia.org/wiki/Kana)
 * @param  {String} input text
 * @param  {Object} [options={ all: false }] config object specifying if *all* kana should be removed, not just trailing okurigana
 * @return {String} text with okurigana removed
 * @example
 * stripOkurigana('踏み込む')
 * // => '踏み込'
 * stripOkurigana('粘り。')
 * // => '粘。'
 * stripOkurigana('お祝い')
 * // => 'お祝'
 * stripOkurigana('踏み込む', { all: true })
 * // => '踏込'
 * stripOkurigana('お祝い', { all: true })
 * // => '祝'
 */
function stripOkurigana(input = '', options = { all: false }) {
  if (isEmpty(input) || !isJapanese(input) || isKana(input)) return input;
  const chars = [...input];

  // strip every kana
  if (options.all) return chars.filter((char) => !isCharKana(char)).join('');

  // strip trailing only
  const reverseChars = chars.reverse();
  for (let i = 0, len = reverseChars.length; i < len; i += 1) {
    const char = reverseChars[i];
    // pass if it's punctuation
    if (isCharPunctuation(char)) {
      continue; // eslint-disable-line no-continue
    }
    // blank out if not kanji
    if (!isKanji(char)) {
      reverseChars[i] = '';
    } else {
      break; // stop when we hit a kanji char
    }
  }

  return reverseChars.reverse().join('');
}

export default stripOkurigana;
