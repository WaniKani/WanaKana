import isJapanese from './isJapanese';
import isKana from './isKana';
import isKanji from './isKanji';
import tokenize from './tokenize';

const isLeadingWithoutInitialKana = (input, leading) => leading && !isKana(input[0]);
const isTrailingWithoutFinalKana = (input, leading) => !leading && !isKana(input[input.length - 1]);
const isInvalidMatcher = (input, matchKanji) =>
  (matchKanji && ![...matchKanji].some(isKanji)) || (!matchKanji && isKana(input));

/**
 * Strips [Okurigana](https://en.wikipedia.org/wiki/Okurigana)
 * @param  {String} input text
 * @param  {{ leading: Boolean | undefined, matchKanji: string | undefined }} [options={ leading: false, matchKanji: '' }] optional config
 * @return {String} text with okurigana removed
 * @example
 * stripOkurigana('踏み込む')
 * // => '踏み込'
 * stripOkurigana('お祝い')
 * // => 'お祝'
 * stripOkurigana('お腹', { leading: true });
 * // => '腹'
 * stripOkurigana('ふみこむ', { matchKanji: '踏み込む' });
 * // => 'ふみこ'
 * stripOkurigana('おみまい', { matchKanji: 'お祝い', leading: true });
 * // => 'みまい'
 */
function stripOkurigana(input = '', { leading = false, matchKanji = '' } = {}) {
  if (
    !isJapanese(input) ||
    isLeadingWithoutInitialKana(input, leading) ||
    isTrailingWithoutFinalKana(input, leading) ||
    isInvalidMatcher(input, matchKanji)
  ) {
    return input;
  }

  const chars = matchKanji || input;
  const okuriganaRegex = new RegExp(
    leading ? `^${tokenize(chars).shift()}` : `${tokenize(chars).pop()}$`
  );
  return input.replace(okuriganaRegex, '');
}

export default stripOkurigana;
