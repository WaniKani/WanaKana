import isHiragana from '../../src/isHiragana';

describe('isHiragana()', () => {
  it('sane defaults', () => {
    expect(isHiragana()).toBe(false);
    expect(isHiragana('')).toBe(false);
  });
  it('あ is hiragana', () => expect(isHiragana('あ')).toBe(true));
  it('ああ is hiragana', () => expect(isHiragana('ああ')).toBe(true));
  it('ア is not hiragana', () => expect(isHiragana('ア')).toBe(false));
  it('A is not hiragana', () => expect(isHiragana('A')).toBe(false));
  it('あア is not hiragana', () => expect(isHiragana('あア')).toBe(false));
  it('ignores long dash in hiragana', () => expect(isHiragana('げーむ')).toBe(true));
});
