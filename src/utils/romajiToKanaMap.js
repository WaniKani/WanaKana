import { transform, getSubTreeOf, createCustomMapping } from './kanaMapping';

let romajiToKanaMap = null;

function createRomajiToKanaMap() {
  // not exactly kunrei shiki, for example ぢゃ -> dya instead of zya, to avoid name clashing
  const kunreiTree = {
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
      o: 'こ',
    },
    s: {
      a: 'さ',
      i: 'し',
      u: 'す',
      e: 'せ',
      o: 'そ',
    },
    t: {
      a: 'た',
      i: 'ち',
      u: 'つ',
      e: 'て',
      o: 'と',
    },
    n: {
      a: 'な',
      i: 'に',
      u: 'ぬ',
      e: 'ね',
      o: 'の',
    },
    h: {
      a: 'は',
      i: 'ひ',
      u: 'ふ',
      e: 'へ',
      o: 'ほ',
    },
    m: {
      a: 'ま',
      i: 'み',
      u: 'む',
      e: 'め',
      o: 'も',
    },
    y: { a: 'や', u: 'ゆ', o: 'よ' },
    r: {
      a: 'ら',
      i: 'り',
      u: 'る',
      e: 'れ',
      o: 'ろ',
    },
    w: {
      a: 'わ',
      i: 'ゐ',
      e: 'ゑ',
      o: 'を',
    },
    g: {
      a: 'が',
      i: 'ぎ',
      u: 'ぐ',
      e: 'げ',
      o: 'ご',
    },
    z: {
      a: 'ざ',
      i: 'じ',
      u: 'ず',
      e: 'ぜ',
      o: 'ぞ',
    },
    d: {
      a: 'だ',
      i: 'ぢ',
      u: 'づ',
      e: 'で',
      o: 'ど',
    },
    b: {
      a: 'ば',
      i: 'び',
      u: 'ぶ',
      e: 'べ',
      o: 'ぼ',
    },
    p: {
      a: 'ぱ',
      i: 'ぴ',
      u: 'ぷ',
      e: 'ぺ',
      o: 'ぽ',
    },

    v: {
      a: 'ゔぁ',
      i: 'ゔぃ',
      u: 'ゔ',
      e: 'ゔぇ',
      o: 'ゔぉ',
    },
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

  const smallY = {
    ya: 'ゃ',
    yi: 'ぃ',
    yu: 'ゅ',
    ye: 'ぇ',
    yo: 'ょ',
  };
  const smallaiueo = {
    a: 'ぁ',
    i: 'ぃ',
    u: 'ぅ',
    e: 'ぇ',
    o: 'ぉ',
  };

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
  for (const nvar of ['n', "n'", 'xn']) {
    subtreeOf(nvar)[''] = 'ん';
  }

  // typing one should be the same as having typed the other instead
  const alternativeMappings = {
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
  const smallLetters = Object.assign(
    {
      tu: 'っ',
      wa: 'ゎ',
      ka: 'ヵ',
      ke: 'ヶ',
    },
    smallaiueo,
    smallY
  );

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
      if (!key) {
        // we have reached the bottom of this branch
        result[key] = `っ${value}`;
      } else {
        // more subtrees
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

export function getRomajiToKanaTree(config) {
  if (romajiToKanaMap === null) {
    romajiToKanaMap = createRomajiToKanaMap();
  }
  return romajiToKanaMap;
}

export const USE_OBSOLETE_KANA_MAP = createCustomMapping({ wi: 'ゐ', we: 'ゑ' });

export function IME_MODE_MAP(map) {
  // in IME mode, we do not want to convert single ns
  const mapCopy = JSON.parse(JSON.stringify(map));
  mapCopy.n.n = { '': 'ん' };
  mapCopy.n[' '] = { '': 'ん' };
  return mapCopy;
}
