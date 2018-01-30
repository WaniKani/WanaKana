import isRomaji from '../../src/isRomaji';

describe('isRomaji()', () => {
  it('sane defaults', () => {
    expect(isRomaji()).toBe(false);
    expect(isRomaji('')).toBe(false);
  });
  it('A is romaji', () => expect(isRomaji('A')).toBe(true));
  it('xYz is romaji', () => expect(isRomaji('xYz')).toBe(true));
  it('Tōkyō and Ōsaka is romaji', () => expect(isRomaji('Tōkyō and Ōsaka')).toBe(true));
  it('あアA is not romaji', () => expect(isRomaji('あアA')).toBe(false));
  it('お願い is not romaji', () => expect(isRomaji('お願い')).toBe(false));
  it('熟成 is not romaji', () => expect(isRomaji('熟成')).toBe(false));
  it('passes latin punctuation', () => expect(isRomaji('a*b&c-d')).toBe(true));
  it('passes latin numbers', () => expect(isRomaji('0123456789')).toBe(true));
  it('fails zenkaku punctuation', () => expect(isRomaji('a！b&cーd')).toBe(false));
  it('fails zenkaku latin', () => expect(isRomaji('ｈｅｌｌｏ')).toBe(false));
  it('accepts optional allowed chars', () => expect(isRomaji('a！b&cーd', /[！ー]/)).toBe(true));
});
