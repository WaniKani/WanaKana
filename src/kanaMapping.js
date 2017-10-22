export function IME_MODE_MAP(map) {
  // in IME mode, we do not want to convert single ns
  const mapCopy = JSON.parse(JSON.stringify(map));
  delete mapCopy.n[''];
  return mapCopy;
}

export const USE_OBSOLETE_KANA_MAP = createCustomRomajiToKanaMapping({ wi: 'ゐ', we: 'ゑ' });

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
    function transform(mapSubtree, customSubtree) {
      if (mapSubtree === undefined || typeof mapSubtree === 'string') {  // replace the subtree
        return customSubtree;
      }
      const result = mapSubtree;
      for (const [char, subtree] of Object.entries(customSubtree)) {
        result[char] = transform(mapSubtree[char], subtree);
      }
      return result;
    }
    return transform(mapCopy, customTree);
  };
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

  // transform the tree, so that for example kanaTree['k']['y']['a'][''] === 'きゃ'
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

  const kanaTree = transform(kunreiTree);

  function getSubTreeOf(string, makeNew=false) {
    let correctSubTree = kanaTree;
    for (const char of string) {
      if (correctSubTree[char] === undefined) {
        if (makeNew) {
          correctSubTree[char] = {};
        } else {
          return undefined;
        }
      }
      correctSubTree = correctSubTree[char];
    }
    return correctSubTree;
  }

  // for (const [consonant, subtree] of Object.entries(kanaTree)) {
  //   kanaTree[consonant] = transform(subtree);
  // }

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
    // sh: 'し',
    // ch: 'ち',
  };
  const smallY = { ya: 'ゃ', yi: 'ぃ', yu: 'ゅ', ye: 'ぇ', yo: 'ょ' };
  const smallaiueo = { a: 'ぁ', i: 'ぃ', u: 'ぅ', e: 'ぇ', o: 'ぉ' };

  // add tya, sya, etc.
  for (const [consonant, yKana] of Object.entries(consonants)) {
    for (const [rom, kan] of Object.entries(smallY)) {
      // for example kyo -> き + ょ
      getSubTreeOf(consonant + rom, true)[''] = yKana + kan;
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
    getSubTreeOf(symbol, true)[''] = jsymbol;
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
      const subtree = getSubTreeOf(consonant + vow, true);
      subtree[''] = aiueoKan + kan;
    }
  }

  // different ways to write ん
  for (const nvar of ['n', 'nn', 'n\'', 'n ', 'xn']) {
    getSubTreeOf(nvar, true)[''] = 'ん';
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
    const parentTree = getSubTreeOf(allExceptLast, true);
    // copy to avoid recursive containment
    parentTree[last] = JSON.parse(JSON.stringify(getSubTreeOf(alternative)));
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
      const xSubtree = getSubTreeOf(xRom, true);
      xSubtree[''] = kan;

      // ltu -> xtu -> っ
      const allExceptLast = kunreiRom.slice(0, kunreiRom.length - 1);
      const last = kunreiRom.charAt(kunreiRom.length - 1);
      const parentTree = getSubTreeOf(`l${allExceptLast}`, true);
      parentTree[last] = xSubtree;
    }

    // ltsu -> ltu -> っ
    for (const altRom of getAlternatives(kunreiRom)) {
      const allExceptLast = altRom.slice(0, altRom.length - 1);
      const last = altRom.charAt(altRom.length - 1);
      for (const prefix of ['l', 'x']) {
        const parentTree = getSubTreeOf(prefix + allExceptLast, true);
        parentTree[last] = getSubTreeOf(prefix + kunreiRom);
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
    getSubTreeOf(string, true)[''] = kana;
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
  const sokuonConsonants = ['k', 'c', 's', 't', 'p'];
  for (const consonant of sokuonConsonants) {
    const subtree = kanaTree[consonant];
    subtree[consonant] = addTsu(subtree);
  }
  // solidify the results, so that there there is referential transparency within the tree
  return JSON.parse(JSON.stringify(kanaTree));
}

export function getRomajiToKanaTree() {
  if (romajiToKanaMap === null) {
    romajiToKanaMap = createRomajiToKanaMap();
  }
  return romajiToKanaMap;
}
