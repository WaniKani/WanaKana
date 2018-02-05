(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.wanakana = {})));
}(this, (function (exports) { 'use strict';

var VERSION = '3.0.1';

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

var TO_KANA_METHODS = {
  HIRAGANA: 'toHiragana',
  KATAKANA: 'toKatakana'
};

var ROMANIZATIONS = Object.freeze({
  HEPBURN: 'hepburn'
});

/**
 * Default config for WanaKana, user passed options will be merged with this
 * @type {DefaultOptions}
 * @ignore
 */
var DEFAULT_OPTIONS = {
  useObsoleteKana: false,
  passRomaji: false,
  upcaseKatakana: false,
  ignoreCase: false,
  IMEMode: false,
  romanization: ROMANIZATIONS.HEPBURN,
  customKanaMapping: {},
  customRomajiMapping: {}
};

// CharCode References
// http://www.rikai.com/library/kanjitables/kanji_codes.unicode.shtml
// http://unicode-table.com



var LATIN_UPPERCASE_START = 0x41;
var LATIN_UPPERCASE_END = 0x5a;
var LOWERCASE_ZENKAKU_START = 0xff41;
var LOWERCASE_ZENKAKU_END = 0xff5a;
var UPPERCASE_ZENKAKU_START = 0xff21;
var UPPERCASE_ZENKAKU_END = 0xff3a;
var HIRAGANA_START = 0x3041;
var HIRAGANA_END = 0x3096;
var KATAKANA_START = 0x30a1;
var KATAKANA_END = 0x30fc;
var KANJI_START = 0x4e00;
var KANJI_END = 0x9faf;
var PROLONGED_SOUND_MARK = 0x30fc;
var KANA_SLASH_DOT = 0x30fb;

var ZENKAKU_NUMBERS = [0xff10, 0xff19];
var ZENKAKU_UPPERCASE = [UPPERCASE_ZENKAKU_START, UPPERCASE_ZENKAKU_END];
var ZENKAKU_LOWERCASE = [LOWERCASE_ZENKAKU_START, LOWERCASE_ZENKAKU_END];
var ZENKAKU_PUNCTUATION_1 = [0xff01, 0xff0f];
var ZENKAKU_PUNCTUATION_2 = [0xff1a, 0xff1f];
var ZENKAKU_PUNCTUATION_3 = [0xff3b, 0xff3f];
var ZENKAKU_PUNCTUATION_4 = [0xff5b, 0xff60];
var ZENKAKU_SYMBOLS_CURRENCY = [0xffe0, 0xffee];

var HIRAGANA_CHARS = [0x3040, 0x309f];
var KATAKANA_CHARS = [0x30a0, 0x30ff];
var HANKAKU_KATAKANA = [0xff66, 0xff9f];
var KATAKANA_PUNCTUATION = [0x30fb, 0x30fc];
var KANA_PUNCTUATION = [0xff61, 0xff65];
var CJK_SYMBOLS_PUNCTUATION = [0x3000, 0x303f];
var COMMON_CJK = [0x4e00, 0x9fff];
var RARE_CJK = [0x3400, 0x4dbf];

var KANA_RANGES = [HIRAGANA_CHARS, KATAKANA_CHARS, KANA_PUNCTUATION, HANKAKU_KATAKANA];

var JA_PUNCTUATION_RANGES = [CJK_SYMBOLS_PUNCTUATION, KANA_PUNCTUATION, KATAKANA_PUNCTUATION, ZENKAKU_PUNCTUATION_1, ZENKAKU_PUNCTUATION_2, ZENKAKU_PUNCTUATION_3, ZENKAKU_PUNCTUATION_4, ZENKAKU_SYMBOLS_CURRENCY];

/**
 * All Japanese unicode start and end ranges
 * Includes kanji, full-width latin chars, punctuation, and number ranges.
 * @type {Array}
 * @ignore
 */
var JAPANESE_RANGES = [].concat(KANA_RANGES, JA_PUNCTUATION_RANGES, [ZENKAKU_UPPERCASE, ZENKAKU_LOWERCASE, ZENKAKU_NUMBERS, COMMON_CJK, RARE_CJK]);

var MODERN_ENGLISH = [0x0000, 0x007f];
var HEPBURN_MACRON_RANGES = [[0x0100, 0x0101], // Ā ā
[0x0112, 0x0113], // Ē ē
[0x012a, 0x012b], // Ī ī
[0x014c, 0x014d], // Ō ō
[0x016a, 0x016b]];
var SMART_QUOTE_RANGES = [[0x2018, 0x2019], // ‘ ’
[0x201c, 0x201d]];

var ROMAJI_RANGES = [MODERN_ENGLISH].concat(HEPBURN_MACRON_RANGES);

var EN_PUNCTUATION_RANGES = [[0x20, 0x2f], [0x3a, 0x3f], [0x5b, 0x60], [0x7b, 0x7e]].concat(SMART_QUOTE_RANGES);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};









































var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/**
 * Returns detailed type as string (instead of just 'object' for arrays etc)
 * @ignore
 * @param {any} value js value
 * @returns {String} type of value
 * @example
 * typeOf({}); // 'object'
 * typeOf([]); // 'array'
 * typeOf(function() {}); // 'function'
 * typeOf(/a/); // 'regexp'
 * typeOf(new Date()); // 'date'
 * typeOf(null); // 'null'
 * typeOf(undefined); // 'undefined'
 * typeOf('a'); // 'string'
 * typeOf(1); // 'number'
 * typeOf(true); // 'boolean'
 * typeOf(new Map()); // 'map'
 * typeOf(new Set()); // 'map'
 */
function typeOf(value) {
  if (value === null) {
    return 'null';
  }
  if (value !== Object(value)) {
    return typeof value === 'undefined' ? 'undefined' : _typeof(value);
  }
  return {}.toString.call(value).slice(8, -1).toLowerCase();
}

/**
 * Checks if input string is empty
 * @param  {String} input text input
 * @return {Boolean} true if no input
 */
function isEmpty(input) {
  if (typeOf(input) !== 'string') {
    return true;
  }
  return !input.length;
}

/**
 * Takes a character and a unicode range. Returns true if the char is in the range.
 * @param  {String}  char  unicode character
 * @param  {Number}  start unicode start range
 * @param  {Number}  end   unicode end range
 * @return {Boolean}
 */
function isCharInRange() {
  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var start = arguments[1];
  var end = arguments[2];

  if (isEmpty(char)) return false;
  var code = char.charCodeAt(0);
  return start <= code && code <= end;
}

/**
 * Tests a character. Returns true if the character is [Katakana](https://en.wikipedia.org/wiki/Katakana).
 * @param  {String} char character string to test
 * @return {Boolean}
 */
function isCharJapanese() {
  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return JAPANESE_RANGES.some(function (_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        start = _ref2[0],
        end = _ref2[1];

    return isCharInRange(char, start, end);
  });
}

/**
 * Test if `input` only includes [Kanji](https://en.wikipedia.org/wiki/Kanji), [Kana](https://en.wikipedia.org/wiki/Kana), zenkaku numbers, and JA punctuation/symbols.”
 * @param  {String} [input=''] text
 * @param  {Regexp} [allowed] additional test allowed to pass for each char
 * @return {Boolean} true if passes checks
 * @example
 * isJapanese('泣き虫')
 * // => true
 * isJapanese('あア')
 * // => true
 * isJapanese('２月') // Zenkaku numbers allowed
 * // => true
 * isJapanese('泣き虫。！〜＄') // Zenkaku/JA punctuation
 * // => true
 * isJapanese('泣き虫.!~$') // Latin punctuation fails
 * // => false
 * isJapanese('A泣き虫')
 * // => false
 * isJapanese('≪偽括弧≫', /[≪≫]/);
 * // => true
 */
function isJapanese() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var allowed = arguments[1];

  var augmented = typeOf(allowed) === 'regexp';
  return isEmpty(input) ? false : [].concat(toConsumableArray(input)).every(function (char) {
    var isJa = isCharJapanese(char);
    return !augmented ? isJa : isJa || allowed.test(char);
  });
}

/**
 * Easy re-use of merging with default options
 * @param {Object} opts user options
 * @returns user options merged over default options
 */
var mergeWithDefaultOptions = function mergeWithDefaultOptions() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object.assign({}, DEFAULT_OPTIONS, opts);
};

function _objectEntries$1(obj) {
  var entries = [];
  var keys = Object.keys(obj);

  for (var k = 0; k < keys.length; ++k) entries.push([keys[k], obj[keys[k]]]);

  return entries;
}

