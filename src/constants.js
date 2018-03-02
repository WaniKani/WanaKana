export const VERSION = '3.1.0-rc.4';

export const TO_KANA_METHODS = {
  HIRAGANA: 'toHiragana',
  KATAKANA: 'toKatakana',
};

export const ROMANIZATIONS = {
  HEPBURN: 'hepburn',
};

/**
 * Default config for WanaKana, user passed options will be merged with these
 * @type {DefaultOptions}
 * @name defaultOptions
 * @property {Boolean} [useObsoleteKana=false] - Set to true to use obsolete characters, such as ゐ and ゑ.
 * @example
 * toHiragana('we', { useObsoleteKana: true })
 * // => 'ゑ'
 * @property {Boolean} [passRomaji=false] - Set to true to pass romaji when using mixed syllabaries with toKatakana() or toHiragana()
 * @example
 * toHiragana('only convert the katakana: ヒラガナ', { passRomaji: true })
 * // => "only convert the katakana: ひらがな"
 * @property {Boolean} [upcaseKatakana=false] - Set to true to convert katakana to uppercase using toRomaji()
 * @example
 * toRomaji('ひらがな カタカナ', { upcaseKatakana: true })
 * // => "hiragana KATAKANA"
 * @property {Boolean|String} [IMEMode=false] - Set to true, 'toHiragana', or 'toKatakana' to handle conversion while it is being typed.
 * @property {String} [romanization='hepburn'] - choose toRomaji() romanization map (currently only 'hepburn')
 * @property {Object} [customKanaMapping] - custom map will be merged with default conversion
 * @example
 * toKana('wanakana', { customKanaMapping: { na: 'に', ka: 'Bana' }) };
 * // => 'わにBanaに'
 * @property {Object} [customRomajiMapping] - custom map will be merged with default conversion
 * @example
 * toRomaji('つじぎり', { customRomajiMapping: { じ: 'zi', つ: 'tu', り: 'li' }) };
 * // => 'tuzigili'
 */
export const DEFAULT_OPTIONS = {
  useObsoleteKana: false,
  passRomaji: false,
  upcaseKatakana: false,
  ignoreCase: false,
  IMEMode: false,
  romanization: ROMANIZATIONS.HEPBURN,
};

// CharCode References
// http://www.rikai.com/library/kanjitables/kanji_codes.unicode.shtml
// http://unicode-table.com

export const LATIN_LOWERCASE_START = 0x61;
export const LATIN_LOWERCASE_END = 0x7a;
export const LATIN_UPPERCASE_START = 0x41;
export const LATIN_UPPERCASE_END = 0x5a;
export const LOWERCASE_ZENKAKU_START = 0xff41;
export const LOWERCASE_ZENKAKU_END = 0xff5a;
export const UPPERCASE_ZENKAKU_START = 0xff21;
export const UPPERCASE_ZENKAKU_END = 0xff3a;
export const HIRAGANA_START = 0x3041;
export const HIRAGANA_END = 0x3096;
export const KATAKANA_START = 0x30a1;
export const KATAKANA_END = 0x30fc;
export const KANJI_START = 0x4e00;
export const KANJI_END = 0x9faf;
export const PROLONGED_SOUND_MARK = 0x30fc;
export const KANA_SLASH_DOT = 0x30fb;

const ZENKAKU_NUMBERS = [0xff10, 0xff19];
const ZENKAKU_UPPERCASE = [UPPERCASE_ZENKAKU_START, UPPERCASE_ZENKAKU_END];
const ZENKAKU_LOWERCASE = [LOWERCASE_ZENKAKU_START, LOWERCASE_ZENKAKU_END];
const ZENKAKU_PUNCTUATION_1 = [0xff01, 0xff0f];
const ZENKAKU_PUNCTUATION_2 = [0xff1a, 0xff1f];
const ZENKAKU_PUNCTUATION_3 = [0xff3b, 0xff3f];
const ZENKAKU_PUNCTUATION_4 = [0xff5b, 0xff60];
const ZENKAKU_SYMBOLS_CURRENCY = [0xffe0, 0xffee];

const HIRAGANA_CHARS = [0x3040, 0x309f];
const KATAKANA_CHARS = [0x30a0, 0x30ff];
const HANKAKU_KATAKANA = [0xff66, 0xff9f];
const KATAKANA_PUNCTUATION = [0x30fb, 0x30fc];
const KANA_PUNCTUATION = [0xff61, 0xff65];
const CJK_SYMBOLS_PUNCTUATION = [0x3000, 0x303f];
const COMMON_CJK = [0x4e00, 0x9fff];
const RARE_CJK = [0x3400, 0x4dbf];

export const KANA_RANGES = [HIRAGANA_CHARS, KATAKANA_CHARS, KANA_PUNCTUATION, HANKAKU_KATAKANA];

export const JA_PUNCTUATION_RANGES = [
  CJK_SYMBOLS_PUNCTUATION,
  KANA_PUNCTUATION,
  KATAKANA_PUNCTUATION,
  ZENKAKU_PUNCTUATION_1,
  ZENKAKU_PUNCTUATION_2,
  ZENKAKU_PUNCTUATION_3,
  ZENKAKU_PUNCTUATION_4,
  ZENKAKU_SYMBOLS_CURRENCY,
];

// All Japanese unicode start and end ranges
// Includes kanji, kana, zenkaku latin chars, punctuation, and number ranges.
export const JAPANESE_RANGES = [
  ...KANA_RANGES,
  ...JA_PUNCTUATION_RANGES,
  ZENKAKU_UPPERCASE,
  ZENKAKU_LOWERCASE,
  ZENKAKU_NUMBERS,
  COMMON_CJK,
  RARE_CJK,
];

const MODERN_ENGLISH = [0x0000, 0x007f];
const HEPBURN_MACRON_RANGES = [
  [0x0100, 0x0101], // Ā ā
  [0x0112, 0x0113], // Ē ē
  [0x012a, 0x012b], // Ī ī
  [0x014c, 0x014d], // Ō ō
  [0x016a, 0x016b], // Ū ū
];
const SMART_QUOTE_RANGES = [
  [0x2018, 0x2019], // ‘ ’
  [0x201c, 0x201d], // “ ”
];

export const ROMAJI_RANGES = [MODERN_ENGLISH, ...HEPBURN_MACRON_RANGES];

export const EN_PUNCTUATION_RANGES = [
  [0x20, 0x2f],
  [0x3a, 0x3f],
  [0x5b, 0x60],
  [0x7b, 0x7e],
  ...SMART_QUOTE_RANGES,
];
