import { transform, getSubTreeOf } from './kanaMappingUtils';
import isKatakana from './isKatakana';
import katakanaToHiragana from './utils/katakanaToHiragana';

export const methods = Object.freeze({
  HEPBURN: 'hepburn',
});

let kanaToHepburnMap = null;

function createKanaToHepburnMap() {
  /* eslint-disable object-property-newline */
  const romajiTree = transform({
    あ: 'a', い: 'i', う: 'u', え: 'e', お: 'o',
    か: 'ka', き: 'ki', く: 'ku', け: 'ke', こ: 'ko',
    さ: 'sa', し: 'shi', す: 'su', せ: 'se', そ: 'so',
    た: 'ta', ち: 'chi', つ: 'tsu', て: 'te', と: 'to',
    な: 'na', に: 'ni', ぬ: 'nu', ね: 'ne', の: 'no',
    は: 'ha', ひ: 'hi', ふ: 'fu', へ: 'he', ほ: 'ho',
    ま: 'ma', み: 'mi', む: 'mu', め: 'me', も: 'mo',
    や: 'ya', ゆ: 'yu', よ: 'yo',
    ら: 'ra', り: 'ri', る: 'ru', れ: 're', ろ: 'ro',
    わ: 'wa', ゐ: 'wi', ゑ: 'we', を: 'wo',
    が: 'ga', ぎ: 'gi', ぐ: 'gu', げ: 'ge', ご: 'go',
    ざ: 'za', じ: 'ji', ず: 'zu', ぜ: 'ze', ぞ: 'zo',
    だ: 'da', ぢ: 'ji', づ: 'zu', で: 'de', ど: 'do',
    ば: 'ba', び: 'bi', ぶ: 'bu', べ: 'be', ぼ: 'bo',
    ぱ: 'pa', ぴ: 'pi', ぷ: 'pu', ぺ: 'pe', ぽ: 'po',
    ゔぁ: 'va', ゔぃ: 'vi', ゔ: 'vu', ゔぇ: 've', ゔぉ: 'vo',
    ん: 'n',
  });

  const subtreeOf = (string) => getSubTreeOf(romajiTree, string);
  const setTrans = (string, transliteration) => { subtreeOf(string)[''] = transliteration; };

  const specialSymbols = {
    '。': '.', '、': ',',
    '：': ':', '・': '/',
    '！': '!', '？': '?',
    '〜': '~', 'ー': '-',
    '「': '‘', '」': '’',
    '『': '“', '』': '”',
    '［': '[', '］': ']',
    '（': '(', '）': ')',
    '｛': '{', '｝': '}',
    '　': ' ',
  };

  for (const [jsymbol, symbol] of Object.entries(specialSymbols)) {
    subtreeOf(jsymbol)[''] = symbol;
  }

  const smallY = { ゃ: 'ya', ゅ: 'yu', ょ: 'yo' };
  const smallYExtra = { ぃ: 'yi', ぇ: 'ye' };
  const smallaiueo = { ぁ: 'a', ぃ: 'i', ぅ: 'u', ぇ: 'e', ぉ: 'o' };

  for (const [rom, kan] of Object.entries(smallY).concat(Object.entries(smallaiueo))) {
    setTrans(rom, kan);
  }

  const yoonKana = ['き', 'に', 'ひ', 'み', 'り', 'ぎ', 'び', 'ぴ', 'ゔ', 'く', 'ふ'];
  // きゃ -> kya
  for (const kana of yoonKana) {
    const fistRomajiLetter = subtreeOf(kana)[''][0];
    for (const [yKan, yRom] of Object.entries(smallY)) {
      setTrans(kana + yKan, fistRomajiLetter + yRom);
    }
    // きぃ -> kyi
    for (const [yKan, yRom] of Object.entries(smallYExtra)) {
      setTrans(kana + yKan, fistRomajiLetter + yRom);
    }
  }
  const yoonExceptions = { し: 'sh', ち: 'ch', じ: 'j', ぢ: 'j' };
  for (const [kana, rom] of Object.entries(yoonExceptions)) {
    // じゃ -> ja
    for (const [yKan, yRom] of Object.entries(smallY)) {
      setTrans(kana + yKan, rom + yRom[1]);
    }
    // じぃ -> jyi, じぇ -> je
    setTrans(`${kana}ぃ`, `${rom}yi`);
    setTrans(`${kana}ぇ`, `${rom}e`);
  }

  // going with the intuitive (yet incorrect) solution where っや -> yya and っぃ -> ii
  // in other words, just assume the sokuon could have been applied to anything

  const sokuonWhitelist = {
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

  function resolveTsu(tree) {
    const result = {};
    for (const [key, value] of Object.entries(tree)) {
      if (!key) {  // we have reached the bottom of this branch
        const consonant = value.charAt(0);
        result[key] = consonant in sokuonWhitelist?
          sokuonWhitelist[consonant] + value:
          value;
      } else {  // more subtrees
        result[key] = resolveTsu(value);
      }
    }
    return result;
  }

  romajiTree['っ'] = resolveTsu(romajiTree);

  const smallLetters = {
    っ: '',
    ゎ: 'wa',
    ゕ: 'ka',
    ゖ: 'ka',  // because katakana is converted to hiragana before calling this function
    ゃ: 'ya',
    ゅ: 'yu',
    ょ: 'yo',
    ぁ: 'a',
    ぃ: 'i',
    ぅ: 'u',
    ぇ: 'e',
    ぉ: 'o',
  };

  for (const [kan, rom] of Object.entries(smallLetters)) {
    setTrans(kan, rom);
  }

  return Object.freeze(JSON.parse(JSON.stringify(romajiTree)));
  /* eslint-enable no-alert, no-console */
}

function getKanaToHepburnTree() {
  if (kanaToHepburnMap === null) {
    kanaToHepburnMap = createKanaToHepburnMap();
  }
  return kanaToHepburnMap;
}

export function getKanaToRomajiTree(fullOptions) {
  switch (fullOptions.romanization) {
    case methods.HEPBURN:
      return getKanaToHepburnTree(fullOptions);
    default:
      return {};
  }
}