function applyMapping(string, mapping, convertEnding) {
  var root = mapping;
  function nextSubtree(tree, nextChar) {
    var subtree = tree[nextChar];
    if (subtree === undefined) {
      return undefined;
    }
    // if the next child node does not have a node value, set its node value to the input
    return Object.assign({ '': tree[''] + nextChar }, tree[nextChar]);
  }

  function newChunk(remaining, currentCursor) {
    // start parsing a new chunk
    var firstChar = remaining.charAt(0);

    return parse(Object.assign({ '': firstChar }, root[firstChar]), remaining.slice(1), currentCursor, currentCursor + 1);
  }

  function parse(tree, remaining, lastCursor, currentCursor) {
    if (!remaining) {
      if (convertEnding || Object.keys(tree).length === 1) {
        // nothing more to consume, just commit the last chunk and return it
        // so as to not have an empty element at the end of the result
        return tree[''] ? [[lastCursor, currentCursor, tree['']]] : [];
      }
      // if we don't want to convert the ending, because there are still possible continuations left, just return null as the final node value
      return [[lastCursor, currentCursor, null]];
    }

    if (Object.keys(tree).length === 1) {
      return [[lastCursor, currentCursor, tree['']]].concat(newChunk(remaining, currentCursor));
    }

    var subtree = nextSubtree(tree, remaining.charAt(0));
    if (subtree === undefined) {
      return [[lastCursor, currentCursor, tree['']]].concat(newChunk(remaining, currentCursor));
    }

    // continue current branch
    return parse(subtree, remaining.slice(1), lastCursor, currentCursor + 1);
  }
  return newChunk(string, 0);
}

