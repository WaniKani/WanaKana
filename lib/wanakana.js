var wanakana;

wanakana = wanakana || {};

if (typeof define === "function" && define.amd) {
  define("wanakana", [], function() {
    return wanakana;
  });
}

wanakana.LOWERCASE_START = 0x61;

wanakana.LOWERCASE_END = 0x7A;

wanakana.UPPERCASE_START = 0x41;

wanakana.UPPERCASE_END = 0x5A;

wanakana.HIRAGANA_START = 0x3041;

wanakana.HIRAGANA_END = 0x3096;

wanakana.KATAKANA_START = 0x30A1;

wanakana.KATAKANA_END = 0x30FA;

wanakana.defaultOptions = {
  useObseleteKana: false,
  IMEMode: false
};

/**
 * Takes an array of values and a function. The funciton is called with each value.
 * If the function returns true every time, the result will be true. Otherwise, false.
*/


wanakana._allTrue = function(arr, func) {
  var val, _i, _len;
  for (_i = 0, _len = arr.length; _i < _len; _i++) {
    val = arr[_i];
    if (func(val) === false) {
      return false;
    }
  }
  return true;
};

/**
 * Takes a character and a unicode range. Returns true if the char is in the range.
*/


wanakana._isCharInRange = function(char, start, end) {
  var code;
  code = char.charCodeAt(0);
  return (start <= code && code <= end);
};

wanakana._isCharVowel = function(char, includeY) {
  var regexp;
  if (includeY == null) {
    includeY = true;
  }
  regexp = includeY ? /[aeiouy]/ : /[aeiou]/;
  return char.toLowerCase().charAt(0).search(regexp) !== -1;
};

wanakana._isCharConsonant = function(char, includeY) {
  var regexp;
  if (includeY == null) {
    includeY = true;
  }
  regexp = includeY ? /[bcdfghjklmnpqrstvwxyz]/ : /[bcdfghjklmnpqrstvwxz]/;
  return char.toLowerCase().charAt(0).search(regexp) !== -1;
};

wanakana._isCharKatakana = function(char) {
  return wanakana._isCharInRange(char, wanakana.KATAKANA_START, wanakana.KATAKANA_END);
};

wanakana._isCharHiragana = function(char) {
  return wanakana._isCharInRange(char, wanakana.HIRAGANA_START, wanakana.HIRAGANA_END);
};

wanakana._isCharKana = function(char) {
  return wanakana._isCharHiragana(char) || wanakana._isCharKatakana(char);
};

wanakana._isCharNotKana = function(char) {
  return !wanakana._isCharHiragana(char) && !wanakana._isCharKatakana(char);
};

wanakana._katakanaToHiragana = function(kata) {
  var code, hira, hiraChar, kataChar, _i, _len, _ref;
  hira = [];
  _ref = kata.split("");
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    kataChar = _ref[_i];
    if (wanakana._isCharKatakana(kataChar)) {
      code = kataChar.charCodeAt(0);
      code += wanakana.HIRAGANA_START - wanakana.KATAKANA_START;
      hiraChar = String.fromCharCode(code);
      hira.push(hiraChar);
    } else {
      hira.push(kataChar);
    }
  }
  return hira.join("");
};

wanakana._hiraganaToKatakana = function(hira) {
  var code, hiraChar, kata, kataChar, _i, _len, _ref;
  kata = [];
  _ref = hira.split("");
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    hiraChar = _ref[_i];
    if (wanakana._isCharHiragana(hiraChar)) {
      code = hiraChar.charCodeAt(0);
      code += wanakana.KATAKANA_START - wanakana.HIRAGANA_START;
      kataChar = String.fromCharCode(code);
      kata.push(kataChar);
    } else {
      kata.push(hiraChar);
    }
  }
  return kata.join("");
};

