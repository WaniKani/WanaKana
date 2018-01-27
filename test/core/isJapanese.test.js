import isJapanese from '../../src/isJapanese';

describe('isJapanese()', () => {
  it('sane defaults', () => {
    expect(isJapanese()).toBe(false);
    expect(isJapanese('')).toBe(false);
  });
  it('泣き虫 is japanese', () => expect(isJapanese('泣き虫')).toBe(true));
  it('あア is japanese', () => expect(isJapanese('あア')).toBe(true));
  it('A泣き虫 is not japanese', () => expect(isJapanese('A泣き虫')).toBe(false));
  it('A is not japanese', () => expect(isJapanese('A')).toBe(false));
  it('ja space is japanese', () => expect(isJapanese('　')).toBe(true));
  it('en space is not japanese', () => expect(isJapanese(' ')).toBe(false));
  it('泣き虫。！〜 (w. zenkaku punctuation) is japanese', () =>
    expect(isJapanese('泣き虫。＃！〜〈〉《》〔〕［］【】（）｛｝〝〟')).toBe(true));
  it('泣き虫.!~ (w. romaji punctuation) is not japanese', () =>
    expect(isJapanese('泣き虫.!~')).toBe(false));
  it('zenkaku numbers are considered neutral', () =>
    expect(isJapanese('０１２３４５６７８９')).toBe(true));
  it('latin numbers are considered neutral', () => expect(isJapanese('0123456789')).toBe(true));
  it('zenkaku latin letters are considered neutral', () =>
    expect(isJapanese('ＭｅＴｏｏ')).toBe(true));
  it('mixed with numbers is japanese', () => expect(isJapanese('２０１１年')).toBe(true));
  it('hankaku katakana is allowed', () => expect(isJapanese('ﾊﾝｶｸｶﾀｶﾅ')).toBe(true));
  it('randomly sliced nhk news text is japanese', () =>
    expect(
      isJapanese(
        '＃ＭｅＴｏｏ、これを前に「ＫＵＲＯＳＨＩＯ」は、都内で報道陣を前に水中探査ロボットの最終点検の様子を公開しました。イルカのような形をした探査ロボットは、全長３メートル、重さは３５０キロあります。《はじめに》冒頭、安倍総理大臣は、ことしが明治元年から１５０年にあたることに触れ「明治という新しい時代が育てたあまたの人材が、技術優位の欧米諸国が迫る『国難』とも呼ぶべき危機の中で、わが国が急速に近代化を遂げる原動力となった。今また、日本は少子高齢化という『国難』とも呼ぶべき危機に直面している。もう１度、あらゆる日本人にチャンスを創ることで、少子高齢化も克服できる」と呼びかけました。《働き方改革》続いて安倍総理大臣は、具体的な政策課題の最初に「働き方改革」を取り上げ、「戦後の労働基準法制定以来、７０年ぶりの大改革だ。誰もが生きがいを感じて、その能力を思う存分発揮すれば少子高齢化も克服できる」と述べました。そして、同一労働同一賃金の実現や、時間外労働の上限規制の導入、それに労働時間でなく成果で評価するとして労働時間の規制から外す「高度プロフェッショナル制度」の創設などに取り組む考えを強調しました。'
      )
    ).toBe(true));
});
