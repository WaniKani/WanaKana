import { transform, getSubTreeOf, createCustomMapping } from './kanaMapping';

// NOTE: not exactly kunrei shiki, for example ぢゃ -> dya instead of zya, to avoid name clashing
/* eslint-disable */
// prettier-ignore
const BASIC_KUNREI = {
  a: 'あ', i: 'い', u: 'う', e: 'え', o: 'お',
  k: { a: 'か', i: 'き', u: 'く', e: 'け', o: 'こ', },
  s: { a: 'さ', i: 'し', u: 'す', e: 'せ', o: 'そ', },
  t: { a: 'た', i: 'ち', u: 'つ', e: 'て', o: 'と', },
  n: { a: 'な', i: 'に', u: 'ぬ', e: 'ね', o: 'の', },
  h: { a: 'は', i: 'ひ', u: 'ふ', e: 'へ', o: 'ほ', },
  m: { a: 'ま', i: 'み', u: 'む', e: 'め', o: 'も', },
  y: { a: 'や', u: 'ゆ', o: 'よ' },
  r: { a: 'ら', i: 'り', u: 'る', e: 'れ', o: 'ろ', },
  w: { a: 'わ', i: 'ゐ', e: 'ゑ', o: 'を', },
  g: { a: 'が', i: 'ぎ', u: 'ぐ', e: 'げ', o: 'ご', },
  z: { a: 'ざ', i: 'じ', u: 'ず', e: 'ぜ', o: 'ぞ', },
  d: { a: 'だ', i: 'ぢ', u: 'づ', e: 'で', o: 'ど', },
  b: { a: 'ば', i: 'び', u: 'ぶ', e: 'べ', o: 'ぼ', },
  p: { a: 'ぱ', i: 'ぴ', u: 'ぷ', e: 'ぺ', o: 'ぽ', },
  v: { a: 'ゔぁ', i: 'ゔぃ', u: 'ゔ', e: 'ゔぇ', o: 'ゔぉ', },
};

const SPECIAL_SYMBOLS = {
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
  '}': '｝',
};

const CONSONANTS = {
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
  f: 'ふ',
};
const SMALL_Y = { ya: 'ゃ', yi: 'ぃ', yu: 'ゅ', ye: 'ぇ', yo: 'ょ' };
const SMALL_VOWELS = { a: 'ぁ', i: 'ぃ', u: 'ぅ', e: 'ぇ', o: 'ぉ' };

// typing one should be the same as having typed the other instead
const ALIASES = {
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
  fu: 'hu',
};

// xtu -> っ
const SMALL_LETTERS = Object.assign(
  {
    tu: 'っ',
    wa: 'ゎ',
    ka: 'ヵ',
    ke: 'ヶ',
  },
  SMALL_VOWELS,
  SMALL_Y
);

// don't follow any notable patterns
const SPECIAL_CASES = {
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
  dho: 'でょ',
};

const AIUEO_CONSTRUCTIONS = {
  wh: 'う',
  kw: 'く',
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
  f: 'ふ',
};

/* eslint-enable */
function createRomajiToKanaMap() {
  const kanaTree = transform(BASIC_KUNREI);
  // pseudo partial application
  const subtreeOf = (string) => getSubTreeOf(kanaTree, string);

  // add tya, sya, etc.
  Object.entries(CONSONANTS).forEach(([consonant, yKana]) => {
    Object.entries(SMALL_Y).forEach(([roma, kana]) => {
      // for example kyo -> き + ょ
      subtreeOf(consonant + roma)[''] = yKana + kana;
    });
  });

  Object.entries(SPECIAL_SYMBOLS).forEach(([symbol, jsymbol]) => {
    subtreeOf(symbol)[''] = jsymbol;
  });

  // things like うぃ, くぃ, etc.
  Object.entries(AIUEO_CONSTRUCTIONS).forEach(([consonant, aiueoKana]) => {
    Object.entries(SMALL_VOWELS).forEach(([vowel, kana]) => {
      const subtree = subtreeOf(consonant + vowel);
      subtree[''] = aiueoKana + kana;
    });
  });

  // different ways to write ん
  ['n', "n'", 'xn'].forEach((nChar) => {
    subtreeOf(nChar)[''] = 'ん';
  });

  // c is equivalent to k, but not for chi, cha, etc. that's why we have to make a copy of k
  kanaTree.c = JSON.parse(JSON.stringify(kanaTree.k));

  Object.entries(ALIASES).forEach(([string, alternative]) => {
    const allExceptLast = string.slice(0, string.length - 1);
    const last = string.charAt(string.length - 1);
    const parentTree = subtreeOf(allExceptLast);
    // copy to avoid recursive containment
    parentTree[last] = JSON.parse(JSON.stringify(subtreeOf(alternative)));
  });

  function getAlternatives(string) {
    return [...Object.entries(ALIASES), ...[['c', 'k']]].reduce(
      (list, [alt, roma]) => (string.startsWith(roma) ? list.concat(string.replace(roma, alt)) : list),
      []
    );
  }

  Object.entries(SMALL_LETTERS).forEach(([kunreiRoma, kana]) => {
    const last = (char) => char.charAt(char.length - 1);
    const allExceptLast = (chars) => chars.slice(0, chars.length - 1);
    const xRoma = `x${kunreiRoma}`;
    const xSubtree = subtreeOf(xRoma);
    xSubtree[''] = kana;

    // ltu -> xtu -> っ
    const parentTree = subtreeOf(`l${allExceptLast(kunreiRoma)}`);
    parentTree[last(kunreiRoma)] = xSubtree;

    // ltsu -> ltu -> っ
    getAlternatives(kunreiRoma).forEach((altRoma) => {
      ['l', 'x'].forEach((prefix) => {
        const altParentTree = subtreeOf(prefix + allExceptLast(altRoma));
        altParentTree[last(altRoma)] = subtreeOf(prefix + kunreiRoma);
      });
    });
  });

  Object.entries(SPECIAL_CASES).forEach(([string, kana]) => {
    subtreeOf(string)[''] = kana;
  });

  // add kka, tta, etc.
  function addTsu(tree) {
    return Object.entries(tree).reduce((tsuTree, [key, value]) => {
      if (!key) {
        // we have reached the bottom of this branch
        // eslint-disable-next-line no-param-reassign
        tsuTree[key] = `っ${value}`;
      } else {
        // more subtrees
        // eslint-disable-next-line no-param-reassign
        tsuTree[key] = addTsu(value);
      }
      return tsuTree;
    }, {});
  }
  // have to explicitly name c here, because we made it a copy of k, not a reference
  [...Object.keys(CONSONANTS), 'c', 'y', 'w', 'j'].forEach((consonant) => {
    const subtree = kanaTree[consonant];
    subtree[consonant] = addTsu(subtree);
  });
  // nn should not be っん
  delete kanaTree.n.n;
  // solidify the results, so that there there is referential transparency within the tree
  return Object.freeze(JSON.parse(JSON.stringify(kanaTree)));
}

let romajiToKanaMap = null;

export function getRomajiToKanaTree() {
  if (romajiToKanaMap == null) {
    romajiToKanaMap = createRomajiToKanaMap();
  }
  return romajiToKanaMap;
}

export const USE_OBSOLETE_KANA_MAP = createCustomMapping({
  wi: 'ゐ',
  we: 'ゑ',
});

export function IME_MODE_MAP(map) {
  // in IME mode, we do not want to convert single ns
  const mapCopy = JSON.parse(JSON.stringify(map));
  mapCopy.n.n = { '': 'ん' };
  mapCopy.n[' '] = { '': 'ん' };
  return mapCopy;
}
