import isCharHiragana from '../../src/utils/isCharHiragana';

describe('isCharHiragana', () => {
  it('sane defaults', () => {
    expect(isCharHiragana()).toBe(false);
    expect(isCharHiragana('')).toBe(false);
  });
  it('passes parameter tests', () => {
    expect(isCharHiragana('な')).toBe(true);
    expect(isCharHiragana('ナ')).toBe(false);
    expect(isCharHiragana('n')).toBe(false);
    expect(isCharHiragana('!')).toBe(false);
  });
});
