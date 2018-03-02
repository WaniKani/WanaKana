import isCharConsonant from '../../src/utils/isCharConsonant';

describe('isCharConsonant', () => {
  it('sane default', () => expect(isCharConsonant()).toBe(false));

  it('passes parameter tests', () => {
    [...'bcdfghjklmnpqrstvwxyz'].forEach((consonant) =>
      expect(isCharConsonant(consonant)).toBe(true)
    );
    expect(isCharConsonant('y', false /* excludes 'y' as a consonant */)).toBe(false);
    expect(isCharConsonant('a')).toBe(false);
    expect(isCharConsonant('!')).toBe(false);
    expect(isCharConsonant('')).toBe(false);
  });
});
