import isCharKana from '../../src/utils/isCharKana';

describe('isCharKana', () => {
  it('sane defaults', () => {
    expect(isCharKana()).toBe(false);
    expect(isCharKana('')).toBe(false);
  });

  it('passes parameter tests', () => {
    expect(isCharKana('は')).toBe(true);
    expect(isCharKana('ナ')).toBe(true);
    expect(isCharKana('n')).toBe(false);
    expect(isCharKana('!')).toBe(false);
    expect(isCharKana('-')).toBe(false);
    expect(isCharKana('ー')).toBe(true);
  });
});