wanakana._hiraganaToRomaji = function(hira) {
  var chunk, chunkSize, cursor, getChunk, len, maxChunk, nextCharIsDoubleConsonant, options, resetChunkSize, roma, romaChar;
  len = hira.length;
  roma = [];
  cursor = 0;
  chunkSize = 0;
  maxChunk = 2;
  getChunk = function() {
    return hira.substr(cursor, chunkSize);
  };
  resetChunkSize = function() {
    return chunkSize = Math.min(maxChunk, len - cursor);
  };
  while (cursor < len) {
    resetChunkSize();
    while (chunkSize > 0) {
      chunk = getChunk();
      if (wanakana.isKatakana(chunk)) {
        chunk = wanakana._katakanaToHiragana(chunk);
      }
      if (chunk.charAt(0) === "っ" && chunkSize === 1 && cursor < (len - 1)) {
        nextCharIsDoubleConsonant = true;
        romaChar = "";
        break;
      }
      romaChar = wanakana.J_to_R[chunk];
      if ((romaChar != null) && nextCharIsDoubleConsonant) {
        romaChar = romaChar.charAt(0).concat(romaChar);
        nextCharIsDoubleConsonant = false;
      }
      if (romaChar != null) {
        break;
      }
      chunkSize--;
    }
    if (romaChar == null) {
      romaChar = chunk;
    }
    if (typeof options === "undefined" || options === null) {
      options = wanakana.defaultOptions;
    }
    roma.push(romaChar);
    cursor += chunkSize || 1;
  }
  return roma.join("");
};

wanakana._romajiToHiragana = function(roma, options) {
  return wanakana._romajiToKana(roma, options, true);
};

wanakana._romajiToKana = function(roma, options, ignoreCase) {
  var chunk, chunkLC, chunkSize, cursor, getChunk, isCharUpperCase, kana, kanaChar, len, maxChunk;
  if (ignoreCase == null) {
    ignoreCase = false;
  }
  len = roma.length;
  kana = [];
  cursor = 0;
  maxChunk = 3;
  getChunk = function() {
    return roma.substr(cursor, chunkSize);
  };
  isCharUpperCase = function(char) {
    return wanakana._isCharInRange(char, wanakana.UPPERCASE_START, wanakana.UPPERCASE_END);
  };
  while (cursor < len) {
    chunkSize = Math.min(maxChunk, len - cursor);
    while (chunkSize > 0) {
      chunk = getChunk();
      chunkLC = chunk.toLowerCase();
      if (chunkLC === "lts" && (len - cursor) >= 4) {
        chunkSize++;
        chunk = getChunk();
        chunkLC = chunk.toLowerCase();
      }
      if (chunkLC.charAt(0) === "n") {
        if (wanakana._isCharConsonant(chunkLC.charAt(1), false) && wanakana._isCharVowel(chunkLC.charAt(2))) {
          chunkSize = 1;
          chunk = getChunk();
          chunkLC = chunk.toLowerCase();
        }
      }
      if (chunkLC.charAt(0) !== "n" && wanakana._isCharConsonant(chunkLC.charAt(0)) && chunk.charAt(0) === chunk.charAt(1)) {
        chunkSize = 1;
        chunkLC = chunk = "っ";
      }
      kanaChar = wanakana.R_to_J[chunkLC];
      if (kanaChar != null) {
        break;
      }
      chunkSize--;
    }
    if (kanaChar == null) {
      chunk = wanakana._convertPunctuation(chunk);
      kanaChar = chunk;
    }
    if (options == null) {
      options = wanakana.defaultOptions;
    }
    if (options != null ? options.useObseleteKana : void 0) {
      if (chunkLC === "wi") {
        kanaChar = "ゐ";
      }
      if (chunkLC === "we") {
        kanaChar = "ゑ";
      }
    }
    if ((options != null ? options.IMEMode : void 0) && chunkLC.charAt(0) === "n") {
      if ((roma.charAt(cursor + 1).toLowerCase() === "y" && cursor === (len - 2)) || cursor === (len - 1)) {
        kanaChar = chunk.charAt(0);
      }
    }
    if (!ignoreCase) {
      if (isCharUpperCase(chunk.charAt(0))) {
        kanaChar = wanakana._hiraganaToKatakana(kanaChar);
      }
    }
    kana.push(kanaChar);
    cursor += chunkSize || 1;
  }
  return kana.join("");
};

