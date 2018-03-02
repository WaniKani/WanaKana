import isMixed from '../../src/isMixed';

describe('isMixed()', () => {
  it('sane defaults', () => {
    expect(isMixed()).toBe(false);
    expect(isMixed('')).toBe(false);
  });
  it('Aア is mixed', () => expect(isMixed('Aア')).toBe(true));
  it('Aあ is mixed', () => expect(isMixed('Aあ')).toBe(true));
  it('Aあア is mixed', () => expect(isMixed('Aあア')).toBe(true));
  it('２あア is not mixed', () => expect(isMixed('２あア')).toBe(false));
  it('お腹A is mixed', () => expect(isMixed('お腹A')).toBe(true));
  it('お腹A is not mixed when { passKanji: false }', () =>
    expect(isMixed('お腹A', { passKanji: false })).toBe(false));
  it('お腹 is not mixed', () => expect(isMixed('お腹')).toBe(false));
  it('腹 is not mixed', () => expect(isMixed('腹')).toBe(false));
  it('A is not mixed', () => expect(isMixed('A')).toBe(false));
  it('あ is not mixed', () => expect(isMixed('あ')).toBe(false));
  it('ア is not mixed', () => expect(isMixed('ア')).toBe(false));
});
