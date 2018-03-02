import isEmpty from '../../src/utils/isEmpty';

describe('isEmpty', () => {
  it('sane default', () => expect(isEmpty()).toBe(true));

  it('passes parameter tests', () => {
    expect(isEmpty()).toBe(true);
    expect(isEmpty(22)).toBe(true);
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty('')).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty('nope')).toBe(false);
  });
});
