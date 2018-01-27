import isCharJapanesePunctuation from '../../src/utils/isCharJapanesePunctuation';
import { JA_PUNC, EN_PUNC } from '../helpers/conversionTables';

describe('isCharJapanesePunctuation', () => {
  it('sane defaults', () => {
    expect(isCharJapanesePunctuation()).toBe(false);
    expect(isCharJapanesePunctuation('')).toBe(false);
  });
  it('passes parameter tests', () => {
    expect(JA_PUNC.every((char) => isCharJapanesePunctuation(char))).toBe(true);
    expect(EN_PUNC.every((char) => isCharJapanesePunctuation(char))).toBe(false);
    expect(isCharJapanesePunctuation('　')).toBe(true);
    expect(isCharJapanesePunctuation('?')).toBe(false);
    expect(isCharJapanesePunctuation('a')).toBe(false);
    expect(isCharJapanesePunctuation('ふ')).toBe(false);
    expect(isCharJapanesePunctuation('字')).toBe(false);
  });
});
