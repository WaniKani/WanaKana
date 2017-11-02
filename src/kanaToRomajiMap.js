import { transform, getSubTreeOf } from './kanaMappingUtils';

let kanaToHepburnMap = null;

export function createKanaToHepburnMap() {
  /* eslint object-property-newline: ["error", { "allowMultiplePropertiesPerLine": true }] */
  const hepburnTree = {
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
  };

  const romajiTree = transform(hepburnTree);
  const subtreeOf = (string) => getSubTreeOf(romajiTree, string);

  const smallY = { ゃ: 'ya', ゅ: 'yu', ょ: 'yo' };
  const smallYExtra = { ぃ: 'yi', ぇ: 'ye' };
  const smallaiueo = { ぁ: 'a', ぃ: 'i', ぅ: 'u', ぇ: 'e', ぉ: 'o' };

  for (const [rom, kan] of Object.entries(smallY).concat(Object.entries(smallaiueo))) {
    subtreeOf(rom)[''] = kan;
  }

  const yoonKana = ['き', 'に', 'ひ', 'み', 'り', 'ぎ', 'び', 'ぴ', 'ゔ', 'く', 'ふ'];
  // きゃ -> kya
  for (const kana of yoonKana) {
    const fistRomajiLetter = subtreeOf(kana)[''][0];
    for (const [yKan, yRom] of Object.entries(smallY)) {
      subtreeOf(kana + yKan)[''] = fistRomajiLetter + yRom;
    }
    // きぃ -> kyi
    for (const [yKan, yRom] of Object.entries(smallYExtra)) {
      subtreeOf(kana + yKan)[''] = fistRomajiLetter + yRom;
    }
  }
  const yoonExceptions = { し: 'sh', ち: 'ch', じ: 'j', ぢ: 'j' };
  for (const [kana, rom] of Object.entries(yoonExceptions)) {
    // じゃ -> ja
    for (const [yKan, yRom] of Object.entries(smallY)) {
      subtreeOf(kana + yKan)[''] = rom + yRom[1];
    }
    // じぃ -> jyi, じぇ -> je
    subtreeOf(`${kana}ぃ`)[''] = `${rom}yi`;
    subtreeOf(`${kana}ぇ`)[''] = `${rom}e`;
  }

  // going with the intuitive (yet incorrect) solution where っや -> yya and っぃ -> ii
  // in other words, just assume the sokuon could have been applied to anything
  function resolveTsu(tree) {
    const result = {};
    for (const [key, value] of Object.entries(tree)) {
      if (!key) {  // we have reached the bottom of this branch
        // double the fist letter
        if (value.slice(0, 2) === 'ch') {
          // special case is っちゃ -> tcha for example
          result[key] = `tch${value.slice(2)}`;
        } else {
          result[key] = `${value[0]}${value}`;
        }
      } else {  // more subtrees
        result[key] = resolveTsu(value);
      }
    }
    return result;
  }

  romajiTree['っ'] = resolveTsu(romajiTree);
  romajiTree['っ'][''] = 'tsu';

  return Object.freeze(JSON.parse(JSON.stringify(romajiTree)));
}

export function getKanaToHepburnTree() {
  if (kanaToHepburnMap === null) {
    kanaToHepburnMap = createKanaToHepburnMap();
  }
  return kanaToHepburnMap;
}
