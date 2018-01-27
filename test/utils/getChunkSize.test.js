import getChunkSize from '../../src/utils/getChunkSize';

describe('getChunkSize', () => {
  it('sane default', () => expect(getChunkSize()).toBe(0));
  it('passes parameter tests', () => {
    expect(getChunkSize(4, 2)).toBe(2);
    expect(getChunkSize(2, 2)).toBe(2);
    expect(getChunkSize(2, 4)).toBe(2);
    expect(getChunkSize(0, 0)).toBe(0);
    expect(getChunkSize(3, -1)).toBe(-1);
  });
});
