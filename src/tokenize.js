import { TOKEN_TYPES } from './constants';
import isEmpty from './utils/isEmpty';
import isCharEnglishPunctuation from './utils/isCharEnglishPunctuation';
import isCharJapanesePunctuation from './utils/isCharJapanesePunctuation';
import isCharRomaji from './utils/isCharRomaji';
import isCharKanji from './utils/isCharKanji';
import isCharHiragana from './utils/isCharHiragana';
import isCharKatakana from './utils/isCharKatakana';
import isCharJapanese from './utils/isCharJapanese';

const isCharEnSpace = (x) => x === ' ';
const isCharJaSpace = (x) => x === '　';
const isCharJaNum = (x) => /[０-９]/.test(x);
const isCharEnNum = (x) => /[0-9]/.test(x);

// prettier-ignore
export function getType(input, compact = false) {
  const {
    EN, JA, EN_NUM, JA_NUM, EN_PUNC, JA_PUNC, KANJI, HIRAGANA, KATAKANA, SPACE, OTHER,
  } = TOKEN_TYPES;

  if (compact) {
    switch (true) {
      case isCharJaNum(input): return OTHER;
      case isCharEnNum(input): return OTHER;
      case isCharEnSpace(input): return EN;
      case isCharEnglishPunctuation(input): return OTHER;
      case isCharJaSpace(input): return JA;
      case isCharJapanesePunctuation(input): return OTHER;
      case isCharJapanese(input): return JA;
      case isCharRomaji(input): return EN;
      default: return OTHER;
    }
  } else {
    switch (true) {
      case isCharJaSpace(input): return SPACE;
      case isCharEnSpace(input): return SPACE;
      case isCharJaNum(input): return JA_NUM;
      case isCharEnNum(input): return EN_NUM;
      case isCharEnglishPunctuation(input): return EN_PUNC;
      case isCharJapanesePunctuation(input): return JA_PUNC;
      case isCharKanji(input): return KANJI;
      case isCharHiragana(input): return HIRAGANA;
      case isCharKatakana(input): return KATAKANA;
      case isCharJapanese(input): return JA;
      case isCharRomaji(input): return EN;
      default: return OTHER;
    }
  }
}

// FIXME: UPDATE DOCS && TESTS!
/**
 * Splits input into array of [Kanji](https://en.wikipedia.org/wiki/Kanji), [Hiragana](https://en.wikipedia.org/wiki/Hiragana), [Katakana](https://en.wikipedia.org/wiki/Katakana), and [Romaji](https://en.wikipedia.org/wiki/Romaji) tokens.
 * Does not split into parts of speech!
 * @param  {String} input text
 * @return {Array} text split into tokens
 * @example
 * tokenize('ふふフフ')
 * // => ['ふふ', 'フフ']
 * tokenize('感じ')
 * // => ['感', 'じ']
 * tokenize('私は悲しい')
 * // => ['私', 'は', '悲', 'しい']
 * tokenize('what the...私は「悲しい」。')
 * // => ['what the...', '私', 'は', '「', '悲', 'しい', '」。']
 */
function tokenize(input, { compact = false, detailed = false } = {}) {
  if (input == null || isEmpty(input)) {
    return [];
  }
  const chars = [...input];
  const head = chars.shift();
  let prevType = getType(head, compact);

  let result = chars.reduce(
    (tokens, char) => {
      const currType = getType(char, compact);
      const sameType = currType === prevType;
      prevType = getType(char, compact);
      if (sameType) {
        const prev = tokens.pop();
        return tokens.concat(prev.concat(char));
      }
      return tokens.concat(char);
    },
    [head]
  );

  if (detailed) {
    result = result.map((text) => ({ type: getType(text, compact), value: text }));
  }
  return result;
}

export default tokenize;