// transform the tree, so that for example hepburnTree['ゔ']['ぁ'][''] === 'va'
// or kanaTree['k']['y']['a'][''] === 'きゃ'
function transform(tree) {
  var result = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _objectEntries$1(tree)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref = _step.value;

      var _ref2 = slicedToArray(_ref, 2);

      var char = _ref2[0];
      var subtree = _ref2[1];

      if (typeOf(subtree) === 'string') {
        // we have reached the bottom of this branch
        result[char] = { '': subtree };
      } else {
        // more subtrees to go through
        result[char] = transform(subtree);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return result;
}

function getSubTreeOf(tree, string) {
  var correctSubTree = tree;
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = string[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var char = _step2.value;

      if (correctSubTree[char] === undefined) {
        correctSubTree[char] = {};
      }
      correctSubTree = correctSubTree[char];
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return correctSubTree;
}

/**
 * Creates a custom mapping tree, returns a function that accepts a defaultMap which the newly created customMapping will be merged with and returned
 * (customMap) => (defaultMap) => mergedMap
 * @param  {Object} customMap { 'ka' : 'な' }
 * @return {Function} (defaultMap) => defaultMergedWithCustomMap
 * @example
 * const sillyMap = createCustomMapping({ 'ちゃ': 'time', '茎': 'cookie'　});
 * // sillyMap is passed defaultMapping to merge with when called in toRomaji()
 * toRomaji("It's 茎 ちゃ よ", { customRomajiMapping: sillyMap });
 * // => 'It's cookie time yo';
 */
function createCustomMapping() {
  var customMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var customTree = {};

  if (typeOf(customMap) === 'object') {
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = _objectEntries$1(customMap)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _ref3 = _step3.value;

        var _ref4 = slicedToArray(_ref3, 2);

        var rom = _ref4[0];
        var kan = _ref4[1];

        var subTree = customTree;
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = rom[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var char = _step4.value;

            if (subTree[char] === undefined) {
              subTree[char] = {};
            }
            subTree = subTree[char];
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        subTree[''] = kan;
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  }

  return function makeMap(map) {
    var mapCopy = JSON.parse(JSON.stringify(map));
    function transformMap(mapSubtree, customSubtree) {
      // replace the subtree
      if (mapSubtree === undefined || typeOf(mapSubtree) === 'string') {
        return customSubtree;
      }
      var result = mapSubtree;
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = _objectEntries$1(customSubtree)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _ref5 = _step5.value;

          var _ref6 = slicedToArray(_ref5, 2);

          var _char = _ref6[0];
          var subtree = _ref6[1];

          result[_char] = transformMap(mapSubtree[_char], subtree);
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      return result;
    }
    return transformMap(mapCopy, customTree);
  };
}

// allow consumer to pass either function or object as customMapping
function mergeCustomMapping() {
  var map = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var customMapping = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (typeOf(customMapping) === 'function') {
    return customMapping(map);
  } else if (typeOf(customMapping) === 'object') {
    return createCustomMapping(customMapping)(map);
  }
  return map;
}

function _objectEntries(obj) {
  var entries = [];
  var keys = Object.keys(obj);

  for (var k = 0; k < keys.length; ++k) entries.push([keys[k], obj[keys[k]]]);

  return entries;
}

var romajiToKanaMap = null;

function createRomajiToKanaMap$1() {
  // not exactly kunrei shiki, for example ぢゃ -> dya instead of zya, to avoid name clashing
  var kunreiTree = {
    a: 'あ',
    i: 'い',
    u: 'う',
    e: 'え',
    o: 'お',
    k: {
      a: 'か',
      i: 'き',
      u: 'く',
      e: 'け',
      o: 'こ'
    },
    s: {
      a: 'さ',
      i: 'し',
      u: 'す',
      e: 'せ',
      o: 'そ'
    },
    t: {
      a: 'た',
      i: 'ち',
      u: 'つ',
      e: 'て',
      o: 'と'
    },
    n: {
      a: 'な',
      i: 'に',
      u: 'ぬ',
      e: 'ね',
      o: 'の'
    },
    h: {
      a: 'は',
      i: 'ひ',
      u: 'ふ',
      e: 'へ',
      o: 'ほ'
    },
    m: {
      a: 'ま',
      i: 'み',
      u: 'む',
      e: 'め',
      o: 'も'
    },
    y: { a: 'や', u: 'ゆ', o: 'よ' },
    r: {
      a: 'ら',
      i: 'り',
      u: 'る',
      e: 'れ',
      o: 'ろ'
    },
    w: {
      a: 'わ',
      i: 'ゐ',
      e: 'ゑ',
      o: 'を'
    },
    g: {
      a: 'が',
      i: 'ぎ',
      u: 'ぐ',
      e: 'げ',
      o: 'ご'
    },
    z: {
      a: 'ざ',
      i: 'じ',
      u: 'ず',
      e: 'ぜ',
      o: 'ぞ'
    },
    d: {
      a: 'だ',
      i: 'ぢ',
      u: 'づ',
      e: 'で',
      o: 'ど'
    },
    b: {
      a: 'ば',
      i: 'び',
      u: 'ぶ',
      e: 'べ',
      o: 'ぼ'
    },
    p: {
      a: 'ぱ',
      i: 'ぴ',
      u: 'ぷ',
      e: 'ぺ',
      o: 'ぽ'
    },

    v: {
      a: 'ゔぁ',
      i: 'ゔぃ',
      u: 'ゔ',
      e: 'ゔぇ',
      o: 'ゔぉ'
    }
  };

  var kanaTree = transform(kunreiTree);
  // pseudo partial application
  var subtreeOf = function subtreeOf(string) {
    return getSubTreeOf(kanaTree, string);
  };

  var consonants = {
    k: 'き',
    s: 'し',
    t: 'ち',
    n: 'に',
    h: 'ひ',
    m: 'み',
    r: 'り',
    g: 'ぎ',
    z: 'じ',
    d: 'ぢ',
    b: 'び',
    p: 'ぴ',

    v: 'ゔ',
    q: 'く',
    f: 'ふ'
  };

  var smallY = {
    ya: 'ゃ',
    yi: 'ぃ',
    yu: 'ゅ',
    ye: 'ぇ',
    yo: 'ょ'
  };
  var smallaiueo = {
    a: 'ぁ',
    i: 'ぃ',
    u: 'ぅ',
    e: 'ぇ',
    o: 'ぉ'
  };

  // add tya, sya, etc.
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _objectEntries(consonants)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref = _step.value;

      var _ref2 = slicedToArray(_ref, 2);

      var consonant = _ref2[0];
      var yKana = _ref2[1];
      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = _objectEntries(smallY)[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var _ref17 = _step10.value;

          var _ref18 = slicedToArray(_ref17, 2);

          var rom = _ref18[0];
          var _kan = _ref18[1];

          // for example kyo -> き + ょ
          subtreeOf(consonant + rom)[''] = yKana + _kan;
        }
      } catch (err) {
        _didIteratorError10 = true;
        _iteratorError10 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion10 && _iterator10.return) {
            _iterator10.return();
          }
        } finally {
          if (_didIteratorError10) {
            throw _iteratorError10;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var specialSymbols = {
    '.': '。',
    ',': '、',
    ':': '：',
    '/': '・',
    '!': '！',
    '?': '？',
    '~': '〜',
    '-': 'ー',
    '‘': '「',
    '’': '」',
    '“': '『',
    '”': '』',
    '[': '［',
    ']': '］',
    '(': '（',
    ')': '）',
    '{': '｛',
    '}': '｝'
  };

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = _objectEntries(specialSymbols)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _ref3 = _step2.value;

      var _ref4 = slicedToArray(_ref3, 2);

      var symbol = _ref4[0];
      var jsymbol = _ref4[1];

      subtreeOf(symbol)[''] = jsymbol;
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var aiueoConstructions = {
    wh: 'う',
    qw: 'く',
    q: 'く',
    gw: 'ぐ',
    sw: 'す',
    ts: 'つ',
    th: 'て',
    tw: 'と',
    dh: 'で',
    dw: 'ど',
    fw: 'ふ',
    f: 'ふ'
  };

  // things like うぃ, くぃ, etc.
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = _objectEntries(aiueoConstructions)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _ref5 = _step3.value;

      var _ref6 = slicedToArray(_ref5, 2);

      var _consonant = _ref6[0];
      var aiueoKan = _ref6[1];
      var _iteratorNormalCompletion11 = true;
      var _didIteratorError11 = false;
      var _iteratorError11 = undefined;

      try {
        for (var _iterator11 = _objectEntries(smallaiueo)[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
          var _ref19 = _step11.value;

          var _ref20 = slicedToArray(_ref19, 2);

          var vow = _ref20[0];
          var _kan2 = _ref20[1];

          var subtree = subtreeOf(_consonant + vow);
          subtree[''] = aiueoKan + _kan2;
        }
      } catch (err) {
        _didIteratorError11 = true;
        _iteratorError11 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion11 && _iterator11.return) {
            _iterator11.return();
          }
        } finally {
          if (_didIteratorError11) {
            throw _iteratorError11;
          }
        }
      }
    }

    // different ways to write ん
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  var _arr = ['n', "n'", 'xn'];
  for (var _i = 0; _i < _arr.length; _i++) {
    var nvar = _arr[_i];
    subtreeOf(nvar)[''] = 'ん';
  }

  // typing one should be the same as having typed the other instead
  var alternativeMappings = {
    sh: 'sy', // sha -> sya
    ch: 'ty', // cho -> tyo
    cy: 'ty', // cyo -> tyo
    chy: 'ty', // chyu -> tyu
    shy: 'sy', // shya -> sya
    j: 'zy', // ja -> zya
    jy: 'zy', // jye -> zye

    // exceptions to above rules
    shi: 'si',
    chi: 'ti',
    tsu: 'tu',
    ji: 'zi',
    fu: 'hu'
  };

  // c is equivalent to k, but not for chi, cha, etc. that's why we have to make a copy of k
  kanaTree.c = JSON.parse(JSON.stringify(kanaTree.k));

  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = _objectEntries(alternativeMappings)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var _ref7 = _step4.value;

      var _ref8 = slicedToArray(_ref7, 2);

      var string = _ref8[0];
      var alternative = _ref8[1];

      var allExceptLast = string.slice(0, string.length - 1);
      var last = string.charAt(string.length - 1);
      var parentTree = subtreeOf(allExceptLast);
      // copy to avoid recursive containment
      parentTree[last] = JSON.parse(JSON.stringify(subtreeOf(alternative)));
    }

    // xtu -> っ
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  var smallLetters = Object.assign({
    tu: 'っ',
    wa: 'ゎ',
    ka: 'ヵ',
    ke: 'ヶ'
  }, smallaiueo, smallY);

  function getAlternatives(string) {
    var result = [];
    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = _objectEntries(alternativeMappings).concat([['c', 'k']])[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        var _ref9 = _step5.value;

        var _ref10 = slicedToArray(_ref9, 2);

        var alt = _ref10[0];
        var rom = _ref10[1];

        if (string.startsWith(rom)) {
          result.push(string.replace(rom, alt));
        }
      }
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5.return) {
          _iterator5.return();
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }

    return result;
  }

  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = _objectEntries(smallLetters)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      var _ref11 = _step6.value;

      var _ref12 = slicedToArray(_ref11, 2);

      var kunreiRom = _ref12[0];
      var kan = _ref12[1];

      {
        var xRom = 'x' + kunreiRom;
        var xSubtree = subtreeOf(xRom);
        xSubtree[''] = kan;

        // ltu -> xtu -> っ
        var _allExceptLast = kunreiRom.slice(0, kunreiRom.length - 1);
        var _last = kunreiRom.charAt(kunreiRom.length - 1);
        var _parentTree = subtreeOf('l' + _allExceptLast);
        _parentTree[_last] = xSubtree;
      }

      // ltsu -> ltu -> っ
      var _iteratorNormalCompletion12 = true;
      var _didIteratorError12 = false;
      var _iteratorError12 = undefined;

      try {
        for (var _iterator12 = getAlternatives(kunreiRom)[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
          var altRom = _step12.value;

          var _allExceptLast2 = altRom.slice(0, altRom.length - 1);
          var _last2 = altRom.charAt(altRom.length - 1);
          var _arr2 = ['l', 'x'];
          for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
            var prefix = _arr2[_i2];
            var _parentTree2 = subtreeOf(prefix + _allExceptLast2);
            _parentTree2[_last2] = subtreeOf(prefix + kunreiRom);
          }
        }
      } catch (err) {
        _didIteratorError12 = true;
        _iteratorError12 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion12 && _iterator12.return) {
            _iterator12.return();
          }
        } finally {
          if (_didIteratorError12) {
            throw _iteratorError12;
          }
        }
      }
    }

    // don't follow any notable patterns
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6.return) {
        _iterator6.return();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }

  var individualCases = {
    yi: 'い',
    wu: 'う',
    ye: 'いぇ',
    wi: 'うぃ',
    we: 'うぇ',
    kwa: 'くぁ',
    whu: 'う',
    // because it's not thya for てゃ but tha
    // and tha is not てぁ, but てゃ
    tha: 'てゃ',
    thu: 'てゅ',
    tho: 'てょ',
    dha: 'でゃ',
    dhu: 'でゅ',
    dho: 'でょ'
  };

  var _iteratorNormalCompletion7 = true;
  var _didIteratorError7 = false;
  var _iteratorError7 = undefined;

  try {
    for (var _iterator7 = _objectEntries(individualCases)[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
      var _ref13 = _step7.value;

      var _ref14 = slicedToArray(_ref13, 2);

      var _string = _ref14[0];
      var kana = _ref14[1];

      subtreeOf(_string)[''] = kana;
    }

    // add kka, tta, etc.
  } catch (err) {
    _didIteratorError7 = true;
    _iteratorError7 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion7 && _iterator7.return) {
        _iterator7.return();
      }
    } finally {
      if (_didIteratorError7) {
        throw _iteratorError7;
      }
    }
  }

  function addTsu(tree) {
    var result = {};
    var _iteratorNormalCompletion8 = true;
    var _didIteratorError8 = false;
    var _iteratorError8 = undefined;

    try {
      for (var _iterator8 = _objectEntries(tree)[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
        var _ref15 = _step8.value;

        var _ref16 = slicedToArray(_ref15, 2);

        var key = _ref16[0];
        var value = _ref16[1];

        if (!key) {
          // we have reached the bottom of this branch
          result[key] = '\u3063' + value;
        } else {
          // more subtrees
          result[key] = addTsu(value);
        }
      }
    } catch (err) {
      _didIteratorError8 = true;
      _iteratorError8 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion8 && _iterator8.return) {
          _iterator8.return();
        }
      } finally {
        if (_didIteratorError8) {
          throw _iteratorError8;
        }
      }
    }

    return result;
  }
  // have to explicitly name c here, because we made it a copy of k, not a reference
  var _iteratorNormalCompletion9 = true;
  var _didIteratorError9 = false;
  var _iteratorError9 = undefined;

  try {
    for (var _iterator9 = Object.keys(consonants).concat('c', 'y', 'w', 'j')[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
      var _consonant2 = _step9.value;

      var subtree = kanaTree[_consonant2];
      subtree[_consonant2] = addTsu(subtree);
    }
    // nn should not be っん
  } catch (err) {
    _didIteratorError9 = true;
    _iteratorError9 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion9 && _iterator9.return) {
        _iterator9.return();
      }
    } finally {
      if (_didIteratorError9) {
        throw _iteratorError9;
      }
    }
  }

  delete kanaTree.n.n;
  // solidify the results, so that there there is referential transparency within the tree
  return Object.freeze(JSON.parse(JSON.stringify(kanaTree)));
}

