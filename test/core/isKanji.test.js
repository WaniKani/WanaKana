import isKanji from '../../src/isKanji';

describe('isKanji()', () => {
  it('sane defaults', () => {
    expect(isKanji()).toBe(false);
    expect(isKanji('')).toBe(false);
  });
  it('切腹 is kanji', () => expect(isKanji('切腹')).toBe(true));
  it('刀 is kanji', () => expect(isKanji('刀')).toBe(true));
  it('人々 is kanji', () => expect(isKanji('人々')).toBe(true));
  it('emoji are not kanji', () => expect(isKanji('🐸')).toBe(false));
  it('あ is not kanji', () => expect(isKanji('あ')).toBe(false));
  it('ア is not kanji', () => expect(isKanji('ア')).toBe(false));
  it('あア is not kanji', () => expect(isKanji('あア')).toBe(false));
  it('A is not kanji', () => expect(isKanji('A')).toBe(false));
  it('あAア is not kanji', () => expect(isKanji('あAア')).toBe(false));
  it('１２隻 is not kanji', () => expect(isKanji('１２隻')).toBe(false));
  it('12隻 is not kanji', () => expect(isKanji('12隻')).toBe(false));
  it('隻。 is not kanji', () => expect(isKanji('隻。')).toBe(false));
});
