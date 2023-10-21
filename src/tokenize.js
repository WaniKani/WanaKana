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

const TOKEN_TYPES = {
  EN: 'en',
  JA: 'ja',
  EN_NUM: 'englishNumeral',
  JA_NUM: 'japaneseNumeral',
  EN_PUNC: 'englishPunctuation',
  JA_PUNC: 'japanesePunctuation',
  KANJI: 'kanji',
  HIRAGANA: 'hiragana',
  KATAKANA: 'katakana',
  SPACE: 'space',
  OTHER: 'other',
};

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

/**
 * Splits input into array of strings separated by opinionated token types
 * `'en', 'ja', 'englishNumeral', 'japaneseNumeral','englishPunctuation', 'japanesePunctuation','kanji', 'hiragana', 'katakana', 'space', 'other'`.
 * If `{ compact: true }` then many same-language tokens are combined (spaces + text, kanji + kana, numeral + punctuation).
 * If `{ detailed: true }` then return array will contain `{ type, value }` instead of `'value'`
 * @param  {string} input text
 * @param  {{compact?: boolean, detailed?: boolean}} [options={ compact: false, detailed: false}] options to modify output style
 * @return {string[]|{type: string, value: string}[]} text split into tokens containing values, or detailed object
 * @example
 * tokenize('ふふフフ')
 * // ['ふふ', 'フフ']
 *
 * tokenize('感じ')
 * // ['感', 'じ']
 *
 * tokenize('人々')
 * // ['人々']
 *
 * tokenize('truly 私は悲しい')
 * // ['truly', ' ', '私', 'は', '悲', 'しい']
 *
 * tokenize('truly 私は悲しい', { compact: true })
 * // ['truly ', '私は悲しい']
 *
 * tokenize('5romaji here...!?人々漢字ひらがなカタ　カナ４「ＳＨＩＯ」。！')
 * // [ '5', 'romaji', ' ', 'here', '...!?', '人々漢字', 'ひらがな', 'カタ', '　', 'カナ', '４', '「', 'ＳＨＩＯ', '」。！']
 *
 * tokenize('5romaji here...!?人々漢字ひらがなカタ　カナ４「ＳＨＩＯ」。！', { compact: true })
 * // [ '5', 'romaji here', '...!?', '人々漢字ひらがなカタ　カナ', '４「', 'ＳＨＩＯ', '」。！']
 *
 * tokenize('5romaji here...!?人々漢字ひらがなカタ　カナ４「ＳＨＩＯ」。！ لنذهب', { detailed: true })
 * // [
 *  { type: 'englishNumeral', value: '5' },
 *  { type: 'en', value: 'romaji' },
 *  { type: 'space', value: ' ' },
 *  { type: 'en', value: 'here' },
 *  { type: 'englishPunctuation', value: '...!?' },
 *  { type: 'kanji', value: '人々漢字' },
 *  { type: 'hiragana', value: 'ひらがな' },
 *  { type: 'katakana', value: 'カタ' },
 *  { type: 'space', value: '　' },
 *  { type: 'katakana', value: 'カナ' },
 *  { type: 'japaneseNumeral', value: '４' },
 *  { type: 'japanesePunctuation', value: '「' },
 *  { type: 'ja', value: 'ＳＨＩＯ' },
 *  { type: 'japanesePunctuation', value: '」。！' },
 *  { type: 'space', value: ' ' },
 *  { type: 'other', value: 'لنذهب' },
 * ]
 *
 * tokenize('5romaji here...!?人々漢字ひらがなカタ　カナ４「ＳＨＩＯ」。！ لنذهب', { compact: true, detailed: true})
 * // [
 *  { type: 'other', value: '5' },
 *  { type: 'en', value: 'romaji here' },
 *  { type: 'other', value: '...!?' },
 *  { type: 'ja', value: '人々漢字ひらがなカタ　カナ' },
 *  { type: 'other', value: '４「' },
 *  { type: 'ja', value: 'ＳＨＩＯ' },
 *  { type: 'other', value: '」。！' },
 *  { type: 'en', value: ' ' },
 *  { type: 'other', value: 'لنذهب' },
 *]
 */
function tokenize(input, { compact = false, detailed = false } = {}) {
  if (input == null || isEmpty(input)) {
    return [];
  }
  const chars = [...input];
  let initial = chars.shift();
  let prevType = getType(initial, compact);
  initial = detailed ? { type: prevType, value: initial } : initial;

  const result = chars.reduce(
    (tokens, char) => {
      const currType = getType(char, compact);
      const sameType = currType === prevType;
      prevType = currType;
      let newValue = char;

      if (sameType) {
        newValue = (detailed ? tokens.pop().value : tokens.pop()) + newValue;
      }

      return detailed
        ? tokens.concat({ type: currType, value: newValue })
        : tokens.concat(newValue);
    },
    [initial]
  );
  return result;
}

export default tokenize;