wanakana._convertPunctuation = function(input, options) {
  if (input === '　') {
    return ' ';
  }
  if (input === '-') {
    return 'ー';
  }
  return input;
};

/**
* Returns true if input is entirely hiragana.
*/


wanakana.isHiragana = function(input) {
  var chars;
  chars = input.split("");
  return wanakana._allTrue(chars, wanakana._isCharHiragana);
};

wanakana.isKatakana = function(input) {
  var chars;
  chars = input.split("");
  return wanakana._allTrue(chars, wanakana._isCharKatakana);
};

wanakana.isKana = function(input) {
  var chars;
  chars = input.split("");
  return wanakana._allTrue(chars, function(char) {
    return (wanakana.isHiragana(char)) || (wanakana.isKatakana(char));
  });
};

wanakana.isRomaji = function(input) {
  var chars;
  chars = input.split("");
  return wanakana._allTrue(chars, function(char) {
    return (!wanakana.isHiragana(char)) && (!wanakana.isKatakana(char));
  });
};

wanakana.toHiragana = function(input, options) {
  if (wanakana.isRomaji(input)) {
    return input = wanakana._romajiToHiragana(input, options);
  }
  if (wanakana.isKatakana(input)) {
    return input = wanakana._katakanaToHiragana(input, options);
  }
  return input;
};

wanakana.toKatakana = function(input, options) {
  if (wanakana.isHiragana(input)) {
    return input = wanakana._hiraganaToKatakana(input, options);
  }
  if (wanakana.isRomaji(input)) {
    input = wanakana._romajiToHiragana(input, options);
    return input = wanakana._hiraganaToKatakana(input, options);
  }
  return input;
};

wanakana.toKana = function(input, options) {
  return input = wanakana._romajiToKana(input, options);
};

wanakana.toRomaji = function(input, options) {
  return input = wanakana._hiraganaToRomaji(input);
};