function getRomajiToKanaTree(config) {
  if (romajiToKanaMap === null) {
    romajiToKanaMap = createRomajiToKanaMap$1();
  }
  return romajiToKanaMap;
}

var USE_OBSOLETE_KANA_MAP = createCustomMapping({ wi: 'ゐ', we: 'ゑ' });

function IME_MODE_MAP(map) {
  // in IME mode, we do not want to convert single ns
  var mapCopy = JSON.parse(JSON.stringify(map));
  mapCopy.n.n = { '': 'ん' };
  mapCopy.n[' '] = { '': 'ん' };
  return mapCopy;
}

/**
 * Tests if char is in English unicode uppercase range
 * @param  {String} char
 * @return {Boolean}
 */
function isCharUpperCase() {
  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (isEmpty(char)) return false;
  return isCharInRange(char, LATIN_UPPERCASE_START, LATIN_UPPERCASE_END);
}

/**
 * Returns true if char is 'ー'
 * @param  {String} char to test
 * @return {Boolean}
 */
function isCharLongDash() {
  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (isEmpty(char)) return false;
  return char.charCodeAt(0) === PROLONGED_SOUND_MARK;
}

/**
 * Tests if char is '・'
 * @param  {String} char
 * @return {Boolean} true if '・'
 */
function isCharSlashDot() {
  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (isEmpty(char)) return false;
  return char.charCodeAt(0) === KANA_SLASH_DOT;
}

/**
 * Tests a character. Returns true if the character is [Hiragana](https://en.wikipedia.org/wiki/Hiragana).
 * @param  {String} char character string to test
 * @return {Boolean}
 */
function isCharHiragana() {
  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (isEmpty(char)) return false;
  if (isCharLongDash(char)) return true;
  return isCharInRange(char, HIRAGANA_START, HIRAGANA_END);
}

/**
 * Convert [Hiragana](https://en.wikipedia.org/wiki/Hiragana) to [Katakana](https://en.wikipedia.org/wiki/Katakana)
 * Passes through any non-hiragana chars
 * @param  {String} [input=''] text input
 * @return {String} converted text
 * @example
 * hiraganaToKatakana('ひらがな')
 * // => "ヒラガナ"
 * hiraganaToKatakana('ひらがな is a type of kana')
 * // => "ヒラガナ is a type of kana"
 * @ignore
 */
function hiraganaToKatakana() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var kata = [];
  input.split('').forEach(function (char) {
    // Short circuit to avoid incorrect codeshift for 'ー' and '・'
    if (isCharLongDash(char) || isCharSlashDot(char)) {
      kata.push(char);
    } else if (isCharHiragana(char)) {
      // Shift charcode.
      var code = char.charCodeAt(0) + (KATAKANA_START - HIRAGANA_START);
      var kataChar = String.fromCharCode(code);
      kata.push(kataChar);
    } else {
      // Pass non-hiragana chars through
      kata.push(char);
    }
  });
  return kata.join('');
}

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
 * toKana('WanaKana', { customKanaMapping: { na: 'に', ka: 'Bana' } });
 * // => 'ワにBanaに'
 */
function toKana() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (isEmpty(input)) {
    return input;
  }
  // throw away the substring index information and just concatenate all the kana
  return splitIntoConvertedKana(input, options).map(function (kanaToken) {
    var _kanaToken = slicedToArray(kanaToken, 3),
        start = _kanaToken[0],
        kana = _kanaToken[2];

    if (kana === null) {
      // haven't converted the end of the string, since we are in IME mode
      return input.slice(start);
    }
    // make katakana, if the first letter of the syllable is upper case
    return isCharUpperCase(input.charAt(start)) ? hiraganaToKatakana(kana) : kana;
  }).join('');
}

function createRomajiToKanaMap() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var map = getRomajiToKanaTree(config);
  map = config.IMEMode ? IME_MODE_MAP(map) : map;
  map = config.useObsoleteKana ? USE_OBSOLETE_KANA_MAP(map) : map;
  return mergeCustomMapping(map, config.customKanaMapping);
}

/**
 *
 * @param {String} [input=''] input text
 * @param {Object} [options={}] toKana options
 * @returns {Array[]} [[start, end, token]]
 * @ignore
 * @example
 * splitIntoConvertedKana('buttsuuji')
 * // => [[0, 2, 'ぶ'], [2, 6, 'っつ'], [6, 7, 'う'], [7, 9, 'じ']]
 */
function splitIntoConvertedKana() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var config = mergeWithDefaultOptions(options);
  var map = createRomajiToKanaMap(config);
  return applyMapping(input.toLowerCase(), map, !config.IMEMode);
}

var LISTENERS = [];

/**
 * Automagically replaces input values with converted text to kana
 * @param  {defaultOptions} [options] user config overrides, default conversion is toKana()
 * @return {Function} event handler with bound options
 * @ignore
 */
function makeOnInput(options, el) {
  var mergedConfig = Object.assign({}, mergeWithDefaultOptions(options), {
    IMEMode: options.IMEMode || true
  });

  return function onInput(_ref) {
    var target = _ref.target;
    var dataset = target.dataset,
        value = target.value,
        selectionEnd = target.selectionEnd;

    if (dataset.isComposing) {
      console.log('isComposing: early exit for value: ' + value);
      return;
    }

    var _splitInput = splitInput(value, selectionEnd, mergedConfig),
        _splitInput2 = slicedToArray(_splitInput, 3),
        head = _splitInput2[0],
        textToConvert = _splitInput2[1],
        tail = _splitInput2[2];

    var convertedText = toKana(textToConvert, mergedConfig);
    if (textToConvert !== convertedText) {
      target.value = head + convertedText + tail;
      var newCursor = head.length + convertedText.length;
      target.setSelectionRange(newCursor, newCursor);
    }
  };
}

function onComposition(_ref2) {
  var target = _ref2.target,
      type = _ref2.type;

  var isChrome = window && !!window.chrome && !!window.chrome.webstore;

  if (type === 'compositionend') {
    target.dataset.isComposing = false;

    // Chrome fires 'compositionEnd' event after 'input' event.
    // https://chromium.googlesource.com/chromium/src/+/afce9d93e76f2ff81baaa088a4ea25f67d1a76b3%5E%21/
    if (isChrome) {
      var inputEvent = new Event('input');
      target.dispatchEvent(inputEvent);
    }
  } else {
    // in composition
    target.dataset.isComposing = true;
  }
}

function trackListeners(id, inputHandler, compositionHandler) {
  LISTENERS = LISTENERS.concat({
    id: id,
    inputHandler: inputHandler,
    compositionHandler: compositionHandler
  });
}

function untrackListeners(_ref3) {
  var targetId = _ref3.id;

  LISTENERS = LISTENERS.filter(function (_ref4) {
    var id = _ref4.id;
    return id !== targetId;
  });
}

function findListeners(el) {
  return el && LISTENERS.find(function (_ref5) {
    var id = _ref5.id;
    return id === el.getAttribute('data-wanakana-id');
  });
}

// so we can handle non-terminal inserted input conversion:
// | -> わ| -> わび| -> わ|び -> わs|び -> わsh|び -> わshi|び -> わし|び
// or multiple ambiguous positioning (IE select which "s" to work from)
// こsこs|こsこ -> こsこso|こsこ -> こsこそ|こsこ
function splitInput() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var startIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var head = void 0;
  var toConvert = void 0;
  var tail = void 0;
  var triggers = Object.keys(createRomajiToKanaMap(config));
  triggers = [].concat(toConsumableArray(triggers), toConsumableArray(triggers.map(function (char) {
    return char.toUpperCase();
  })));

  if (startIndex === 0 && triggers.includes(text[0])) {
    // NOTE: maybe we can just *always* work backwards?
    var _workFromStart = workFromStart(text, triggers);

    var _workFromStart2 = slicedToArray(_workFromStart, 3);

    head = _workFromStart2[0];
    toConvert = _workFromStart2[1];
    tail = _workFromStart2[2];
  } else if (startIndex > 0) {
    var _workBackwards = workBackwards(text, startIndex);

    var _workBackwards2 = slicedToArray(_workBackwards, 3);

    head = _workBackwards2[0];
    toConvert = _workBackwards2[1];
    tail = _workBackwards2[2];
  } else {
    var _takeWhileAndSlice = takeWhileAndSlice(text, function (char) {
      return !triggers.includes(char);
    });

    var _takeWhileAndSlice2 = slicedToArray(_takeWhileAndSlice, 2);

    head = _takeWhileAndSlice2[0];
    toConvert = _takeWhileAndSlice2[1];

    var _takeWhileAndSlice3 = takeWhileAndSlice(toConvert, function (char) {
      return !isJapanese(char);
    });

    var _takeWhileAndSlice4 = slicedToArray(_takeWhileAndSlice3, 2);

    toConvert = _takeWhileAndSlice4[0];
    tail = _takeWhileAndSlice4[1];
  }

  return [head, setKanaType(toConvert, config), tail];
}

