import isCharJapanese from '../../src/utils/isCharJapanese';

describe('isCharJapanese', () => {
  it('sane defaults', () => {
    expect(isCharJapanese()).toBe(false);
    expect(isCharJapanese('')).toBe(false);
  });

  it('passes parameter tests', () => {
    expect(isCharJapanese('１')).toBe(true);
    expect(isCharJapanese('ナ')).toBe(true);
    expect(isCharJapanese('は')).toBe(true);
    expect(isCharJapanese('缶')).toBe(true);
    expect(isCharJapanese('〜')).toBe(true);
    expect(isCharJapanese('ｎ')).toBe(true);
    expect(isCharJapanese('Ｋ')).toBe(true);
    expect(isCharJapanese('1')).toBe(false);
    expect(isCharJapanese('n')).toBe(false);
    expect(isCharJapanese('K')).toBe(false);
    expect(isCharJapanese('!')).toBe(false);
  });
});
