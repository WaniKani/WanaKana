import isCharKatakana from '../../src/utils/isCharKatakana';

describe('isCharKatakana', () => {
  it('sane defaults', () => {
    expect(isCharKatakana()).toBe(false);
    expect(isCharKatakana('')).toBe(false);
  });

  it('passes parameter tests', () => {
    expect(isCharKatakana('ナ')).toBe(true);
    expect(isCharKatakana('は')).toBe(false);
    expect(isCharKatakana('n')).toBe(false);
    expect(isCharKatakana('!')).toBe(false);
  });
});
