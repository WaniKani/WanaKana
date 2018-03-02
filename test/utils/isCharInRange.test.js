import isCharInRange from '../../src/utils/isCharInRange';
import { HIRAGANA_END, HIRAGANA_START } from '../../src/constants';

describe('isCharInRange', () => {
  it('sane default', () => expect(isCharInRange()).toBe(false));
  it('passes parameter tests', () => {
    expect(isCharInRange('は', HIRAGANA_START, HIRAGANA_END)).toBe(true);
    expect(isCharInRange('d', HIRAGANA_START, HIRAGANA_END)).toBe(false);
  });
});