function workFromStart(text, catalystChars) {
  return [''].concat(toConsumableArray(takeWhileAndSlice(text, function (char) {
    return catalystChars.includes(char) || !isJapanese(char, /[0-9]/);
  })));
}

function workBackwards() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var startIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var _takeWhileAndSlice5 = takeWhileAndSlice([].concat(toConsumableArray(text.slice(0, startIndex))).reverse(), function (char) {
    return !isJapanese(char);
  }),
      _takeWhileAndSlice6 = slicedToArray(_takeWhileAndSlice5, 2),
      toConvert = _takeWhileAndSlice6[0],
      head = _takeWhileAndSlice6[1];

  return [head.reverse().join(''), toConvert.split('').reverse().join(''), text.slice(startIndex)];
}

function takeWhileAndSlice() {
  var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var predicate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (x) {
    return !!x;
  };

  var result = [];
  var length = source.length;

  var i = 0;
  while (i < length && predicate(source[i], i)) {
    result.push(source[i]);
    i += 1;
  }
  return [result.join(''), source.slice(i)];
}

// allow us to to continue use `toKana` to handle IME input with forced conversion type
function setKanaType() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var _ref6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      IMEMode = _ref6.IMEMode;

  switch (true) {
    case IMEMode === TO_KANA_METHODS.HIRAGANA:
      return input.toLowerCase();
    case IMEMode === TO_KANA_METHODS.KATAKANA:
      return input.toUpperCase();
    default:
      return input;
  }
}

function _objectEntries$2(obj) {
  var entries = [];
  var keys = Object.keys(obj);

  for (var k = 0; k < keys.length; ++k) entries.push([keys[k], obj[keys[k]]]);

  return entries;
}

/* eslint-disable no-console */
var onInput = function onInput(_ref) {
  var target = _ref.target;
  return console.log('input: ' + target.value);
};
var onTextInput = function onTextInput(_ref2) {
  var target = _ref2.target;
  return console.log('textinput: ' + target.value);
};
var onKeyDown = function onKeyDown(_ref3) {
  var key = _ref3.key,
      which = _ref3.which;

  var char = String.fromCharCode(which);
  var message = 'which: ' + which + ' ' + (/[a-z]/i.test(char) ? 'char: ' + char : '');
  console.log('$keydown: ' + message);
};
var onCompositionStart = function onCompositionStart() {
  return console.log('compositionstart');
};
var onCompositionEnd = function onCompositionEnd() {
  return console.log('compositionend');
};
var onCompositionUpdate = function onCompositionUpdate(_ref4) {
  var data = _ref4.data;
  return console.log('compositionupdate: data: ' + data);
};

var events = {
  input: onInput,
  textinput: onTextInput,
  keydown: onKeyDown,
  compositionstart: onCompositionStart,
  compositionend: onCompositionEnd,
  compositionupdate: onCompositionUpdate
};

var addDebugListeners = function addDebugListeners(input) {
  _objectEntries$2(events).forEach(function (_ref5) {
    var _ref6 = slicedToArray(_ref5, 2),
        event = _ref6[0],
        handler = _ref6[1];

    return input.addEventListener(event, handler);
  });
};

var removeDebugListeners = function removeDebugListeners(input) {
  _objectEntries$2(events).forEach(function (_ref7) {
    var _ref8 = slicedToArray(_ref7, 2),
        event = _ref8[0],
        handler = _ref8[1];

    return input.removeEventListener(event, handler);
  });
};

var ELEMENTS = ['TEXTAREA', 'INPUT'];

var idCounter = 0;
var newId = function newId() {
  idCounter += 1;
  return '' + Date.now() + idCounter;
};

/**
 * Binds eventListener for 'input' events to an input field to automagically replace values with kana
 * Can pass { IMEMode: 'toHiragana' } or `'toKatakana'` as second param to enforce kana conversion type
 * @param  {HTMLElement} input textarea, input[type="text"] etc
 * @param  {DefaultOptions} [options=defaultOptions] defaults to { IMEMode: true } using `toKana`
 */
function bind() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var debug = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!ELEMENTS.includes(input.nodeName)) {
    throw new Error('Element provided to Wanakana bind() was not a valid input or textarea element.\n Received: (' + JSON.stringify(input) + ')');
  }
  var onInput = makeOnInput(options, input);
  var id = newId();
  input.setAttribute('data-wanakana-id', id);
  //  input.autocapitalize = 'none'; // eslint-disable-line no-param-reassign
  input.addEventListener('input', onInput);
  input.addEventListener('compositionstart', onComposition);
  input.addEventListener('compositionchange', onComposition);
  input.addEventListener('compositionend', onComposition);
  trackListeners(id, onInput, onComposition);
  if (debug === true) {
    addDebugListeners(input);
  }
}

/**
 * Unbinds eventListener from input field
 * @param  {HTMLElement} input <textarea>, <input>
 */
function unbind(input) {
  var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var listeners = findListeners(input);
  if (listeners == null) {
    throw new Error('Element provided to Wanakana unbind() had no listener registered.\n Received: ' + JSON.stringify(input));
  }
  var inputHandler = listeners.inputHandler,
      compositionHandler = listeners.compositionHandler;

  input.removeAttribute('data-wanakana-id');
  input.removeAttribute('data-is-composing');
  input.removeEventListener('input', inputHandler);
  input.removeEventListener('compositionstart', compositionHandler);
  input.removeEventListener('compositionupdate', compositionHandler);
  input.removeEventListener('compositionend', compositionHandler);
  untrackListeners(listeners);
  if (debug === true) {
    removeDebugListeners(input);
  }
}

/**
 * Tests a character. Returns true if the character is [Romaji](https://en.wikipedia.org/wiki/Romaji) (allowing [Hepburn romanisation](https://en.wikipedia.org/wiki/Hepburn_romanization))
 * @param  {String} char character string to test
 * @return {Boolean}
 */
function isCharRomaji() {
  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (isEmpty(char)) return false;
  return ROMAJI_RANGES.some(function (_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        start = _ref2[0],
        end = _ref2[1];

    return isCharInRange(char, start, end);
  });
}

/**
 * Test if `input` is [Romaji](https://en.wikipedia.org/wiki/Romaji) (allowing [Hepburn romanisation](https://en.wikipedia.org/wiki/Hepburn_romanization))
 * @param  {String} [input=''] text
 * @param  {Regexp} [allowed] additional test allowed to pass for each char
 * @return {Boolean} true if [Romaji](https://en.wikipedia.org/wiki/Romaji)
 * @example
 * isRomaji('Tōkyō and Ōsaka')
 * // => true
 * isRomaji('12a*b&c-d')
 * // => true
 * isRomaji('あアA')
 * // => false
 * isRomaji('お願い')
 * // => false
 * isRomaji('a！b&cーd') // Zenkaku punctuation fails
 * // => false
 * isRomaji('a！b&cーd', /[！ー]/)
 * // => true
 */
function isRomaji() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var allowed = arguments[1];

  var augmented = typeOf(allowed) === 'regexp';
  return isEmpty(input) ? false : [].concat(toConsumableArray(input)).every(function (char) {
    var isRoma = isCharRomaji(char);
    return !augmented ? isRoma : isRoma || allowed.test(char);
  });
}

/**
 * Tests a character. Returns true if the character is [Katakana](https://en.wikipedia.org/wiki/Katakana).
 * @param  {String} char character string to test
 * @return {Boolean}
 */
function isCharKatakana() {
  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return isCharInRange(char, KATAKANA_START, KATAKANA_END);
}

/**
 * Tests a character. Returns true if the character is [Hiragana](https://en.wikipedia.org/wiki/Hiragana) or [Katakana](https://en.wikipedia.org/wiki/Katakana).
 * @param  {String} char character string to test
 * @return {Boolean}
 */
function isCharKana() {
  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (isEmpty(char)) return false;
  return isCharHiragana(char) || isCharKatakana(char);
}

/**
 * Test if `input` is [Kana](https://en.wikipedia.org/wiki/Kana) ([Katakana](https://en.wikipedia.org/wiki/Katakana) and/or [Hiragana](https://en.wikipedia.org/wiki/Hiragana))
 * @param  {String} [input=''] text
 * @return {Boolean} true if all [Kana](https://en.wikipedia.org/wiki/Kana)
 * @example
 * isKana('あ')
 * // => true
 * isKana('ア')
 * // => true
 * isKana('あーア')
 * // => true
 * isKana('A')
 * // => false
 * isKana('あAア')
 * // => false
 */
