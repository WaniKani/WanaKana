export function IME_MODE_MAP(map) {
  // in IME mode, we do not want to convert single ns
  const mapCopy = JSON.parse(JSON.stringify(map));
  // two typed ns should produce a single ん in IME mode
  delete mapCopy.n[''];
  mapCopy.n.n = { '': 'ん' };
  mapCopy.n[' '] = { '': 'ん' };
  return mapCopy;
}

export const USE_OBSOLETE_KANA_MAP = createCustomRomajiToKanaMapping({ wi: 'ゐ', we: 'ゑ' });

// transform the tree, so that for example hepburnTree['ゔ']['ぁ'][''] === 'va'
// or kanaTree['k']['y']['a'][''] === 'きゃ'
function transform(tree) {
  const result = {};
  for (const [char, subtree] of Object.entries(tree)) {
    if (typeof subtree === 'string') {  // we have reached the bottom of this branch
      result[char] = { '': subtree };
    } else {  // more subtrees to go through
      result[char] = transform(subtree);
    }
  }
  return result;
}

function getSubTreeOf(tree, string) {
  let correctSubTree = tree;
  for (const char of string) {
    if (correctSubTree[char] === undefined) {
      correctSubTree[char] = {};
    }
    correctSubTree = correctSubTree[char];
  }
  return correctSubTree;
}

// map is an object {romajiString: kanaString}
export function createCustomRomajiToKanaMapping(customMap) {
  const customTree = {};
  for (const [rom, kan] of Object.entries(customMap)) {
    let subTree = customTree;
    for (const char of rom) {
      if (subTree[char] === undefined) {
        subTree[char] = {};
      }
      subTree = subTree[char];
    }
    subTree[''] = kan;
  }

  return function makeMap(map) {
    const mapCopy = JSON.parse(JSON.stringify(map));
    function transformMap(mapSubtree, customSubtree) {
      if (mapSubtree === undefined || typeof mapSubtree === 'string') {  // replace the subtree
        return customSubtree;
      }
      const result = mapSubtree;
      for (const [char, subtree] of Object.entries(customSubtree)) {
        result[char] = transformMap(mapSubtree[char], subtree);
      }
      return result;
    }
    return transformMap(mapCopy, customTree);
  };
}

function createKanaToHepburnMap() {
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
      subtreeOf(kana + yKan)[''] = rom + yRom[0];
    }
    // じぃ -> jyi, じぇ -> je
    subtreeOf(`${kana}ぃ`)[''] = `${rom}yi`;
    subtreeOf(`${kana}ぇ`)[''] = `${rom}e`;
  }

  return Object.freeze(JSON.parse(JSON.stringify(romajiTree)));
}

let romajiToKanaMap = null;

