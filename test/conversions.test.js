import { ROMA_TO_HIRA_KATA, HIRA_KATA_TO_ROMA } from './helpers/conversionTables';
import { toRomaji, toKana, toHiragana, toKatakana } from '../src/index';

describe('character conversions', () => {
  describe('test every conversion table char', () => {
    describe('toKana()', () => {
      ROMA_TO_HIRA_KATA.forEach((item) => {
        const [romaji, hiragana, katakana] = item;
        const lower = toKana(romaji);
        const upper = toKana(romaji.toUpperCase());
        it(`${romaji}`, () => expect(lower).toBe(hiragana));
        it(`${romaji.toUpperCase()}`, () => expect(upper).toBe(katakana));
      });
    });

    describe('toHiragana()', () => {
      ROMA_TO_HIRA_KATA.forEach((item) => {
        const [romaji, hiragana] = item;
        const lower = toHiragana(romaji);
        const upper = toHiragana(romaji.toUpperCase());
        it(`${romaji}`, () => expect(lower).toBe(hiragana));
        it(`${romaji.toUpperCase()}`, () => expect(upper).toBe(hiragana));
      });
    });

    describe('toKatakana()', () => {
      ROMA_TO_HIRA_KATA.forEach((item) => {
        const [romaji, , katakana] = item;
        const lower = toKatakana(romaji);
        const upper = toKatakana(romaji.toUpperCase());

        it(`${romaji}`, () => expect(lower).toBe(katakana));
        it(`${romaji.toUpperCase()}`, () => expect(upper).toBe(katakana));
      });
    });

    describe('Hiragana input toRomaji()', () => {
      HIRA_KATA_TO_ROMA.forEach((item) => {
        const [hiragana, , romaji] = item;
        if (hiragana) {
          const result = toRomaji(hiragana);
          it(`${hiragana}`, () => expect(result).toBe(romaji));
        }
      });
    });
    describe('Katakana input toRomaji()', () => {
      HIRA_KATA_TO_ROMA.forEach((item) => {
        const [, katakana, romaji] = item;
        if (katakana) {
          const result = toRomaji(katakana);
          it(`${katakana}`, () => expect(result).toBe(romaji));
        }
      });
    });
  });

  describe('Converting kana to kana', () => {
    it('k -> h', () => expect(toHiragana('バケル')).toBe('ばける'));
    it('h -> k', () => expect(toKatakana('ばける')).toBe('バケル'));

    it('It survives only katakana toKatakana', () =>
      expect(toKatakana('スタイル')).toBe('スタイル'));
    it('It survives only hiragana toHiragana', () =>
      expect(toHiragana('すたーいる')).toBe('すたーいる'));
    it('Mixed kana converts every char k -> h', () =>
      expect(toKatakana('アメリカじん')).toBe('アメリカジン'));
    it('Mixed kana converts every char h -> k', () =>
      expect(toHiragana('アメリカじん')).toBe('あめりかじん'));

    describe('long vowels', () => {
      it('Converts long vowels correctly from k -> h', () =>
        expect(toHiragana('バツゴー')).toBe('ばつごう'));
      it('Preserves long dash from h -> k', () =>
        expect(toKatakana('ばつゲーム')).toBe('バツゲーム'));
      it('Preserves long dash from h -> h', () =>
        expect(toHiragana('ばつげーむ')).toBe('ばつげーむ'));
      it('Preserves long dash from k -> k', () =>
        expect(toKatakana('バツゲーム')).toBe('バツゲーム'));
      it('Preserves long dash from mixed -> k', () =>
        expect(toKatakana('バツゲーム')).toBe('バツゲーム'));
      it('Preserves long dash from mixed -> k', () =>
        expect(toKatakana('テスーと')).toBe('テスート'));
      it('Preserves long dash from mixed -> h', () =>
        expect(toHiragana('てすート')).toBe('てすーと'));
      it('Preserves long dash from mixed -> h', () =>
        expect(toHiragana('てすー戸')).toBe('てすー戸'));
      it('Preserves long dash from mixed -> h', () =>
        expect(toHiragana('手巣ート')).toBe('手巣ーと'));
      it('Preserves long dash from mixed -> h', () =>
        expect(toHiragana('tesート')).toBe('てsーと'));
      it('Preserves long dash from mixed -> h', () =>
        expect(toHiragana('ートtesu')).toBe('ーとてす'));
    });

    describe('Mixed syllabaries', () => {
      it('It passes non-katakana through when passRomaji is true k -> h', () =>
        expect(toHiragana('座禅‘zazen’スタイル', { passRomaji: true })).toBe(
          '座禅‘zazen’すたいる'
        ));

      it('It passes non-hiragana through when passRomaji is true h -> k', () =>
        expect(toKatakana('座禅‘zazen’すたいる', { passRomaji: true })).toBe(
          '座禅‘zazen’スタイル'
        ));

      it('It converts non-katakana when passRomaji is false k -> h', () =>
        expect(toHiragana('座禅‘zazen’スタイル')).toBe('座禅「ざぜん」すたいる'));

      it('It converts non-hiragana when passRomaji is false h -> k', () =>
        expect(toKatakana('座禅‘zazen’すたいる')).toBe('座禅「ザゼン」スタイル'));
    });
  });

  describe('Case sensitivity', () => {
    it("cAse DoEsn'T MatTER for toHiragana()", () =>
      expect(toHiragana('aiueo')).toBe(toHiragana('AIUEO')));
    it("cAse DoEsn'T MatTER for toKatakana()", () =>
      expect(toKatakana('aiueo')).toBe(toKatakana('AIUEO')));
    it('Case DOES matter for toKana()', () => expect(toKana('aiueo')).not.toBe(toKana('AIUEO')));
  });

  describe('N edge cases', () => {
    it('Solo N', () => expect(toKana('n')).toBe('ん'));
    it('double N', () => expect(toKana('onn')).toBe('おんん'));
    it('N followed by N* syllable', () => expect(toKana('onna')).toBe('おんな'));
    it('Triple N', () => expect(toKana('nnn')).toBe('んんん'));
    it('Triple N followed by N* syllable', () => expect(toKana('onnna')).toBe('おんんな'));
    it('Quadruple N', () => expect(toKana('nnnn')).toBe('んんんん'));
    it('nya -> にゃ', () => expect(toKana('nyan')).toBe('にゃん'));
    it('nnya -> んにゃ', () => expect(toKana('nnyann')).toBe('んにゃんん'));
    it('nnnya -> んにゃ', () => expect(toKana('nnnyannn')).toBe('んんにゃんんん'));
    it("n'ya -> んや", () => expect(toKana("n'ya")).toBe('んや'));
    it("kin'ya -> きんや", () => expect(toKana("kin'ya")).toBe('きんや'));
    it("shin'ya -> しんや", () => expect(toKana("shin'ya")).toBe('しんや'));
    it('kinyou -> きにょう', () => expect(toKana('kinyou')).toBe('きにょう'));
    it("kin'you -> きんよう", () => expect(toKana("kin'you")).toBe('きんよう'));
    it("kin'yu -> きんゆ", () => expect(toKana("kin'yu")).toBe('きんゆ'));
    it('Properly add space after "n[space]"', () =>
      expect(toKana('ichiban warui')).toBe('いちばん わるい'));
  });

  describe('Bogus 4 character sequences', () => {
    it('Non bogus sequences work', () => expect(toKana('chya')).toBe('ちゃ'));
    it('Bogus sequences do not work', () => expect(toKana('chyx')).toBe('chyx'));
    it('Bogus sequences do not work', () => expect(toKana('shyp')).toBe('shyp'));
    it('Bogus sequences do not work', () => expect(toKana('ltsb')).toBe('ltsb'));
  });
});
