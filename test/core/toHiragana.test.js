import toHiragana from '../../src/toHiragana';

describe('toHiragana()', () => {
  it('sane defaults', () => {
    expect(toHiragana()).toBe('');
    expect(toHiragana('')).toBe('');
  });

  it('Quick Brown Fox - Romaji to Hiragana', () => {
    const options = { useObsoleteKana: true };
    // https://en.wikipedia.org/wiki/Iroha
    // Even the colorful fragrant flowers'
    expect(toHiragana('IROHANIHOHETO', options)).toBe('いろはにほへと');
    // die sooner or later.'
    expect(toHiragana('CHIRINURUWO', options)).toBe('ちりぬるを');
    // Us who live in this world'
    expect(toHiragana('WAKAYOTARESO', options)).toBe('わかよたれそ');
    // cannot live forever, either.'
    expect(toHiragana('TSUNENARAMU', options)).toBe('つねならむ');
    // This transient mountain with shifts and changes,'
    expect(toHiragana('UWINOOKUYAMA', options)).toBe('うゐのおくやま');
    // today we are going to overcome, and reach the world of enlightenment.'
    expect(toHiragana('KEFUKOETE', options)).toBe('けふこえて');
    // We are not going to have meaningless dreams'
    expect(toHiragana('ASAKIYUMEMISHI', options)).toBe('あさきゆめみし');
    // nor become intoxicated with the fake world anymore.'
    expect(toHiragana('WEHIMOSESU', options)).toBe('ゑひもせす');
    // *not in iroha*
    expect(toHiragana('NLTU')).toBe('んっ');
  });

  describe('useObsoleteKana', () => {
    it('useObsoleteKana is false by default', () => expect(toHiragana('wi')).toBe('うぃ'));
    it('wi = ゐ (when useObsoleteKana is true)', () =>
      expect(toHiragana('wi', { useObsoleteKana: true })).toBe('ゐ'));
    it('we = ゑ (when useObsoleteKana is true)', () =>
      expect(toHiragana('we', { useObsoleteKana: true })).toBe('ゑ'));
    it('wi = うぃ when useObsoleteKana is false', () =>
      expect(toHiragana('wi', { useObsoleteKana: false })).toBe('うぃ'));
  });

  describe('passRomaji', () => {
    it('false by default', () => {
      expect(toHiragana('only カナ')).toEqual('おんly かな');
      expect(toHiragana('only カナ', { passRomaji: true })).toEqual('only かな');
    });
  });

  describe('mixed input', () => {
    expect(toHiragana('#22 toukyou, オオサカ')).toEqual('#22 とうきょう、 おおさか');
  });
});