wanakana.R_to_J = {
  a: 'あ',
  i: 'い',
  u: 'う',
  e: 'え',
  o: 'お',
  yi: 'い',
  wu: 'う',
  whu: 'う',
  xa: 'ぁ',
  xi: 'ぃ',
  xu: 'ぅ',
  xe: 'ぇ',
  xo: 'ぉ',
  xyi: 'ぃ',
  xye: 'ぇ',
  ye: 'いぇ',
  wha: 'うぁ',
  whi: 'うぃ',
  whe: 'うぇ',
  who: 'うぉ',
  wi: 'うぃ',
  we: 'うぇ',
  va: 'ゔぁ',
  vi: 'ゔぃ',
  vu: 'ゔ',
  ve: 'ゔぇ',
  vo: 'ゔぉ',
  vya: 'ゔゃ',
  vyi: 'ゔぃ',
  vyu: 'ゔゅ',
  vye: 'ゔぇ',
  vyo: 'ゔょ',
  ka: 'か',
  ki: 'き',
  ku: 'く',
  ke: 'け',
  ko: 'こ',
  lka: 'ヵ',
  lke: 'ヶ',
  xka: 'ヵ',
  xke: 'ヶ',
  kya: 'きゃ',
  kyi: 'きぃ',
  kyu: 'きゅ',
  kye: 'きぇ',
  kyo: 'きょ',
  qya: 'くゃ',
  qyu: 'くゅ',
  qyo: 'くょ',
  qwa: 'くぁ',
  qwi: 'くぃ',
  qwu: 'くぅ',
  qwe: 'くぇ',
  qwo: 'くぉ',
  qa: 'くぁ',
  qi: 'くぃ',
  qe: 'くぇ',
  qo: 'くぉ',
  kwa: 'くぁ',
  qyi: 'くぃ',
  qye: 'くぇ',
  ga: 'が',
  gi: 'ぎ',
  gu: 'ぐ',
  ge: 'げ',
  go: 'ご',
  gya: 'ぎゃ',
  gyi: 'ぎぃ',
  gyu: 'ぎゅ',
  gye: 'ぎぇ',
  gyo: 'ぎょ',
  gwa: 'ぐぁ',
  gwi: 'ぐぃ',
  gwu: 'ぐぅ',
  gwe: 'ぐぇ',
  gwo: 'ぐぉ',
  sa: 'さ',
  si: 'し',
  shi: 'し',
  su: 'す',
  se: 'せ',
  so: 'そ',
  za: 'ざ',
  zi: 'じ',
  zu: 'ず',
  ze: 'ぜ',
  zo: 'ぞ',
  ji: 'じ',
  sya: 'しゃ',
  syi: 'しぃ',
  syu: 'しゅ',
  sye: 'しぇ',
  syo: 'しょ',
  sha: 'しゃ',
  shu: 'しゅ',
  she: 'しぇ',
  sho: 'しょ',
  swa: 'すぁ',
  swi: 'すぃ',
  swu: 'すぅ',
  swe: 'すぇ',
  swo: 'すぉ',
  zya: 'じゃ',
  zyi: 'じぃ',
  zyu: 'じゅ',
  zye: 'じぇ',
  zyo: 'じょ',
  ja: 'じゃ',
  ju: 'じゅ',
  je: 'じぇ',
  jo: 'じょ',
  jya: 'じゃ',
  jyi: 'じぃ',
  jyu: 'じゅ',
  jye: 'じぇ',
  jyo: 'じょ',
  ta: 'た',
  ti: 'ち',
  tu: 'つ',
  te: 'て',
  to: 'と',
  chi: 'ち',
  tsu: 'つ',
  ltu: 'っ',
  xtu: 'っ',
  tya: 'ちゃ',
  tyi: 'ちぃ',
  tyu: 'ちゅ',
  tye: 'ちぇ',
  tyo: 'ちょ',
  cha: 'ちゃ',
  chu: 'ちゅ',
  che: 'ちぇ',
  cho: 'ちょ',
  cya: 'ちゃ',
  cyi: 'ちぃ',
  cyu: 'ちゅ',
  cye: 'ちぇ',
  cyo: 'ちょ',
  tsa: 'つぁ',
  tsi: 'つぃ',
  tse: 'つぇ',
  tso: 'つぉ',
  tha: 'てゃ',
  thi: 'てぃ',
  thu: 'てゅ',
  the: 'てぇ',
  tho: 'てょ',
  twa: 'とぁ',
  twi: 'とぃ',
  twu: 'とぅ',
  twe: 'とぇ',
  two: 'とぉ',
  da: 'だ',
  di: 'ぢ',
  du: 'づ',
  de: 'で',
  "do": 'ど',
  dya: 'ぢゃ',
  dyi: 'ぢぃ',
  dyu: 'ぢゅ',
  dye: 'ぢぇ',
  dyo: 'ぢょ',
  dha: 'でゃ',
  dhi: 'でぃ',
  dhu: 'でゅ',
  dhe: 'でぇ',
  dho: 'でょ',
  dwa: 'どぁ',
  dwi: 'どぃ',
  dwu: 'どぅ',
  dwe: 'どぇ',
  dwo: 'どぉ',
  na: 'な',
  ni: 'に',
  nu: 'ぬ',
  ne: 'ね',
  no: 'の',
  nya: 'にゃ',
  nyi: 'にぃ',
  nyu: 'にゅ',
  nye: 'にぇ',
  nyo: 'にょ',
  ha: 'は',
  hi: 'ひ',
  hu: 'ふ',
  he: 'へ',
  ho: 'ほ',
  fu: 'ふ',
  hya: 'ひゃ',
  hyi: 'ひぃ',
  hyu: 'ひゅ',
  hye: 'ひぇ',
  hyo: 'ひょ',
  fya: 'ふゃ',
  fyu: 'ふゅ',
  fyo: 'ふょ',
  fwa: 'ふぁ',
  fwi: 'ふぃ',
  fwu: 'ふぅ',
  fwe: 'ふぇ',
  fwo: 'ふぉ',
  fa: 'ふぁ',
  fi: 'ふぃ',
  fe: 'ふぇ',
  fo: 'ふぉ',
  fyi: 'ふぃ',
  fye: 'ふぇ',
  ba: 'ば',
  bi: 'び',
  bu: 'ぶ',
  be: 'べ',
  bo: 'ぼ',
  bya: 'びゃ',
  byi: 'びぃ',
  byu: 'びゅ',
  bye: 'びぇ',
  byo: 'びょ',
  pa: 'ぱ',
  pi: 'ぴ',
  pu: 'ぷ',
  pe: 'ぺ',
  po: 'ぽ',
  pya: 'ぴゃ',
  pyi: 'ぴぃ',
  pyu: 'ぴゅ',
  pye: 'ぴぇ',
  pyo: 'ぴょ',
  ma: 'ま',
  mi: 'み',
  mu: 'む',
  me: 'め',
  mo: 'も',
  mya: 'みゃ',
  myi: 'みぃ',
  myu: 'みゅ',
  mye: 'みぇ',
  myo: 'みょ',
  ya: 'や',
  yu: 'ゆ',
  yo: 'よ',
  xya: 'ゃ',
  xyu: 'ゅ',
  xyo: 'ょ',
  ra: 'ら',
  ri: 'り',
  ru: 'る',
  re: 'れ',
  ro: 'ろ',
  rya: 'りゃ',
  ryi: 'りぃ',
  ryu: 'りゅ',
  rye: 'りぇ',
  ryo: 'りょ',
  la: 'ら',
  li: 'り',
  lu: 'る',
  le: 'れ',
  lo: 'ろ',
  lya: 'りゃ',
  lyi: 'りぃ',
  lyu: 'りゅ',
  lye: 'りぇ',
  lyo: 'りょ',
  wa: 'わ',
  wo: 'を',
  lwe: 'ゎ',
  xwa: 'ゎ',
  n: 'ん',
  nn: 'ん',
  'n ': 'ん',
  xn: 'ん',
  ltsu: 'っ'
};

