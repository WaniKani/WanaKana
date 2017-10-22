import {
  DEFAULT_OPTIONS,
} from './constants';

import isCharUpperCase from './utils/isCharUpperCase';
import hiraganaToKatakana from './utils/hiraganaToKatakana';
import isRomaji from './isRomaji';
import {
  getRomajiToKanaTree,
  IME_MODE_MAP,
  USE_OBSOLETE_KANA_MAP } from './kanaMapping';

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
  return splitIntoKana(input, options).map((kanaToken) => kanaToken[2]).join('');
}

export function splitIntoKana(input = '', options = {}) {
  const config = Object.assign({}, DEFAULT_OPTIONS, options);

  let map = getRomajiToKanaTree();
  map = config.IMEMode? IME_MODE_MAP(map): map;
  map = config.useObsoleteKana? USE_OBSOLETE_KANA_MAP(map): map;
  map = config.customKanaMapping(map);
  const root = map;

  function parse(tree, remaining, lastCursor, currentLength, convertToKatakana) {
    const currentCursor = lastCursor + currentLength;
    // the string you would get if you stopped the tree traversal right here
    const treeString = tree[''] || '';
    // this variable will only used if there are no more characters to consume
    const committed = [lastCursor, currentCursor, convertToKatakana? hiraganaToKatakana(treeString): treeString];

    if (!remaining) {  // nothing more to consume, just commit the last chunk and return it
      return [committed];
    }

    const nextChar = remaining.charAt(0);
    const convertToKata = !options.ignoreCase && isCharUpperCase(nextChar);
    const subTree = tree[nextChar.toLowerCase()];

    if (subTree === undefined) {  // the next char is not a continuation of this tree
      // the next tree is guaranteed to have an '' element, which is going to be the raw input char if there is no corresponding kana;
      // since we want to start a new run here, we start from root again
      const nextTree = Object.assign({ '': nextChar }, root[nextChar.toLowerCase()]);
      const nextRemaining = remaining.slice(1);
      // only commit, when there is an actual run to commit (so you don't end up with something like [0, 0, undefined])
      if (currentLength > 0) {
        // convert n in IME mode
        if (!!options.IMEMode && isRomaji(nextChar)) {
          if (committed[2].toLowerCase() === 'n') {
            committed[2] = convertToKatakana? 'ン': 'ん';
            // convert 'nn' to a single kana character
            if (nextChar.toLowerCase() === 'n') {
              return [committed].concat(parse(nextTree, nextRemaining.slice(1), currentCursor+1, 1, convertToKata));
            }
          }
        }
        return [committed].concat(parse(nextTree, nextRemaining, currentCursor, 1, convertToKata));
      }
      return parse(nextTree, nextRemaining, currentCursor, 1, convertToKata);
    }
    // if the run keeps going, we need to store the string from the run so far and the next char appended to it
    return parse(Object.assign({ '': treeString + nextChar }, subTree), remaining.slice(1), lastCursor, currentLength + 1, convertToKatakana === undefined? convertToKata: convertToKatakana);
  }
  return parse(root, input, 0, 0);
}

export default toKana;
