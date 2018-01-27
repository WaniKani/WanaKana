import getChunk from '../../src/utils/getChunk';

describe('getChunk()', () => {
  it('sane default', () => expect(getChunk()).toBe(''));
  it('passes parameter tests', () => {
    expect(getChunk('derpalerp', 3, 6)).toBe('pal');
    expect(getChunk('de', 0, 1)).toBe('d');
    expect(getChunk('', 1, 2)).toBe('');
  });
});