wanakana.J_to_R = {
  あ: 'a',
  い: 'i',
  う: 'u',
  え: 'e',
  お: 'o',
  ゔぁ: 'va',
  ゔぃ: 'vi',
  ゔ: 'vu',
  ゔぇ: 've',
  ゔぉ: 'vo',
  か: 'ka',
  き: 'ki',
  きゃ: 'kya',
  きぃ: 'kyi',
  きゅ: 'kyu',
  く: 'ku',
  け: 'ke',
  こ: 'ko',
  が: 'ga',
  ぎ: 'gi',
  ぐ: 'gu',
  げ: 'ge',
  ご: 'go',
  ぎゃ: 'gya',
  ぎぃ: 'gyi',
  ぎゅ: 'gyu',
  ぎぇ: 'gye',
  ぎょ: 'gyo',
  さ: 'sa',
  す: 'su',
  せ: 'se',
  そ: 'so',
  ざ: 'za',
  ず: 'zu',
  ぜ: 'ze',
  ぞ: 'zo',
  し: 'shi',
  しゃ: 'sha',
  しゅ: 'shu',
  しょ: 'sho',
  じ: 'ji',
  じゃ: 'ja',
  じゅ: 'ju',
  じょ: 'jo',
  た: 'ta',
  ち: 'chi',
  ちゃ: 'cha',
  ちゅ: 'chu',
  ちょ: 'cho',
  つ: 'tsu',
  て: 'te',
  と: 'to',
  だ: 'da',
  ぢ: 'di',
  づ: 'du',
  で: 'de',
  ど: 'do',
  な: 'na',
  に: 'ni',
  にゃ: 'nya',
  にゅ: 'nyu',
  にょ: 'nyo',
  ぬ: 'nu',
  ね: 'ne',
  の: 'no',
  は: 'ha',
  ひ: 'hi',
  ふ: 'fu',
  へ: 'he',
  ほ: 'ho',
  ひゃ: 'hya',
  ひゅ: 'hyu',
  ひょ: 'hyo',
  ふぁ: 'fa',
  ふぃ: 'fi',
  ふぇ: 'fe',
  ふぉ: 'fo',
  ば: 'ba',
  び: 'bi',
  ぶ: 'bu',
  べ: 'be',
  ぼ: 'bo',
  びゃ: 'bya',
  びゅ: 'byu',
  びょ: 'byo',
  ぱ: 'pa',
  ぴ: 'pi',
  ぷ: 'pu',
  ぺ: 'pe',
  ぽ: 'po',
  ぴゃ: 'pya',
  ぴゅ: 'pyu',
  ぴょ: 'pyo',
  ま: 'ma',
  み: 'mi',
  む: 'mu',
  め: 'me',
  も: 'mo',
  みゃ: 'mya',
  みゅ: 'myu',
  みょ: 'myo',
  や: 'ya',
  ゆ: 'yu',
  よ: 'yo',
  ら: 'ra',
  り: 'ri',
  る: 'ru',
  れ: 're',
  ろ: 'ro',
  りゃ: 'rya',
  りゅ: 'ryu',
  りょ: 'ryo',
  わ: 'wa',
  を: 'wo',
  ん: 'n',
  ゐ: 'wi',
  ゑ: 'we',
  きぇ: 'kye',
  きょ: 'kyo',
  じぃ: 'jyi',
  じぇ: 'jye',
  ちぃ: 'cyi',
  ちぇ: 'che',
  ひぃ: 'hyi',
  ひぇ: 'hye',
  びぃ: 'byi',
  びぇ: 'bye',
  ぴぃ: 'pyi',
  ぴぇ: 'pye',
  みぇ: 'mye',
  みぃ: 'myi',
  りぃ: 'ryi',
  りぇ: 'rye',
  にぃ: 'nyi',
  にぇ: 'nye',
  しぃ: 'syi',
  しぇ: 'she',
  いぇ: 'ye',
  うぁ: 'wha',
  うぉ: 'who',
  うぃ: 'wi',
  うぇ: 'we',
  ゔゃ: 'vya',
  ゔゅ: 'vyu',
  ゔょ: 'vyo',
  すぁ: 'swa',
  すぃ: 'swi',
  すぅ: 'swu',
  すぇ: 'swe',
  すぉ: 'swo',
  くゃ: 'qya',
  くゅ: 'qyu',
  くょ: 'qyo',
  くぁ: 'qwa',
  くぃ: 'qwi',
  くぅ: 'qwu',
  くぇ: 'qwe',
  くぉ: 'qwo',
  ぐぁ: 'gwa',
  ぐぃ: 'gwi',
  ぐぅ: 'gwu',
  ぐぇ: 'gwe',
  ぐぉ: 'gwo',
  つぁ: 'tsa',
  つぃ: 'tsi',
  つぇ: 'tse',
  つぉ: 'tso',
  てゃ: 'tha',
  てぃ: 'thi',
  てゅ: 'thu',
  てぇ: 'the',
  てょ: 'tho',
  とぁ: 'twa',
  とぃ: 'twi',
  とぅ: 'twu',
  とぇ: 'twe',
  とぉ: 'two',
  ぢゃ: 'dya',
  ぢぃ: 'dyi',
  ぢゅ: 'dyu',
  ぢぇ: 'dye',
  ぢょ: 'dyo',
  でゃ: 'dha',
  でぃ: 'dhi',
  でゅ: 'dhu',
  でぇ: 'dhe',
  でょ: 'dho',
  どぁ: 'dwa',
  どぃ: 'dwi',
  どぅ: 'dwu',
  どぇ: 'dwe',
  どぉ: 'dwo',
  ふぅ: 'fwu',
  ふゃ: 'fya',
  ふゅ: 'fyu',
  ふょ: 'fyo',
  ぁ: 'a',
  ぃ: 'i',
  ぇ: 'e',
  ぅ: 'u',
  ぉ: 'o',
  ゃ: 'ya',
  ゅ: 'yu',
  ょ: 'yo',
  っ: '',
  ゕ: 'ka',
  ゖ: 'ka',
  ゎ: 'wa',
  '　': ' ',
  んあ: 'n\'a',
  んい: 'n\'i',
  んう: 'n\'u',
  んえ: 'n\'e',
  んお: 'n\'o',
  んや: 'n\'ya',
  んゆ: 'n\'yu',
  んよ: 'n\'yo'
};
