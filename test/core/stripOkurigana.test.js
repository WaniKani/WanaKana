import stripOkurigana from '../../src/stripOkurigana';

describe('stripOkurigana', () => {
  it('sane defaults', () => {
    expect(stripOkurigana()).toBe('');
    expect(stripOkurigana('')).toBe('');
    expect(stripOkurigana('ふふフフ')).toBe('ふふフフ');
    expect(stripOkurigana('abc')).toBe('abc');
    expect(stripOkurigana('ふaふbフcフ')).toBe('ふaふbフcフ');
  });

  it('passes default parameter tests', () => {
    expect(stripOkurigana('踏み込む')).toBe('踏み込');
    expect(stripOkurigana('お腹')).toBe('お腹');
    expect(stripOkurigana('お祝い')).toBe('お祝');
  });
  it('strips leading when passed optional config', () => {
    expect(stripOkurigana('踏み込む', { leading: true })).toBe('踏み込む');
    expect(stripOkurigana('お腹', { leading: true })).toBe('腹');
    expect(stripOkurigana('お祝い', { leading: true })).toBe('祝い');
  });
  it('strips reading by matching original word when passed matchKanji', () => {
    expect(stripOkurigana('おはら', { matchKanji: 'お腹' })).toBe('おはら');
    expect(stripOkurigana('ふみこむ', { matchKanji: '踏み込む' })).toBe('ふみこ');
    expect(stripOkurigana('おみまい', { matchKanji: 'お祝い', leading: true })).toBe('みまい');
    expect(stripOkurigana('おはら', { matchKanji: 'お腹', leading: true })).toBe('はら');
  });
});
