import { JA_PUNC, EN_PUNC } from './helpers/conversionTables';
import { HIRAGANA_END, HIRAGANA_START } from '../src/constants';

import typeOf from '../src/utils/typeOf';
import convertFullwidthCharsToASCII from '../src/utils/convertFullwidthCharsToASCII';
import getChunk from '../src/utils/getChunk';
import getChunkSize from '../src/utils/getChunkSize';
import isEmpty from '../src/utils/isEmpty';
import isCharInRange from '../src/utils/isCharInRange';
import isCharVowel from '../src/utils/isCharVowel';
import isCharConsonant from '../src/utils/isCharConsonant';
import isCharLongDash from '../src/utils/isCharLongDash';
import isCharSlashDot from '../src/utils/isCharSlashDot';
import isCharKatakana from '../src/utils/isCharKatakana';
import isCharHiragana from '../src/utils/isCharHiragana';
import isCharKana from '../src/utils/isCharKana';
import isCharKanji from '../src/utils/isCharKanji';
import isCharRomaji from '../src/utils/isCharRomaji';
import isCharJapanese from '../src/utils/isCharJapanese';
import isCharJapanesePunctuation from '../src/utils/isCharJapanesePunctuation';
import isCharEnglishPunctuation from '../src/utils/isCharEnglishPunctuation';
import isCharPunctuation from '../src/utils/isCharPunctuation';
import isCharUpperCase from '../src/utils/isCharUpperCase';
import romajiToHiragana from '../src/utils/romajiToHiragana';
import hiraganaToKatakana from '../src/utils/hiraganaToKatakana';
import katakanaToHiragana from '../src/utils/katakanaToHiragana';
import { mergeCustomMapping } from '../src/utils/kanaMappingUtils';

describe('Methods should return sane defaults when given no input', () => {
  it('convertFullwidthCharsToASCII()', () => expect(convertFullwidthCharsToASCII()).toBe(''));
  it('getChunk()', () => expect(getChunk()).toBe(''));
  it('getChunkSize()', () => expect(getChunkSize()).toBe(0));
  it('isEmpty()', () => expect(isEmpty()).toBe(true));
  it('isCharInRange()', () => expect(isCharInRange()).toBe(false));
  it('isCharVowel()', () => expect(isCharVowel()).toBe(false));
  it('isCharConsonant()', () => expect(isCharConsonant()).toBe(false));
  it('isCharLongDash()', () => expect(isCharLongDash()).toBe(false));
  it('isCharSlashDot()', () => expect(isCharSlashDot()).toBe(false));
  it('isCharKatakana()', () => expect(isCharKatakana()).toBe(false));
  it('isCharHiragana()', () => expect(isCharHiragana()).toBe(false));
  it('isCharKana()', () => expect(isCharKana()).toBe(false));
  it('isCharKanji()', () => expect(isCharKanji()).toBe(false));
  it('isCharRomaji()', () => expect(isCharRomaji()).toBe(false));
  it('isCharJapanese()', () => expect(isCharJapanese()).toBe(false));
  it('isCharJapanesePunctuation()', () => expect(isCharJapanesePunctuation()).toBe(false));
  it('isCharEnglishPunctuation()', () => expect(isCharEnglishPunctuation()).toBe(false));
  it('isCharPunctuation()', () => expect(isCharPunctuation()).toBe(false));
  it('isCharUpperCase()', () => expect(isCharUpperCase()).toBe(false));
  it('romajiToHiragana() with no input', () => expect(romajiToHiragana()).toBe(''));
  it('hiraganaToKatakana() with no input', () => expect(hiraganaToKatakana()).toBe(''));
  it('katakanaToHiragana() with no input', () => expect(katakanaToHiragana()).toBe(''));
  it('mergeCustomMapping() with no input', () => expect(mergeCustomMapping()).toEqual({}));
  it('typeof() with no input', () => expect(typeOf()).toBe('undefined'));
});

describe('typeOf', () => {
  it('returns correct type strings', () => {
    expect(typeOf({})).toBe('object');
    expect(typeOf([])).toBe('array');
    expect(typeOf(function() {})).toBe('function'); // eslint-disable-line
    expect(typeOf(() => {})).toBe('function');
    expect(typeOf(/a/)).toBe('regexp');
    expect(typeOf(new Date())).toBe('date');
    expect(typeOf(new Map())).toBe('map');
    expect(typeOf(new Set())).toBe('set');
    expect(typeOf(null)).toBe('null');
    expect(typeOf(undefined)).toBe('undefined');
    expect(typeOf('a')).toBe('string');
    expect(typeOf(1)).toBe('number');
    expect(typeOf(true)).toBe('boolean');
  });
});

