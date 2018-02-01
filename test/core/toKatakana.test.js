import toKatakana from '../../src/toKatakana';
import hiraganaToKatakana from '../../src/utils/hiraganaToKatakana';

describe('toKatakana()', () => {
  it('sane defaults', () => {
    expect(toKatakana()).toBe('');
    expect(toKatakana('')).toBe('');
    expect(hiraganaToKatakana()).toBe('');
    expect(hiraganaToKatakana('')).toBe('');
  });

  it('Quick Brown Fox - Romaji to Katakana', () => {
    const options = { useObsoleteKana: true };
    // https://en.wikipedia.org/wiki/Iroha
    // Even the colorful fragrant flowers'
    expect(toKatakana('IROHANIHOHETO', options)).toBe('イロハニホヘト');
    // die sooner or later.'
    expect(toKatakana('CHIRINURUWO', options)).toBe('チリヌルヲ'); // ちりぬるを
    // Us who live in this world'
    expect(toKatakana('WAKAYOTARESO', options)).toBe('ワカヨタレソ'); // わかよたれそ
    // cannot live forever, either.'
    expect(toKatakana('TSUNENARAMU', options)).toBe('ツネナラム'); // つねならむ
    // This transient mountain with shifts and changes,'
    expect(toKatakana('UWINOOKUYAMA', options)).toBe('ウヰノオクヤマ'); // うゐのおくやま
    // today we are going to overcome, and reach the world of enlightenment.'
    expect(toKatakana('KEFUKOETE', options)).toBe('ケフコエテ'); // けふこえて
    // We are not going to have meaningless dreams'
    expect(toKatakana('ASAKIYUMEMISHI', options)).toBe('アサキユメミシ'); // あさきゆめみし
    // nor become intoxicated with the fake world anymore.'
    expect(toKatakana('WEHIMOSESU', options)).toBe('ヱヒモセス'); // ゑひもせす
    // *not in iroha*
    expect(toKatakana('NLTU')).toBe('ンッ'); // んっ
  });

  describe('useObsoleteKana', () => {
    it('useObsoleteKana is false by default', () => expect(toKatakana('wi')).toBe('ウィ'));
    it('WI = ヰ (when useObsoleteKana is true)', () =>
      expect(toKatakana('wi', { useObsoleteKana: true })).toBe('ヰ'));
    it('WE = ヱ (when useObsoleteKana is true)', () =>
      expect(toKatakana('we', { useObsoleteKana: true })).toBe('ヱ'));
  });
});