function isKana() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (isEmpty(input)) return false;
  return [].concat(toConsumableArray(input)).every(isCharKana);
}

/**
 * Test if `input` is [Hiragana](https://en.wikipedia.org/wiki/Hiragana)
 * @param  {String} [input=''] text
 * @return {Boolean} true if all [Hiragana](https://en.wikipedia.org/wiki/Hiragana)
 * @example
 * isHiragana('げーむ')
 * // => true
 * isHiragana('A')
 * // => false
 * isHiragana('あア')
 * // => false
 */
function isHiragana() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (isEmpty(input)) return false;
  return [].concat(toConsumableArray(input)).every(isCharHiragana);
}

/**
 * Test if `input` is [Katakana](https://en.wikipedia.org/wiki/Katakana)
 * @param  {String} [input=''] text
 * @return {Boolean} true if all [Katakana](https://en.wikipedia.org/wiki/Katakana)
 * @example
 * isKatakana('ゲーム')
 * // => true
 * isKatakana('あ')
 * // => false
 * isKatakana('A')
 * // => false
 * isKatakana('あア')
 * // => false
 */
function isKatakana() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (isEmpty(input)) return false;
  return [].concat(toConsumableArray(input)).every(isCharKatakana);
}

/**
 * Tests a character. Returns true if the character is a CJK ideograph (kanji).
 * @param  {String} char character string to test
 * @return {Boolean}
 */
function isCharKanji() {
  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return isCharInRange(char, KANJI_START, KANJI_END);
}

/**
 * Tests if `input` is [Kanji](https://en.wikipedia.org/wiki/Kanji) ([Japanese CJK ideographs](https://en.wikipedia.org/wiki/CJK_Unified_Ideographs))
 * @param  {String} [input=''] text
 * @return {Boolean} true if all [Kanji](https://en.wikipedia.org/wiki/Kanji)
 * @example
 * isKanji('刀')
 * // => true
 * isKanji('切腹')
 * // => true
 * isKanji('勢い')
 * // => false
 * isKanji('あAア')
 * // => false
 * isKanji('🐸')
 * // => false
 */
function isKanji() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (isEmpty(input)) return false;
  return [].concat(toConsumableArray(input)).every(isCharKanji);
}

/**
 * Test if `input` contains a mix of [Romaji](https://en.wikipedia.org/wiki/Romaji) *and* [Kana](https://en.wikipedia.org/wiki/Kana), defaults to pass through [Kanji](https://en.wikipedia.org/wiki/Kanji)
 * @param  {String} input text
 * @param  {Object} [options={ passKanji: true }] optional config to pass through kanji
 * @return {Boolean} true if mixed
 * @example
 * isMixed('Abあア'))
 * // => true
 * isMixed('お腹A'))
 * // => true
 * isMixed('お腹A', { passKanji: false }))
 * // => false
 * isMixed('ab'))
 * // => false
 * isMixed('あア'))
 * // => false
 */
function isMixed() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { passKanji: true };

  var chars = [].concat(toConsumableArray(input));
  var hasKanji = false;
  if (!options.passKanji) {
    hasKanji = chars.some(isKanji);
  }
  return (chars.some(isHiragana) || chars.some(isKatakana)) && chars.some(isRomaji) && !hasKanji;
}

var isCharInitialLongDash = function isCharInitialLongDash(char, index) {
  return isCharLongDash(char) && index < 1;
};
var isCharInnerLongDash = function isCharInnerLongDash(char, index) {
  return isCharLongDash(char) && index > 0;
};
var isKanaAsSymbol = function isKanaAsSymbol(char) {
  return ['ヶ', 'ヵ'].includes(char);
};
var LONG_VOWELS = {
  a: 'あ',
  i: 'い',
  u: 'う',
  e: 'え',
  o: 'う'
};

/**
 * Convert [Katakana](https://en.wikipedia.org/wiki/Katakana) to [Hiragana](https://en.wikipedia.org/wiki/Hiragana)
 * Passes through any non-katakana chars
 * @param  {String} [input=''] text input
 * @return {String} converted text
 * @example
 * katakanaToHiragana('カタカナ')
 * // => "かたかな"
 * katakanaToHiragana('カタカナ is a type of kana')
 * // => "かたかな is a type of kana"
 * @ignore
 */
function katakanaToHiragana() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var hira = [];
  var previousKana = '';
  var iterable = input.split('');
  for (var index = 0; index < iterable.length; index += 1) {
    var char = iterable[index];
    // Short circuit to avoid incorrect codeshift for 'ー' and '・'
    if (isCharSlashDot(char) || isCharInitialLongDash(char, index) || isKanaAsSymbol(char)) {
      hira.push(char);
      // Transform long vowels: 'オー' to 'おう'
    } else if (previousKana && isCharInnerLongDash(char, index)) {
      // Transform previousKana back to romaji, and slice off the vowel
      var romaji = toRomaji(previousKana).slice(-1);
      hira.push(LONG_VOWELS[romaji]);
    } else if (!isCharLongDash(char) && isCharKatakana(char)) {
      // Shift charcode.
      var code = char.charCodeAt(0) + (HIRAGANA_START - KATAKANA_START);
      var hiraChar = String.fromCharCode(code);
      hira.push(hiraChar);
      previousKana = hiraChar;
    } else {
      // Pass non katakana chars through
      hira.push(char);
      previousKana = '';
    }
  }
  return hira.join('');
}

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
function romajiToHiragana() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var text = input.toLowerCase(); // ensure hiragana
  return toKana(text, options);
}

/**
 * Tests a character. Returns true if the character is considered English punctuation.
 * @param  {String} char character string to test
 * @return {Boolean}
 */
function isCharEnglishPunctuation() {
  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (isEmpty(char)) return false;
  return EN_PUNCTUATION_RANGES.some(function (_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        start = _ref2[0],
        end = _ref2[1];

    return isCharInRange(char, start, end);
  });
}

/**
 * Convert input to [Hiragana](https://en.wikipedia.org/wiki/Hiragana)
 * @param  {String} [input=''] text
 * @param  {DefaultOptions} [options=defaultOptions]
 * @return {String} converted text
 * @example
 * toHiragana('toukyou, オオサカ')
 * // => 'とうきょう、　おおさか'
 * toHiragana('only カナ', { passRomaji: true })
 * // => 'only かな'
 * toHiragana('wi')
 * // => 'うぃ'
 * toHiragana('wi', { useObsoleteKana: true })
 * // => 'ゐ'
 */
function toHiragana() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var config = mergeWithDefaultOptions(options);
  if (config.passRomaji) {
    return katakanaToHiragana(input);
  }

  if (isRomaji(input) || isCharEnglishPunctuation(input)) {
    return romajiToHiragana(input, config);
  }

  if (isMixed(input, { passKanji: true })) {
    var romaji = katakanaToHiragana(input);
    return romajiToHiragana(romaji, config);
  }

  return katakanaToHiragana(input);
}

function _objectEntries$3(obj) {
  var entries = [];
  var keys = Object.keys(obj);

  for (var k = 0; k < keys.length; ++k) entries.push([keys[k], obj[keys[k]]]);

  return entries;
}

var kanaToHepburnMap = null;