describe('isEmpty', () => {
  it('passes parameter tests', () => {
    expect(isEmpty()).toBe(true);
    expect(isEmpty(22)).toBe(true);
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty('')).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty('nope')).toBe(false);
  });
});

describe('convertFullwidthCharsToASCII', () => {
  it('passes parameter tests', () => {
    expect(convertFullwidthCharsToASCII('come on ＦＨＱＷＨＧＡＤＳ')).toBe('come on FHQWHGADS');
    expect(convertFullwidthCharsToASCII('ＦＨＱＷＨＧＡＤＳ')).toBe('FHQWHGADS');
    expect(convertFullwidthCharsToASCII('ｆｈｑｗｈｇａｄｓ')).toBe('fhqwhgads');
  });
});

describe('getChunk', () => {
  it('passes parameter tests', () => {
    expect(getChunk('derpalerp', 3, 6)).toBe('pal');
    expect(getChunk('de', 0, 1)).toBe('d');
    expect(getChunk('', 1, 2)).toBe('');
  });
});

describe('getChunkSize', () => {
  it('passes parameter tests', () => {
    expect(getChunkSize(4, 2)).toBe(2);
    expect(getChunkSize(2, 2)).toBe(2);
    expect(getChunkSize(2, 4)).toBe(2);
    expect(getChunkSize(0, 0)).toBe(0);
    expect(getChunkSize(3, -1)).toBe(-1);
  });
});

describe('isCharInRange', () => {
  it('passes parameter tests', () => {
    expect(isCharInRange('は', HIRAGANA_START, HIRAGANA_END)).toBe(true);
    expect(isCharInRange('d', HIRAGANA_START, HIRAGANA_END)).toBe(false);
  });
});

describe('isCharVowel', () => {
  it('passes parameter tests', () => {
    [...'aeiou'].forEach((vowel) => expect(isCharVowel(vowel)).toBe(true));
    expect(isCharVowel('y' /* includes 'y' as a vowel by default */)).toBe(true);
    expect(isCharVowel('y', false /* excludes 'y' as a vowel */)).toBe(false);
    expect(isCharVowel('x')).toBe(false);
    expect(isCharVowel('!')).toBe(false);
    expect(isCharVowel('')).toBe(false);
  });
});

describe('isCharConsonant', () => {
  it('passes parameter tests', () => {
    [...'bcdfghjklmnpqrstvwxyz'].forEach((consonant) =>
      expect(isCharConsonant(consonant)).toBe(true)
    );
    expect(isCharConsonant('y', false /* excludes 'y' as a consonant */)).toBe(false);
    expect(isCharConsonant('a')).toBe(false);
    expect(isCharConsonant('!')).toBe(false);
    expect(isCharConsonant('')).toBe(false);
  });
});

describe('isCharLongDash', () => {
  it('passes parameter tests', () => {
    expect(isCharLongDash('ー')).toBe(true);
    expect(isCharLongDash('-')).toBe(false);
    expect(isCharLongDash('f')).toBe(false);
    expect(isCharLongDash('ふ')).toBe(false);
  });
});

describe('isCharSlashDot', () => {
  it('passes parameter tests', () => {
    expect(isCharSlashDot('・')).toBe(true);
    expect(isCharSlashDot('/')).toBe(false);
    expect(isCharSlashDot('f')).toBe(false);
    expect(isCharSlashDot('ふ')).toBe(false);
  });
});

describe('isCharRomaji', () => {
  it('passes parameter tests', () => {
    expect(isCharRomaji('n')).toBe(true);
    expect(isCharRomaji('!')).toBe(true);
    expect(isCharRomaji('ナ')).toBe(false);
    expect(isCharRomaji('は')).toBe(false);
    expect(isCharRomaji('缶')).toBe(false);
    expect(isCharRomaji('')).toBe(false);
  });
});

describe('isCharJapanese', () => {
  it('passes parameter tests', () => {
    // zenkaku/latin numbers considered neutral
    expect(isCharJapanese('１')).toBe(true);
    expect(isCharJapanese('1')).toBe(true);
    expect(isCharJapanese('ナ')).toBe(true);
    expect(isCharJapanese('は')).toBe(true);
    expect(isCharJapanese('缶')).toBe(true);
    expect(isCharJapanese('〜')).toBe(true);
    expect(isCharJapanese('n')).toBe(false);
    expect(isCharJapanese('!')).toBe(false);
    expect(isCharJapanese('')).toBe(false);
  });
});

