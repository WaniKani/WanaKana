import { transform, getSubTreeOf } from './kanaMapping';
import { ROMANIZATIONS } from '../constants';

let kanaToHepburnMap = null;

/* eslint-disable */
// prettier-ignore
const BASIC_ROMAJI = {
  あ:'a',    い:'i',   う:'u',   え:'e',    お:'o',
  か:'ka',   き:'ki',  く:'ku',  け:'ke',   こ:'ko',
  さ:'sa',   し:'shi', す:'su',  せ:'se',   そ:'so',
  た:'ta',   ち:'chi', つ:'tsu', て:'te',   と:'to',
  な:'na',   に:'ni',  ぬ:'nu',  ね:'ne',   の:'no',
  は:'ha',   ひ:'hi',  ふ:'fu',  へ:'he',   ほ:'ho',
  ま:'ma',   み:'mi',  む:'mu',  め:'me',   も:'mo',
  ら:'ra',   り:'ri',  る:'ru',  れ:'re',   ろ:'ro',
  や:'ya',   ゆ:'yu',  よ:'yo',
  わ:'wa',   ゐ:'wi',  ゑ:'we',  を:'wo',
  ん: 'n',
  が:'ga',   ぎ:'gi',  ぐ:'gu',  げ:'ge',   ご:'go',
  ざ:'za',   じ:'ji',  ず:'zu',  ぜ:'ze',   ぞ:'zo',
  だ:'da',   ぢ:'ji',  づ:'zu',  で:'de',   ど:'do',
  ば:'ba',   び:'bi',  ぶ:'bu',  べ:'be',   ぼ:'bo',
  ぱ:'pa',   ぴ:'pi',  ぷ:'pu',  ぺ:'pe',   ぽ:'po',
  ゔぁ:'va', ゔぃ:'vi', ゔ:'vu',  ゔぇ:'ve', ゔぉ:'vo',
};
/* eslint-enable  */

const SPECIAL_SYMBOLS = {
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
  '　': ' ',
};

// んい -> n'i
const AMBIGUOUS_VOWELS = ['あ', 'い', 'う', 'え', 'お', 'や', 'ゆ', 'よ'];
const SMALL_Y = { ゃ: 'ya', ゅ: 'yu', ょ: 'yo' };
const SMALL_Y_EXTRA = { ぃ: 'yi', ぇ: 'ye' };
const SMALL_AIUEO = {
  ぁ: 'a',
  ぃ: 'i',
  ぅ: 'u',
  ぇ: 'e',
  ぉ: 'o',
};
const YOON_KANA = [
  'き',
  'に',
  'ひ',
  'み',
  'り',
  'ぎ',
  'び',
  'ぴ',
  'ゔ',
  'く',
  'ふ',
];
const YOON_EXCEPTIONS = {
  し: 'sh',
  ち: 'ch',
  じ: 'j',
  ぢ: 'j',
};
const SMALL_KANA = {
  っ: '',
  ゃ: 'ya',
  ゅ: 'yu',
  ょ: 'yo',
  ぁ: 'a',
  ぃ: 'i',
  ぅ: 'u',
  ぇ: 'e',
  ぉ: 'o',
};

// going with the intuitive (yet incorrect) solution where っや -> yya and っぃ -> ii
// in other words, just assume the sokuon could have been applied to anything
const SOKUON_WHITELIST = {
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
  z: 'z',
};

function getKanaToHepburnTree() {
  if (kanaToHepburnMap == null) {
    kanaToHepburnMap = createKanaToHepburnMap();
  }
  return kanaToHepburnMap;
}

export function getKanaToRomajiTree(romanization) {
  switch (romanization) {
    case ROMANIZATIONS.HEPBURN:
      return getKanaToHepburnTree();
    default:
      return {};
  }
}

function createKanaToHepburnMap() {
  const romajiTree = transform(BASIC_ROMAJI);

  const subtreeOf = (string) => getSubTreeOf(romajiTree, string);
  const setTrans = (string, transliteration) => {
    subtreeOf(string)[''] = transliteration;
  };

  Object.entries(SPECIAL_SYMBOLS).forEach(([jsymbol, symbol]) => {
    subtreeOf(jsymbol)[''] = symbol;
  });

  [...Object.entries(SMALL_Y), ...Object.entries(SMALL_AIUEO)].forEach(
    ([roma, kana]) => {
      setTrans(roma, kana);
    }
  );

  // きゃ -> kya
  YOON_KANA.forEach((kana) => {
    const firstRomajiChar = subtreeOf(kana)[''][0];
    Object.entries(SMALL_Y).forEach(([yKana, yRoma]) => {
      setTrans(kana + yKana, firstRomajiChar + yRoma);
    });
    // きぃ -> kyi
    Object.entries(SMALL_Y_EXTRA).forEach(([yKana, yRoma]) => {
      setTrans(kana + yKana, firstRomajiChar + yRoma);
    });
  });

  Object.entries(YOON_EXCEPTIONS).forEach(([kana, roma]) => {
    // じゃ -> ja
    Object.entries(SMALL_Y).forEach(([yKana, yRoma]) => {
      setTrans(kana + yKana, roma + yRoma[1]);
    });
    // じぃ -> jyi, じぇ -> je
    setTrans(`${kana}ぃ`, `${roma}yi`);
    setTrans(`${kana}ぇ`, `${roma}e`);
  });

  romajiTree['っ'] = resolveTsu(romajiTree);

  Object.entries(SMALL_KANA).forEach(([kana, roma]) => {
    setTrans(kana, roma);
  });

  AMBIGUOUS_VOWELS.forEach((kana) => {
    setTrans(`ん${kana}`, `n'${subtreeOf(kana)['']}`);
  });

  // NOTE: could be re-enabled with an option?
  // // んば -> mbo
  // const LABIAL = [
  //   'ば', 'び', 'ぶ', 'べ', 'ぼ',
  //   'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ',
  //   'ま', 'み', 'む', 'め', 'も',
  // ];
  // LABIAL.forEach((kana) => {
  //   setTrans(`ん${kana}`, `m${subtreeOf(kana)['']}`);
  // });

  return Object.freeze(JSON.parse(JSON.stringify(romajiTree)));
}

function resolveTsu(tree) {
  return Object.entries(tree).reduce((tsuTree, [key, value]) => {
    if (!key) {
      // we have reached the bottom of this branch
      const consonant = value.charAt(0);
      tsuTree[key] = Object.keys(SOKUON_WHITELIST).includes(consonant)
        ? SOKUON_WHITELIST[consonant] + value
        : value;
    } else {
      // more subtrees
      tsuTree[key] = resolveTsu(value);
    }
    return tsuTree;
  }, {});
}