function createKanaToHepburnMap() {
  var romajiTree = transform({
    あ: 'a',
    い: 'i',
    う: 'u',
    え: 'e',
    お: 'o',
    か: 'ka',
    き: 'ki',
    く: 'ku',
    け: 'ke',
    こ: 'ko',
    さ: 'sa',
    し: 'shi',
    す: 'su',
    せ: 'se',
    そ: 'so',
    た: 'ta',
    ち: 'chi',
    つ: 'tsu',
    て: 'te',
    と: 'to',
    な: 'na',
    に: 'ni',
    ぬ: 'nu',
    ね: 'ne',
    の: 'no',
    は: 'ha',
    ひ: 'hi',
    ふ: 'fu',
    へ: 'he',
    ほ: 'ho',
    ま: 'ma',
    み: 'mi',
    む: 'mu',
    め: 'me',
    も: 'mo',
    や: 'ya',
    ゆ: 'yu',
    よ: 'yo',
    ら: 'ra',
    り: 'ri',
    る: 'ru',
    れ: 're',
    ろ: 'ro',
    わ: 'wa',
    ゐ: 'wi',
    ゑ: 'we',
    を: 'wo',
    が: 'ga',
    ぎ: 'gi',
    ぐ: 'gu',
    げ: 'ge',
    ご: 'go',
    ざ: 'za',
    じ: 'ji',
    ず: 'zu',
    ぜ: 'ze',
    ぞ: 'zo',
    だ: 'da',
    ぢ: 'ji',
    づ: 'zu',
    で: 'de',
    ど: 'do',
    ば: 'ba',
    び: 'bi',
    ぶ: 'bu',
    べ: 'be',
    ぼ: 'bo',
    ぱ: 'pa',
    ぴ: 'pi',
    ぷ: 'pu',
    ぺ: 'pe',
    ぽ: 'po',
    ゔぁ: 'va',
    ゔぃ: 'vi',
    ゔ: 'vu',
    ゔぇ: 've',
    ゔぉ: 'vo',
    ん: 'n'
  });

  var subtreeOf = function subtreeOf(string) {
    return getSubTreeOf(romajiTree, string);
  };
  var setTrans = function setTrans(string, transliteration) {
    subtreeOf(string)[''] = transliteration;
  };

  var specialSymbols = {
    '。': '.',
    '、': ',',
    '：': ':',
    '・': '/',
    '！': '!',
    '？': '?',
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
    '　': ' '
  };

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _objectEntries$3(specialSymbols)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref = _step.value;

      var _ref2 = slicedToArray(_ref, 2);

      var jsymbol = _ref2[0];
      var symbol = _ref2[1];

      subtreeOf(jsymbol)[''] = symbol;
    }

    /* eslint-disable object-curly-newline */
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var smallY = { ゃ: 'ya', ゅ: 'yu', ょ: 'yo' };
  var smallYExtra = { ぃ: 'yi', ぇ: 'ye' };
  var smallaiueo = { ぁ: 'a', ぃ: 'i', ぅ: 'u', ぇ: 'e', ぉ: 'o' };

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = _objectEntries$3(smallY).concat(_objectEntries$3(smallaiueo))[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _ref3 = _step2.value;

      var _ref4 = slicedToArray(_ref3, 2);

      var rom = _ref4[0];
      var kan = _ref4[1];

      setTrans(rom, kan);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var yoonKana = ['き', 'に', 'ひ', 'み', 'り', 'ぎ', 'び', 'ぴ', 'ゔ', 'く', 'ふ'];
  // きゃ -> kya
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = yoonKana[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var kana = _step3.value;

      var fistRomajiLetter = subtreeOf(kana)[''][0];
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = _objectEntries$3(smallY)[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var _ref11 = _step8.value;

          var _ref12 = slicedToArray(_ref11, 2);

          var yKan = _ref12[0];
          var yRom = _ref12[1];

          setTrans(kana + yKan, fistRomajiLetter + yRom);
        }
        // きぃ -> kyi
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8.return) {
            _iterator8.return();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = _objectEntries$3(smallYExtra)[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var _ref13 = _step9.value;

          var _ref14 = slicedToArray(_ref13, 2);

          var _yKan = _ref14[0];
          var _yRom = _ref14[1];

          setTrans(kana + _yKan, fistRomajiLetter + _yRom);
        }
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9.return) {
            _iterator9.return();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  var yoonExceptions = { し: 'sh', ち: 'ch', じ: 'j', ぢ: 'j' };
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = _objectEntries$3(yoonExceptions)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var _ref5 = _step4.value;

      var _ref6 = slicedToArray(_ref5, 2);

      var _kana = _ref6[0];
      var _rom = _ref6[1];

      // じゃ -> ja
      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = _objectEntries$3(smallY)[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var _ref15 = _step10.value;

          var _ref16 = slicedToArray(_ref15, 2);

          var _yKan2 = _ref16[0];
          var _yRom2 = _ref16[1];

          setTrans(_kana + _yKan2, _rom + _yRom2[1]);
        }
        // じぃ -> jyi, じぇ -> je
      } catch (err) {
        _didIteratorError10 = true;
        _iteratorError10 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion10 && _iterator10.return) {
            _iterator10.return();
          }
        } finally {
          if (_didIteratorError10) {
            throw _iteratorError10;
          }
        }
      }

      setTrans(_kana + '\u3043', _rom + 'yi');
      setTrans(_kana + '\u3047', _rom + 'e');
    }

    // going with the intuitive (yet incorrect) solution where っや -> yya and っぃ -> ii
    // in other words, just assume the sokuon could have been applied to anything
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  var sokuonWhitelist = {
    b: 'b',
    c: 't',
    d: 'd',
    f: 'f',
    g: 'g',
    h: 'h',
    j: 'j',
    k: 'k',
    m: 'm',
    p: 'p',
    q: 'q',
    r: 'r',
    s: 's',
    t: 't',
    v: 'v',
    w: 'w',
    x: 'x',
    z: 'z'
  };

  function resolveTsu(tree) {
    var result = {};
    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = _objectEntries$3(tree)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        var _ref7 = _step5.value;

        var _ref8 = slicedToArray(_ref7, 2);

        var key = _ref8[0];
        var value = _ref8[1];

        if (!key) {
          // we have reached the bottom of this branch
          var consonant = value.charAt(0);
          result[key] = consonant in sokuonWhitelist ? sokuonWhitelist[consonant] + value : value;
        } else {
          // more subtrees
          result[key] = resolveTsu(value);
        }
      }
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5.return) {
          _iterator5.return();
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }

    return result;
  }

  romajiTree['っ'] = resolveTsu(romajiTree);

  var smallLetters = {
    っ: '',
    ゃ: 'ya',
    ゅ: 'yu',
    ょ: 'yo',
    ぁ: 'a',
    ぃ: 'i',
    ぅ: 'u',
    ぇ: 'e',
    ぉ: 'o'
  };

  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = _objectEntries$3(smallLetters)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      var _ref9 = _step6.value;

      var _ref10 = slicedToArray(_ref9, 2);

      var _kan = _ref10[0];
      var _rom2 = _ref10[1];

      setTrans(_kan, _rom2);
    }

    // んい -> n'i
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6.return) {
        _iterator6.return();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }

  var ambig = ['あ', 'い', 'う', 'え', 'お', 'や', 'ゆ', 'よ'];
  var _iteratorNormalCompletion7 = true;
  var _didIteratorError7 = false;
  var _iteratorError7 = undefined;

  try {
    for (var _iterator7 = ambig[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
      var _kan2 = _step7.value;

      setTrans('\u3093' + _kan2, 'n\'' + subtreeOf(_kan2)['']);
    }
    // NOTE: could be re-enabled with an option?
    // // んば -> mbo
    // const labial = [
    //   'ば', 'び', 'ぶ', 'べ', 'ぼ',
    //   'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ',
    //   'ま', 'み', 'む', 'め', 'も',
    // ];
    // for (const kan of labial) {
    //   setTrans(`ん${kan}`, `m${subtreeOf(kan)['']}`);
    // }
  } catch (err) {
    _didIteratorError7 = true;
    _iteratorError7 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion7 && _iterator7.return) {
        _iterator7.return();
      }
    } finally {
      if (_didIteratorError7) {
        throw _iteratorError7;
      }
    }
  }

  return Object.freeze(JSON.parse(JSON.stringify(romajiTree)));
}

function getKanaToHepburnTree() {
  if (kanaToHepburnMap === null) {
    kanaToHepburnMap = createKanaToHepburnMap();
  }
  return kanaToHepburnMap;
}

function getKanaToRomajiTree(fullOptions) {
  switch (fullOptions.romanization) {
    case ROMANIZATIONS.HEPBURN:
      return getKanaToHepburnTree(fullOptions);
    default:
      return {};
  }
}

/**
 * Convert kana to romaji
 * @param  {String} kana text input
 * @param  {DefaultOptions} [options=defaultOptions]
 * @return {String} converted text
 * @example
 * toRomaji('ひらがな　カタカナ')
 * // => 'hiragana katakana'
 * toRomaji('げーむ　ゲーム')
 * // => 'ge-mu geemu'
 * toRomaji('ひらがな　カタカナ', { upcaseKatakana: true })
 * // => 'hiragana KATAKANA'
 * toRomaji('つじぎり', { customRomajiMapping: { じ: 'zi', つ: 'tu', り: 'li' } });
 * // => 'tuzigili'
 */
function toRomaji() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var mergedOptions = mergeWithDefaultOptions(options);
  // just throw away the substring index information and just concatenate all the kana
  return splitIntoRomaji(input, mergedOptions).map(function (romajiToken) {
    var _romajiToken = slicedToArray(romajiToken, 3),
        start = _romajiToken[0],
        end = _romajiToken[1],
        romaji = _romajiToken[2];

    var makeUpperCase = options.upcaseKatakana && isKatakana(input.slice(start, end));
    return makeUpperCase ? romaji.toUpperCase() : romaji;
  }).join('');
}