describe('isCharKatakana', () => {
  it('passes parameter tests', () => {
    expect(isCharKatakana('ナ')).toBe(true);
    expect(isCharKatakana('は')).toBe(false);
    expect(isCharKatakana('n')).toBe(false);
    expect(isCharKatakana('!')).toBe(false);
    expect(isCharKatakana('')).toBe(false);
  });
});

describe('isCharHiragana', () => {
  it('passes parameter tests', () => {
    expect(isCharHiragana('な')).toBe(true);
    expect(isCharHiragana('ナ')).toBe(false);
    expect(isCharHiragana('n')).toBe(false);
    expect(isCharHiragana('!')).toBe(false);
    expect(isCharHiragana('')).toBe(false);
  });
});

describe('isCharKana', () => {
  it('passes parameter tests', () => {
    expect(isCharKana('は')).toBe(true);
    expect(isCharKana('ナ')).toBe(true);
    expect(isCharKana('n')).toBe(false);
    expect(isCharKana('!')).toBe(false);
    expect(isCharKana('')).toBe(false);
    expect(isCharKana('-')).toBe(false);
    expect(isCharKana('ー')).toBe(true);
  });
});

describe('isCharKanji', () => {
  it('passes parameter tests', () => {
    expect(isCharKanji('腹')).toBe(true);
    expect(isCharKanji('一')).toBe(true); // kanji for いち・1 - not a long hyphen
    expect(isCharKanji('ー')).toBe(false); // long hyphen
    expect(isCharKanji('は')).toBe(false);
    expect(isCharKanji('ナ')).toBe(false);
    expect(isCharKanji('n')).toBe(false);
    expect(isCharKanji('!')).toBe(false);
    expect(isCharKanji('')).toBe(false);
  });
});

describe('isCharJapanesePunctuation', () => {
  it('passes parameter tests', () => {
    expect(JA_PUNC.every((char) => isCharJapanesePunctuation(char))).toBe(true);
    expect(EN_PUNC.every((char) => isCharJapanesePunctuation(char))).toBe(false);
    expect(isCharJapanesePunctuation('　')).toBe(true);
    expect(isCharJapanesePunctuation('?')).toBe(false);
    expect(isCharJapanesePunctuation('a')).toBe(false);
    expect(isCharJapanesePunctuation('ふ')).toBe(false);
    expect(isCharJapanesePunctuation('字')).toBe(false);
    expect(isCharJapanesePunctuation('')).toBe(false);
  });
});

describe('isCharEnglishPunctuation', () => {
  it('passes parameter tests', () => {
    expect(EN_PUNC.every((char) => isCharEnglishPunctuation(char))).toBe(true);
    expect(JA_PUNC.every((char) => isCharEnglishPunctuation(char))).toBe(false);
    expect(isCharEnglishPunctuation(' ')).toBe(true);
    expect(isCharEnglishPunctuation('a')).toBe(false);
    expect(isCharEnglishPunctuation('ふ')).toBe(false);
    expect(isCharEnglishPunctuation('字')).toBe(false);
    expect(isCharEnglishPunctuation('')).toBe(false);
  });
});

describe('isCharPunctuation', () => {
  it('passes parameter tests', () => {
    expect(JA_PUNC.every((char) => isCharPunctuation(char))).toBe(true);
    expect(EN_PUNC.every((char) => isCharPunctuation(char))).toBe(true);
    expect(isCharPunctuation(' ')).toBe(true);
    expect(isCharPunctuation('　')).toBe(true);
    expect(isCharPunctuation('a')).toBe(false);
    expect(isCharPunctuation('ふ')).toBe(false);
    expect(isCharPunctuation('字')).toBe(false);
    expect(isCharPunctuation('')).toBe(false);
  });
});

describe('isCharUpperCase', () => {
  it('passes parameter tests', () => {
    expect(isCharUpperCase('A')).toBe(true);
    expect(isCharUpperCase('D')).toBe(true);
    expect(isCharUpperCase('')).toBe(false);
    expect(isCharUpperCase('-')).toBe(false);
    expect(isCharUpperCase('ー')).toBe(false);
    expect(isCharUpperCase('a')).toBe(false);
    expect(isCharUpperCase('d')).toBe(false);
  });
});
