import isCharEnglishPunctuation from '../../src/utils/isCharEnglishPunctuation';
import { JA_PUNC, EN_PUNC } from '../helpers/conversionTables';

describe('isCharEnglishPunctuation', () => {
  it('sane defaults', () => {
    expect(isCharEnglishPunctuation()).toBe(false);
    expect(isCharEnglishPunctuation('')).toBe(false);
  });

  it('passes parameter tests', () => {
    expect(EN_PUNC.every((char) => isCharEnglishPunctuation(char))).toBe(true);
    expect(JA_PUNC.every((char) => isCharEnglishPunctuation(char))).toBe(false);
    expect(isCharEnglishPunctuation(' ')).toBe(true);
    expect(isCharEnglishPunctuation('a')).toBe(false);
    expect(isCharEnglishPunctuation('ふ')).toBe(false);
    expect(isCharEnglishPunctuation('字')).toBe(false);
  });
});
