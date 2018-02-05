import toRomaji from '../../src/toRomaji';
import { JA_PUNC, EN_PUNC } from '../helpers/conversionTables';

describe('toRomaji()', () => {
  it('sane defaults', () => {
    expect(toRomaji()).toBe('');
    expect(toRomaji('')).toBe('');
  });

  it('Convert katakana to romaji', () =>
    expect(toRomaji('ワニカニ　ガ　スゴイ　ダ')).toBe('wanikani ga sugoi da'));

  it('Convert hiragana to romaji', () =>
    expect(toRomaji('わにかに　が　すごい　だ')).toBe('wanikani ga sugoi da'));

  it('Convert mixed kana to romaji', () =>
    expect(toRomaji('ワニカニ　が　すごい　だ')).toBe('wanikani ga sugoi da'));

  it('Will convert punctuation and full-width spaces', () =>
    expect(toRomaji(JA_PUNC.join(''))).toBe(EN_PUNC.join('')));

  it('Use the upcaseKatakana flag to preserve casing. Works for katakana.', () =>
    expect(toRomaji('ワニカニ', { upcaseKatakana: true })).toBe('WANIKANI'));

  it('Use the upcaseKatakana flag to preserve casing. Works for mixed kana.', () =>
    expect(toRomaji('ワニカニ　が　すごい　だ', { upcaseKatakana: true })).toBe('WANIKANI ga sugoi da'));

  it("Converts long dash 'ー' in hiragana to hyphen", () =>
    expect(toRomaji('ばつげーむ')).toBe('batsuge-mu'));

  it("Doesn't confuse '一' (one kanji) for long dash 'ー'", () =>
    expect(toRomaji('一抹げーむ')).toBe('一抹ge-mu'));

  it("Converts long dash 'ー' (chōonpu) in katakana to long vowel", () =>
    expect(toRomaji('スーパー')).toBe('suupaa'));

  it('Spaces must be manually entered', () =>
    expect(toRomaji('わにかにがすごいだ')).not.toBe('wanikani ga sugoi da'));

  describe("double n's and double consonants", () => {
    it('Double and single n', () => expect(toRomaji('きんにくまん')).toBe('kinnikuman'));
    it('N extravaganza', () => expect(toRomaji('んんにんにんにゃんやん')).toBe("nnninninnyan'yan"));
    it('Double consonants', () =>
      expect(toRomaji('かっぱ　たった　しゅっしゅ ちゃっちゃ　やっつ')).toBe('kappa tatta shusshu chatcha yattsu'));
  });

  describe('Small kana', () => {
    it("Small tsu doesn't transliterate", () => expect(toRomaji('っ')).toBe(''));
    it("Small kata ke doesn't transliterate", () => expect(toRomaji('ヶ')).toBe('ヶ'));
    it("Small kata ka doesn't transliterate", () => expect(toRomaji('ヵ')).toBe('ヵ'));
    it('Small ya', () => expect(toRomaji('ゃ')).toBe('ya'));
    it('Small yu', () => expect(toRomaji('ゅ')).toBe('yu'));
    it('Small yo', () => expect(toRomaji('ょ')).toBe('yo'));
    it('Small a', () => expect(toRomaji('ぁ')).toBe('a'));
    it('Small i', () => expect(toRomaji('ぃ')).toBe('i'));
    it('Small u', () => expect(toRomaji('ぅ')).toBe('u'));
    it('Small e', () => expect(toRomaji('ぇ')).toBe('e'));
    it('Small o', () => expect(toRomaji('ぉ')).toBe('o'));
  });

  describe('Apostrophes in ambiguous consonant vowel combos', () => {
    it('おんよみ', () => expect(toRomaji('おんよみ')).toBe("on'yomi"));
    it('んよ んあ んゆ', () => expect(toRomaji('んよ んあ んゆ')).toBe("n'yo n'a n'yu"));
    it('シンヨ', () => expect(toRomaji('シンヨ')).toBe("shin'yo"));
  });
});
