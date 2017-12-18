import toKana from '../toKana';

/**
 * Convert [Romaji](https://en.wikipedia.org/wiki/Romaji) to [Hiragana](https://en.wikipedia.org/wiki/Hiragana)
 * @param  {String} [input=''] text
 * @param  {Object} options used internally to pass along default options
 * @return {String} converted text
 * @example
 * romajiToHiragana('hiragana')
 * // => "ひらがな"
 * @ignore
 */
function romajiToHiragana(input = '', options = {}) {
  const text = input.toLowerCase(); // ensure hiragana
  return toKana(text, options);
}

export default romajiToHiragana;
