import isCharRomaji from '../../src/utils/isCharRomaji';

describe('isCharRomaji', () => {
  it('sane default', () => expect(isCharRomaji()).toBe(false));

  it('passes parameter tests', () => {
    expect(isCharRomaji('n')).toBe(true);
    expect(isCharRomaji('!')).toBe(true);
    expect(isCharRomaji('ナ')).toBe(false);
    expect(isCharRomaji('は')).toBe(false);
    expect(isCharRomaji('缶')).toBe(false);
    expect(isCharRomaji('')).toBe(false);
  });
});
