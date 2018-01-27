import isCharUpperCase from '../../src/utils/isCharUpperCase';

describe('isCharUpperCase', () => {
  it('sane defaults', () => {
    expect(isCharUpperCase()).toBe(false);
    expect(isCharUpperCase('')).toBe(false);
  });
  expect(isCharUpperCase('')).toBe(false);
  it('passes parameter tests', () => {
    expect(isCharUpperCase('A')).toBe(true);
    expect(isCharUpperCase('D')).toBe(true);
    expect(isCharUpperCase('-')).toBe(false);
    expect(isCharUpperCase('ー')).toBe(false);
    expect(isCharUpperCase('a')).toBe(false);
    expect(isCharUpperCase('d')).toBe(false);
  });
});