function splitIntoRomaji(input, options) {
  var map = getKanaToRomajiTree(options);
  map = mergeCustomMapping(map, options.customRomajiMapping);

  return applyMapping(toHiragana(input, { passRomaji: true }), map, !options.IMEMode);
}

/**
 * Convert input to [Katakana](https://en.wikipedia.org/wiki/Katakana)
 * @param  {String} [input=''] text
 * @param  {DefaultOptions} [options=defaultOptions]
 * @return {String} converted text
 * @example
 * toKatakana('toukyou, おおさか')
 * // => 'トウキョウ、　オオサカ'
 * toKatakana('only かな', { passRomaji: true })
 * // => 'only カナ'
 * toKatakana('wi')
 * // => 'ウィ'
 * toKatakana('wi', { useObsoleteKana: true })
 * // => 'ヰ'
 */
function toKatakana() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var mergedOptions = mergeWithDefaultOptions(options);
  if (mergedOptions.passRomaji) {
    return hiraganaToKatakana(input);
  }

  if (isMixed(input) || isRomaji(input) || isCharEnglishPunctuation(input)) {
    var romaji = romajiToHiragana(input, mergedOptions);
    return hiraganaToKatakana(romaji);
  }

  return hiraganaToKatakana(input);
}

/**
 * Tests a character. Returns true if the character is considered English punctuation.
 * @param  {String} char character string to test
 * @return {Boolean}
 */
function isCharJapanesePunctuation() {
  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (isEmpty(char)) return false;
  return JA_PUNCTUATION_RANGES.some(function (_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        start = _ref2[0],
        end = _ref2[1];

    return isCharInRange(char, start, end);
  });
}

/**
 * Tests a character. Returns true if the character is considered Japanese or English punctuation.
 * @param  {String} char character string to test
 * @return {Boolean}
 */
function isCharPunctuation() {
  var char = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (isEmpty(char)) return false;
  return isCharEnglishPunctuation(char) || isCharJapanesePunctuation(char);
}

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
function stripOkurigana() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { all: false };

  if (isEmpty(input) || !isJapanese(input) || isKana(input)) {
    return input;
  }
  var chars = [].concat(toConsumableArray(input));

  // strip every kana
  if (options.all) {
    return chars.filter(function (char) {
      return !isCharKana(char);
    }).join('');
  }

  // strip trailing only
  var reverseChars = chars.reverse();
  for (var i = 0, len = reverseChars.length; i < len; i += 1) {
    var char = reverseChars[i];
    // pass if it's punctuation
    if (isCharPunctuation(char)) continue; // eslint-disable-line no-continue
    // blank out if not kanji
    if (!isKanji(char)) {
      reverseChars[i] = '';
    } else break; // stop when we hit a kanji char
  }

  return reverseChars.reverse().join('');
}

var isCharEnSpace = function isCharEnSpace(x) {
  return x === ' ';
};
var isCharJaSpace = function isCharJaSpace(x) {
  return x === '　';
};
var isCharJaNum = function isCharJaNum(x) {
  return (/[０-９]/.test(x)
  );
};
var isCharEnNum = function isCharEnNum(x) {
  return (/[0-9]/.test(x)
  );
};

var TOKEN_TYPES = {
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
  OTHER: 'other'
};

// prettier-ignore
function getType(input) {
  var compact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var EN = TOKEN_TYPES.EN,
      JA = TOKEN_TYPES.JA,
      EN_NUM = TOKEN_TYPES.EN_NUM,
      JA_NUM = TOKEN_TYPES.JA_NUM,
      EN_PUNC = TOKEN_TYPES.EN_PUNC,
      JA_PUNC = TOKEN_TYPES.JA_PUNC,
      KANJI = TOKEN_TYPES.KANJI,
      HIRAGANA = TOKEN_TYPES.HIRAGANA,
      KATAKANA = TOKEN_TYPES.KATAKANA,
      SPACE = TOKEN_TYPES.SPACE,
      OTHER = TOKEN_TYPES.OTHER;


  if (compact) {
    switch (true) {
      case isCharJaNum(input):
        return OTHER;
      case isCharEnNum(input):
        return OTHER;
      case isCharEnSpace(input):
        return EN;
      case isCharEnglishPunctuation(input):
        return OTHER;
      case isCharJaSpace(input):
        return JA;
      case isCharJapanesePunctuation(input):
        return OTHER;
      case isCharJapanese(input):
        return JA;
      case isCharRomaji(input):
        return EN;
      default:
        return OTHER;
    }
  } else {
    switch (true) {
      case isCharJaSpace(input):
        return SPACE;
      case isCharEnSpace(input):
        return SPACE;
      case isCharJaNum(input):
        return JA_NUM;
      case isCharEnNum(input):
        return EN_NUM;
      case isCharEnglishPunctuation(input):
        return EN_PUNC;
      case isCharJapanesePunctuation(input):
        return JA_PUNC;
      case isCharKanji(input):
        return KANJI;
      case isCharHiragana(input):
        return HIRAGANA;
      case isCharKatakana(input):
        return KATAKANA;
      case isCharJapanese(input):
        return JA;
      case isCharRomaji(input):
        return EN;
      default:
        return OTHER;
    }
  }
}

/**
 * Splits input into array of strings separated by opinionated token types
 * 'en', 'ja', 'englishNumeral', 'japaneseNumeral',
 * 'englishPunctuation', 'japanesePunctuation',
 * 'kanji', 'hiragana', 'katakana', 'space', 'other'
 * If { compact: true } then many same-language tokens are combined (spaces + text, kanji + kana, numeral + punctuation)
 * If { detailed: true } then return array will contain { type, value } instead of 'value'
 * @param  {String} input text
 * @param  {Object} [options={ compact: false, detailed: false}] options to modify output style
 * @return {String|Object[]} text split into tokens containing values, or detailed object
 * @example
 * tokenize('ふふフフ')
 * // => ['ふふ', 'フフ']
 * tokenize('感じ')
 * // => ['感', 'じ']
 * tokenize('truly 私は悲しい')
 * // => ['truly', ' ', '私', 'は', '悲', 'しい']
 * tokenize('truly 私は悲しい', { compact: true })
 * // => ['truly ', '私は悲しい']
 * tokenize('5romaji here...!?漢字ひらがな４カタ　カナ「ＳＨＩＯ」。！')
 * // => [ '5', 'romaji', ' ', 'here', '...!?', '漢字', 'ひらがな', 'カタ', '　', 'カナ', '４', '「', 'ＳＨＩＯ', '」。！']
 * tokenize('5romaji here...!?漢字ひらがな４カタ　カナ「ＳＨＩＯ」。！', { compact: true })
 * // => [ '5', 'romaji here', '...!?', '漢字ひらがなカタ　カナ', '４「', 'ＳＨＩＯ', '」。！']
 */
function tokenize(input) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$compact = _ref.compact,
      compact = _ref$compact === undefined ? false : _ref$compact,
      _ref$detailed = _ref.detailed,
      detailed = _ref$detailed === undefined ? false : _ref$detailed;

  if (input == null || isEmpty(input)) {
    return [];
  }
  var chars = [].concat(toConsumableArray(input));
  var initial = chars.shift();
  var prevType = getType(initial, compact);
  initial = detailed ? { type: prevType, value: initial } : initial;

  var result = chars.reduce(function (tokens, char) {
    var currType = getType(char, compact);
    var sameType = currType === prevType;
    prevType = currType;
    var newValue = char;

    if (sameType) {
      newValue = (detailed ? tokens.pop().value : tokens.pop()) + newValue;
    }

    return detailed ? tokens.concat({ type: currType, value: newValue }) : tokens.concat(newValue);
  }, [initial]);
  return result;
}

// IME event listener DOM helpers

exports.bind = bind;
exports.unbind = unbind;
exports.isRomaji = isRomaji;
exports.isJapanese = isJapanese;
exports.isKana = isKana;
exports.isHiragana = isHiragana;
exports.isKatakana = isKatakana;
exports.isMixed = isMixed;
exports.isKanji = isKanji;
exports.toRomaji = toRomaji;
exports.toKana = toKana;
exports.toHiragana = toHiragana;
exports.toKatakana = toKatakana;
exports.stripOkurigana = stripOkurigana;
exports.tokenize = tokenize;
exports.VERSION = VERSION;
exports.TO_KANA_METHODS = TO_KANA_METHODS;
exports.ROMANIZATIONS = ROMANIZATIONS;

Object.defineProperty(exports, '__esModule', { value: true });

})));
