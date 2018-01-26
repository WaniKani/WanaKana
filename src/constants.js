/**
 * @typedef {Object} DefaultOptions
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
 * @property {Boolean} [IMEMode=false] - Set to true, 'toHiragana', or 'toKatakana' to handle conversion from a text input while it is being typed.
 * @property {String} [romanization='hepburn'] - choose toRomaji() romanization map (currently only hepburn)
 * @property {Object} [customKanaMapping={}] - custom map will be merged with default conversion
 * @example
 * toKana('WanaKana', { customKanaMapping: { na: 'に', ka: 'Bana' }) };
 * // => 'ワにBanaに'
 * @property {Object} [customRomajiMapping={}] - custom map will be merged with default conversion
 * @example
 * toRomaji('つじぎり', { customRomajiMapping: { じ: 'zi', つ: 'tu', り: 'li' }) };
 * // => 'tuzigili'
 */

export const TO_KANA_METHODS = {
  HIRAGANA: 'toHiragana',
  KATAKANA: 'toKatakana',
};

export const ROMANIZATIONS = Object.freeze({
  HEPBURN: 'hepburn',
});

/**
 * Default config for WanaKana, user passed options will be merged with this
 * @type {DefaultOptions}
 * @ignore
 */
export const DEFAULT_OPTIONS = {
  useObsoleteKana: false,
  passRomaji: false,
  upcaseKatakana: false,
  ignoreCase: false,
  IMEMode: false,
  romanization: ROMANIZATIONS.HEPBURN,
  customKanaMapping: {},
  customRomajiMapping: {},
};

// CharCode References
// http://www.rikai.com/library/kanjitables/kanji_codes.unicode.shtml
// http://unicode-table.com

const CJK_SYMBOLS_PUNCTUATION = [0x3000, 0x303f];
const KATAKANA_PUNCTUATION = [0x30fb, 0x30fc];
const HIRAGANA_CHARS = [0x3040, 0x309f];
const KATAKANA_CHARS = [0x30a0, 0x30ff];
const ZENKAKU_NUMBERS = [0xff10, 0xff19];
const ZENKAKU_PUNCTUATION_1 = [0xff01, 0xff0f];
const ZENKAKU_PUNCTUATION_2 = [0xff1a, 0xff1f];
const ZENKAKU_PUNCTUATION_3 = [0xff3b, 0xff3f];
const ZENKAKU_PUNCTUATION_4 = [0xff5b, 0xff60];
const ZENKAKU_SYMBOLS_CURRENCY = [0xffe0, 0xffee];
const KANA_PUNCTUATION = [0xff61, 0xff65];
const HANKAKU_KATAKANA = [0xff66, 0xff9f];
const COMMON_CJK = [0x4e00, 0x9fff];
const RARE_CJK = [0x3400, 0x4dbf];
const LATIN_NUMBERS = [0x0030, 0x0039];
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

// const FULL_LATIN_RANGES = [
//   [0x0001-0x007F],
//   [0x0080-0x00FF],
//   [0x0100-0x017F],
//   [0x0180-0x024F],
// ];

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

const KANA_RANGES = [HIRAGANA_CHARS, KATAKANA_CHARS, KANA_PUNCTUATION, HANKAKU_KATAKANA];

/**
 * All Japanese unicode start and end ranges
 * Includes full-width punctuation and number ranges.
 * Incudes latin numbers since they are used in Japanese text as well.
 * @type {Array}
 * @ignore
 */
export const JAPANESE_RANGES = [
  ...KANA_RANGES,
  ...JA_PUNCTUATION_RANGES,
  LATIN_NUMBERS,
  ZENKAKU_NUMBERS,
  COMMON_CJK,
  RARE_CJK,
];

/**
 * Basic Latin unicode regex, for determining Romaji + Hepburn romanisation
 * Includes upper/lowercase long vowels like "ā, ī, ū, ē, ō"
 * Includes smart quotes ‘’ “”
 * @type {Array}
 * @ignore
 */
export const ROMAJI_RANGES = [MODERN_ENGLISH, ...HEPBURN_MACRON_RANGES, ...SMART_QUOTE_RANGES];

export const EN_PUNCTUATION_RANGES = [
  [0x21, 0x2f],
  [0x3a, 0x3f],
  [0x5b, 0x60],
  [0x7b, 0x7e],
  ...SMART_QUOTE_RANGES,
];

