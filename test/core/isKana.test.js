import isKana from '../../src/isKana';

describe('isKana()', () => {
  it('sane defaults', () => {
    expect(isKana()).toBe(false);
    expect(isKana('')).toBe(false);
  });
  it('あ is kana', () => expect(isKana('あ')).toBe(true));
  it('ア is kana', () => expect(isKana('ア')).toBe(true));
  it('あア is kana', () => expect(isKana('あア')).toBe(true));
  it('A is not kana', () => expect(isKana('A')).toBe(false));
  it('あAア is not kana', () => expect(isKana('あAア')).toBe(false));
  it('ignores long dash in mixed kana', () => expect(isKana('アーあ')).toBe(true));
});
