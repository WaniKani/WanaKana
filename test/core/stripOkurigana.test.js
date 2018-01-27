import stripOkurigana from '../../src/stripOkurigana';

describe('stripOkurigana', () => {
  it('sane defaults', () => {
    expect(stripOkurigana()).toBe('');
    expect(stripOkurigana('')).toBe('');
  });

  it('passes default parameter tests', () => {
    expect(stripOkurigana('ふふフフ')).toBe('ふふフフ');
    expect(stripOkurigana('ふaふbフcフ')).toBe('ふaふbフcフ');
    expect(stripOkurigana('お腹')).toBe('お腹');
    expect(stripOkurigana('踏み込む')).toBe('踏み込');
    expect(stripOkurigana('お祝い')).toBe('お祝');
    expect(stripOkurigana('粘り')).toBe('粘');
    expect(stripOkurigana('〜い海軍い、。')).toBe('〜い海軍、。');
  });
  it('strips all kana when passed optional config', () => {
    expect(stripOkurigana('お腹', { all: true })).toBe('腹');
    expect(stripOkurigana('踏み込む', { all: true })).toBe('踏込');
    expect(stripOkurigana('お祝い', { all: true })).toBe('祝');
    expect(stripOkurigana('お踏み込む', { all: true })).toBe('踏込');
    expect(stripOkurigana('〜い海軍い、。', { all: true })).toBe('〜海軍、。');
  });
});
