import isCharLongDash from '../../src/utils/isCharLongDash';

describe('isCharLongDash', () => {
  it('sane default', () => expect(isCharLongDash()).toBe(false));

  it('passes parameter tests', () => {
    expect(isCharLongDash('ー')).toBe(true);
    expect(isCharLongDash('-')).toBe(false);
    expect(isCharLongDash('f')).toBe(false);
    expect(isCharLongDash('ふ')).toBe(false);
  });
});
