import isCharVowel from '../../src/utils/isCharVowel';

describe('isCharVowel', () => {
  it('isCharVowel()', () => expect(isCharVowel()).toBe(false));
  it('passes parameter tests', () => {
    [...'aeiou'].forEach((vowel) => expect(isCharVowel(vowel)).toBe(true));
    expect(isCharVowel('y' /* includes 'y' as a vowel by default */)).toBe(true);
    expect(isCharVowel('y', false /* excludes 'y' as a vowel */)).toBe(false);
    expect(isCharVowel('x')).toBe(false);
    expect(isCharVowel('!')).toBe(false);
    expect(isCharVowel('')).toBe(false);
  });
});
