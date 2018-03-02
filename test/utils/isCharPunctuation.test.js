import isCharPunctuation from '../../src/utils/isCharPunctuation';
import { JA_PUNC, EN_PUNC } from '../helpers/conversionTables';

describe('isCharPunctuation', () => {
  it('sane defaults', () => {
    expect(isCharPunctuation()).toBe(false);
    expect(isCharPunctuation('')).toBe(false);
  });
  it('passes parameter tests', () => {
    expect(JA_PUNC.every((char) => isCharPunctuation(char))).toBe(true);
    expect(EN_PUNC.every((char) => isCharPunctuation(char))).toBe(true);
    expect(isCharPunctuation(' ')).toBe(true);
    expect(isCharPunctuation('　')).toBe(true);
    expect(isCharPunctuation('a')).toBe(false);
    expect(isCharPunctuation('ふ')).toBe(false);
    expect(isCharPunctuation('字')).toBe(false);
    expect(isCharPunctuation('')).toBe(false);
  });
});
