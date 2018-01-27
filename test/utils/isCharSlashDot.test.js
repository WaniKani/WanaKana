import isCharSlashDot from '../../src/utils/isCharSlashDot';

describe('isCharSlashDot', () => {
  it('sane default', () => expect(isCharSlashDot()).toBe(false));
  it('passes parameter tests', () => {
    expect(isCharSlashDot('・')).toBe(true);
    expect(isCharSlashDot('/')).toBe(false);
  });
});
