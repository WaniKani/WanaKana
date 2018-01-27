import isKatakana from '../../src/isKatakana';

describe('isKatakana()', () => {
  it('sane defaults', () => {
    expect(isKatakana()).toBe(false);
    expect(isKatakana('')).toBe(false);
  });
  it('アア is katakana', () => expect(isKatakana('アア')).toBe(true));
  it('ア is katakana', () => expect(isKatakana('ア')).toBe(true));
  it('あ is not katakana', () => expect(isKatakana('あ')).toBe(false));
  it('A is not katakana', () => expect(isKatakana('A')).toBe(false));
  it('あア is not katakana', () => expect(isKatakana('あア')).toBe(false));
  it('ignores long dash in katakana', () => expect(isKatakana('ゲーム')).toBe(true));
});
