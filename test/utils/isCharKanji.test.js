import isCharKanji from '../../src/utils/isCharKanji';

describe('isCharKanji', () => {
  it('sane defaults', () => {
    expect(isCharKanji()).toBe(false);
    expect(isCharKanji('')).toBe(false);
  });

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