export const LOWERCASE_START = 0x61;
export const LOWERCASE_END = 0x7a;
export const UPPERCASE_START = 0x41;
export const UPPERCASE_END = 0x5a;
export const LOWERCASE_FULLWIDTH_START = 0xff41;
export const LOWERCASE_FULLWIDTH_END = 0xff5a;
export const UPPERCASE_FULLWIDTH_START = 0xff21;
export const UPPERCASE_FULLWIDTH_END = 0xff3a;
export const HIRAGANA_START = 0x3041;
export const HIRAGANA_END = 0x3096;
export const KATAKANA_START = 0x30a1;
export const KATAKANA_END = 0x30fc;
export const KANJI_START = 0x4e00;
export const KANJI_END = 0x9faf;
export const PROLONGED_SOUND_MARK = 0x30fc;
export const KANA_SLASH_DOT = 0x30fb;

export const LONG_VOWELS = {
  a: 'あ',
  i: 'い',
  u: 'う',
  e: 'え',
  o: 'う',
};

export const TO_ROMAJI = {
  '　': ' ',
  '！': '!',
  '？': '?',
  '。': '.',
  '：': ':',
  '・': '/',
  '、': ',',
  '〜': '~',
  'ー': '-',
  '「': '‘',
  '」': '’',
  '『': '“',
  '』': '”',
  '［': '[',
  '］': ']',
  '（': '(',
  '）': ')',
  '｛': '{',
  '｝': '}',

  'あ': 'a',
  'い': 'i',
  'う': 'u',
  'え': 'e',
  'お': 'o',
  'ゔぁ': 'va',
  'ゔぃ': 'vi',
  'ゔ': 'vu',
  'ゔぇ': 've',
  'ゔぉ': 'vo',
  'か': 'ka',
  'き': 'ki',
  'きゃ': 'kya',
  'きぃ': 'kyi',
  'きゅ': 'kyu',
  'く': 'ku',
  'け': 'ke',
  'こ': 'ko',
  'が': 'ga',
  'ぎ': 'gi',
  'ぐ': 'gu',
  'げ': 'ge',
  'ご': 'go',
  'ぎゃ': 'gya',
  'ぎぃ': 'gyi',
  'ぎゅ': 'gyu',
  'ぎぇ': 'gye',
  'ぎょ': 'gyo',
  'さ': 'sa',
  'す': 'su',
  'せ': 'se',
  'そ': 'so',
  'ざ': 'za',
  'ず': 'zu',
  'ぜ': 'ze',
  'ぞ': 'zo',
  'し': 'shi',
  'しゃ': 'sha',
  'しゅ': 'shu',
  'しょ': 'sho',
  'じ': 'ji',
  'じゃ': 'ja',
  'じゅ': 'ju',
  'じょ': 'jo',
  'た': 'ta',
  'ち': 'chi',
  'ちゃ': 'cha',
  'ちゅ': 'chu',
  'ちょ': 'cho',
  'つ': 'tsu',
  'て': 'te',
  'と': 'to',
  'だ': 'da',
  'ぢ': 'di',
  'づ': 'du',
  'で': 'de',
  'ど': 'do',
  'な': 'na',
  'に': 'ni',
  'にゃ': 'nya',
  'にゅ': 'nyu',
  'にょ': 'nyo',
  'ぬ': 'nu',
  'ね': 'ne',
  'の': 'no',
  'は': 'ha',
  'ひ': 'hi',
  'ふ': 'fu',
  'へ': 'he',
  'ほ': 'ho',
  'ひゃ': 'hya',
  'ひゅ': 'hyu',
  'ひょ': 'hyo',
  'ふぁ': 'fa',
  'ふぃ': 'fi',
  'ふぇ': 'fe',
  'ふぉ': 'fo',
  'ば': 'ba',
  'び': 'bi',
  'ぶ': 'bu',
  'べ': 'be',
  'ぼ': 'bo',
  'びゃ': 'bya',
  'びゅ': 'byu',
  'びょ': 'byo',
  'ぱ': 'pa',
  'ぴ': 'pi',
  'ぷ': 'pu',
  'ぺ': 'pe',
  'ぽ': 'po',
  'ぴゃ': 'pya',
  'ぴゅ': 'pyu',
  'ぴょ': 'pyo',
  'ま': 'ma',
  'み': 'mi',
  'む': 'mu',
  'め': 'me',
  'も': 'mo',
  'みゃ': 'mya',
  'みゅ': 'myu',
  'みょ': 'myo',
  'や': 'ya',
  'ゆ': 'yu',
  'よ': 'yo',
  'ら': 'ra',
  'り': 'ri',
  'る': 'ru',
  'れ': 're',
  'ろ': 'ro',
  'りゃ': 'rya',
  'りゅ': 'ryu',
  'りょ': 'ryo',
  'わ': 'wa',
  'を': 'wo',
  'ん': 'n',

  // Archaic characters
  'ゐ': 'wi',
  'ゑ': 'we',

  // Uncommon character combos
  'きぇ': 'kye',
  'きょ': 'kyo',
  'じぃ': 'jyi',
  'じぇ': 'jye',
  'ちぃ': 'cyi',
  'ちぇ': 'che',
  'ひぃ': 'hyi',
  'ひぇ': 'hye',
  'びぃ': 'byi',
  'びぇ': 'bye',
  'ぴぃ': 'pyi',
  'ぴぇ': 'pye',
  'みぇ': 'mye',
  'みぃ': 'myi',
  'りぃ': 'ryi',
  'りぇ': 'rye',
  'にぃ': 'nyi',
  'にぇ': 'nye',
  'しぃ': 'syi',
  'しぇ': 'she',
  'いぇ': 'ye',
  'うぁ': 'wha',
  'うぉ': 'who',
  'うぃ': 'wi',
  'うぇ': 'we',
  'ゔゃ': 'vya',
  'ゔゅ': 'vyu',
  'ゔょ': 'vyo',
  'すぁ': 'swa',
  'すぃ': 'swi',
  'すぅ': 'swu',
  'すぇ': 'swe',
  'すぉ': 'swo',
  'くゃ': 'qya',
  'くゅ': 'qyu',
  'くょ': 'qyo',
  'くぁ': 'qwa',
  'くぃ': 'qwi',
  'くぅ': 'qwu',
  'くぇ': 'qwe',
  'くぉ': 'qwo',
  'ぐぁ': 'gwa',
  'ぐぃ': 'gwi',
  'ぐぅ': 'gwu',
  'ぐぇ': 'gwe',
  'ぐぉ': 'gwo',
  'つぁ': 'tsa',
  'つぃ': 'tsi',
  'つぇ': 'tse',
  'つぉ': 'tso',
  'てゃ': 'tha',
  'てぃ': 'thi',
  'てゅ': 'thu',
  'てぇ': 'the',
  'てょ': 'tho',
  'とぁ': 'twa',
  'とぃ': 'twi',
  'とぅ': 'twu',
  'とぇ': 'twe',
  'とぉ': 'two',
  'ぢゃ': 'dya',
  'ぢぃ': 'dyi',
  'ぢゅ': 'dyu',
  'ぢぇ': 'dye',
  'ぢょ': 'dyo',
  'でゃ': 'dha',
  'でぃ': 'dhi',
  'でゅ': 'dhu',
  'でぇ': 'dhe',
  'でょ': 'dho',
  'どぁ': 'dwa',
  'どぃ': 'dwi',
  'どぅ': 'dwu',
  'どぇ': 'dwe',
  'どぉ': 'dwo',
  'ふぅ': 'fwu',
  'ふゃ': 'fya',
  'ふゅ': 'fyu',
  'ふょ': 'fyo',

  //  Small Characters (normally not transliterated alone)
  'ぁ': 'a',
  'ぃ': 'i',
  'ぇ': 'e',
  'ぅ': 'u',
  'ぉ': 'o',
  'ゃ': 'ya',
  'ゅ': 'yu',
  'ょ': 'yo',
  'っ': '',
  'ゕ': 'ka',
  'ゖ': 'ka',
  'ゎ': 'wa',

  // Ambiguous consonant vowel pairs
  'んあ': "n'a",
  'んい': "n'i",
  'んう': "n'u",
  'んえ': "n'e",
  'んお': "n'o",
  'んや': "n'ya",
  'んゆ': "n'yu",
  'んよ': "n'yo",
};
