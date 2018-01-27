import typeOf from '../../src/utils/typeOf';

describe('typeOf', () => {
  it('sane default', () => expect(typeOf()).toBe('undefined'));
  it('returns correct type strings', () => {
    expect(typeOf({})).toBe('object');
    expect(typeOf([])).toBe('array');
    expect(typeOf(function() {})).toBe('function'); // eslint-disable-line
    expect(typeOf(() => {})).toBe('function');
    expect(typeOf(/a/)).toBe('regexp');
    expect(typeOf(new Date())).toBe('date');
    expect(typeOf(new Map())).toBe('map');
    expect(typeOf(new Set())).toBe('set');
    expect(typeOf(null)).toBe('null');
    expect(typeOf(undefined)).toBe('undefined');
    expect(typeOf('a')).toBe('string');
    expect(typeOf(1)).toBe('number');
    expect(typeOf(true)).toBe('boolean');
  });
});