function createRomajiToKanaMap() {
  // not exactly kunrei shiki, for example ぢゃ -> dya instead of zya, to avoid name clashing
  const kunreiTree = {
    a: 'あ',
    i: 'い',
    u: 'う',
    e: 'え',
    o: 'お',
    k: { a: 'か', i: 'き', u: 'く', e: 'け', o: 'こ' },
    s: { a: 'さ', i: 'し', u: 'す', e: 'せ', o: 'そ' },
    t: { a: 'た', i: 'ち', u: 'つ', e: 'て', o: 'と' },
    n: { a: 'な', i: 'に', u: 'ぬ', e: 'ね', o: 'の' },
    h: { a: 'は', i: 'ひ', u: 'ふ', e: 'へ', o: 'ほ' },
    m: { a: 'ま', i: 'み', u: 'む', e: 'め', o: 'も' },
    y: { a: 'や', u: 'ゆ', o: 'よ' },
    r: { a: 'ら', i: 'り', u: 'る', e: 'れ', o: 'ろ' },
    w: { a: 'わ', i: 'ゐ', e: 'ゑ', o: 'を' },
    g: { a: 'が', i: 'ぎ', u: 'ぐ', e: 'げ', o: 'ご' },
    z: { a: 'ざ', i: 'じ', u: 'ず', e: 'ぜ', o: 'ぞ' },
    d: { a: 'だ', i: 'ぢ', u: 'づ', e: 'で', o: 'ど' },
    b: { a: 'ば', i: 'び', u: 'ぶ', e: 'べ', o: 'ぼ' },
    p: { a: 'ぱ', i: 'ぴ', u: 'ぷ', e: 'ぺ', o: 'ぽ' },

    v: { a: 'ゔぁ', i: 'ゔぃ', u: 'ゔ', e: 'ゔぇ', o: 'ゔぉ' },
  };

  const kanaTree = transform(kunreiTree);
  // pseudo partial application
  const subtreeOf = (string) => getSubTreeOf(kanaTree, string);

  const consonants = {
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

  const smallY = { ya: 'ゃ', yi: 'ぃ', yu: 'ゅ', ye: 'ぇ', yo: 'ょ' };
  const smallaiueo = { a: 'ぁ', i: 'ぃ', u: 'ぅ', e: 'ぇ', o: 'ぉ' };

  // add tya, sya, etc.
  for (const [consonant, yKana] of Object.entries(consonants)) {
    for (const [rom, kan] of Object.entries(smallY)) {
      // for example kyo -> き + ょ
      subtreeOf(consonant + rom)[''] = yKana + kan;
    }
  }

  const specialSymbols = {
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

  for (const [symbol, jsymbol] of Object.entries(specialSymbols)) {
    subtreeOf(symbol)[''] = jsymbol;
  }

  const aiueoConstructions = {
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
    f: 'ふ',
  };

  // things like うぃ, くぃ, etc.
  for (const [consonant, aiueoKan] of Object.entries(aiueoConstructions)) {
    for (const [vow, kan] of Object.entries(smallaiueo)) {
      const subtree = subtreeOf(consonant + vow);
      subtree[''] = aiueoKan + kan;
    }
  }

  // different ways to write ん
  for (const nvar of ['n', 'n\'', 'xn']) {
    subtreeOf(nvar)[''] = 'ん';
  }

  // typing one should be the same as having typed the other instead
  const alternativeMappings = {
    sh: 'sy',  // sha -> sya
    ch: 'ty',  // cho -> tyo
    cy: 'ty',  // cyo -> tyo
    chy: 'ty',  // chyu -> tyu
    shy: 'sy',  // shya -> sya
    j: 'zy',  // ja -> zya
    jy: 'zy',  // jye -> zye

    // exceptions to above rules
    shi: 'si',
    chi: 'ti',
    tsu: 'tu',
    ji: 'zi',
    fu: 'hu',
  };

  // c is equivalent to k, but not for chi, cha, etc. that's why we have to make a copy of k
  kanaTree.c = JSON.parse(JSON.stringify(kanaTree.k));

  for (const [string, alternative] of Object.entries(alternativeMappings)) {
    const allExceptLast = string.slice(0, string.length - 1);
    const last = string.charAt(string.length - 1);
    const parentTree = subtreeOf(allExceptLast);
    // copy to avoid recursive containment
    parentTree[last] = JSON.parse(JSON.stringify(subtreeOf(alternative)));
  }


  // xtu -> っ
  const smallLetters = Object.assign({ tu: 'っ', wa: 'ゎ', ka: 'ヵ', ke: 'ヶ' }, smallaiueo, smallY);

  function getAlternatives(string) {
    const result = [];
    for (const [alt, rom] of Object.entries(alternativeMappings).concat([['c', 'k']])) {
      if (string.startsWith(rom)) {
        result.push(string.replace(rom, alt));
      }
    }
    return result;
  }

  for (const [kunreiRom, kan] of Object.entries(smallLetters)) {
    {
      const xRom = `x${kunreiRom}`;
      const xSubtree = subtreeOf(xRom);
      xSubtree[''] = kan;

      // ltu -> xtu -> っ
      const allExceptLast = kunreiRom.slice(0, kunreiRom.length - 1);
      const last = kunreiRom.charAt(kunreiRom.length - 1);
      const parentTree = subtreeOf(`l${allExceptLast}`);
      parentTree[last] = xSubtree;
    }

    // ltsu -> ltu -> っ
    for (const altRom of getAlternatives(kunreiRom)) {
      const allExceptLast = altRom.slice(0, altRom.length - 1);
      const last = altRom.charAt(altRom.length - 1);
      for (const prefix of ['l', 'x']) {
        const parentTree = subtreeOf(prefix + allExceptLast);
        parentTree[last] = subtreeOf(prefix + kunreiRom);
      }
    }
  }

  // don't follow any notable patterns
  const individualCases = {
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

  for (const [string, kana] of Object.entries(individualCases)) {
    subtreeOf(string)[''] = kana;
  }

  // add kka, tta, etc.
  function addTsu(tree) {
    const result = {};
    for (const [key, value] of Object.entries(tree)) {
      if (!key) {  // we have reached the bottom of this branch
        result[key] = `っ${value}`;
      } else {  // more subtrees
        result[key] = addTsu(value);
      }
    }
    return result;
  }

  // have to explicitly name c here, because we made it a copy of k, not a reference
  for (const consonant of Object.keys(consonants).concat('c', 'y', 'w', 'j')) {
    const subtree = kanaTree[consonant];
    subtree[consonant] = addTsu(subtree);
  }
  // nn should not be っん
  delete kanaTree.n.n;
  // solidify the results, so that there there is referential transparency within the tree
  return Object.freeze(JSON.parse(JSON.stringify(kanaTree)));
}

export function getRomajiToKanaTree() {
  if (romajiToKanaMap === null) {
    romajiToKanaMap = createRomajiToKanaMap();
  }
  return romajiToKanaMap;
}
