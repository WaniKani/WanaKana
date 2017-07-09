import simulant from 'jsdom-simulant';

import { TEST_TABLE, JA_PUNC, EN_PUNC } from './testTables';
import isKana from '../isKana';
import isKanji from '../isKanji';
import isJapanese from '../isJapanese';
import isKatakana from '../isKatakana';
import isHiragana from '../isHiragana';
import isRomaji from '../isRomaji';
import isMixed from '../isMixed';
import toKana from '../toKana';
import toKatakana from '../toKatakana';
import toHiragana from '../toHiragana';
import toRomaji from '../toRomaji';
import stripOkurigana from '../stripOkurigana';
import tokenize from '../tokenize';
import { bind, unbind } from '../domUtils';

describe('Methods should return valid defaults when given no input', () => {
  it('isKana() with no input', () => expect(isKana()).toBe(false));
  it('isKanji() with no input', () => expect(isKanji()).toBe(false));
  it('isJapanese() with no input', () => expect(isJapanese()).toBe(false));
  it('isKatakana() with no input', () => expect(isKatakana()).toBe(false));
  it('isHiragana() with no input', () => expect(isHiragana()).toBe(false));
  it('isRomaji() with no input', () => expect(isRomaji()).toBe(false));
  it('isMixed() with no input', () => expect(isMixed()).toBe(false));
  it('toKana() with no input', () => expect(toKana()).toBe(''));
  it('toKatakana() with no input', () => expect(toKatakana()).toBe(''));
  it('toHiragana() with no input', () => expect(toHiragana()).toBe(''));
  it('toRomaji() with no input', () => expect(toRomaji()).toBe(''));
  it('stripOkurigana() with no input', () => expect(stripOkurigana()).toBe(''));
  it('tokenize() with no input', () => expect(tokenize()).toEqual(['']));
});

describe('Character type detection', () => {
  describe('isHiragana()', () => {
    it('あ is hiragana', () => expect(isHiragana('あ')).toBe(true));
    it('ああ is hiragana', () => expect(isHiragana('ああ')).toBe(true));
    it('ア is not hiragana', () => expect(isHiragana('ア')).toBe(false));
    it('A is not hiragana', () => expect(isHiragana('A')).toBe(false));
    it('あア is not hiragana', () => expect(isHiragana('あア')).toBe(false));
    it('ignores long dash in hiragana', () => expect(isHiragana('げーむ')).toBe(true));
  });

  describe('isKatakana()', () => {
    it('アア is katakana', () => expect(isKatakana('アア')).toBe(true));
    it('ア is katakana', () => expect(isKatakana('ア')).toBe(true));
    it('あ is not katakana', () => expect(isKatakana('あ')).toBe(false));
    it('A is not katakana', () => expect(isKatakana('A')).toBe(false));
    it('あア is not katakana', () => expect(isKatakana('あア')).toBe(false));
    it('ignores long dash in katakana', () => expect(isKatakana('ゲーム')).toBe(true));
  });

  describe('isKana()', () => {
    it('あ is kana', () => expect(isKana('あ')).toBe(true));
    it('ア is kana', () => expect(isKana('ア')).toBe(true));
    it('あア is kana', () => expect(isKana('あア')).toBe(true));
    it('A is not kana', () => expect(isKana('A')).toBe(false));
    it('あAア is not kana', () => expect(isKana('あAア')).toBe(false));
    it('ignores long dash in mixed kana', () => expect(isKana('アーあ')).toBe(true));
  });

  describe('isKanji()', () => {
    it('切腹 is kanji', () => expect(isKanji('切腹')).toBe(true));
    it('刀 is kanji', () => expect(isKanji('刀')).toBe(true));
    it('🐸 is not kanji', () => expect(isKanji('🐸')).toBe(false));
    it('あ is not kanji', () => expect(isKanji('あ')).toBe(false));
    it('ア is not kanji', () => expect(isKanji('ア')).toBe(false));
    it('あア is not kanji', () => expect(isKanji('あア')).toBe(false));
    it('A is not kanji', () => expect(isKanji('A')).toBe(false));
    it('あAア is not kanji', () => expect(isKanji('あAア')).toBe(false));
  });

  describe('isJapanese()', () => {
    it('泣き虫 is kanji/kana', () => expect(isJapanese('泣き虫')).toBe(true));
    it('あア is kanji/kana', () => expect(isJapanese('あア')).toBe(true));
    it('泣き虫A is not kanji/kana', () => expect(isJapanese('泣き虫A')).toBe(false));
    it('A is not kanji/kana', () => expect(isJapanese('A')).toBe(false));
    it('泣き虫。！〜 (w. kana punctuation) is kanji/kana',
      () => expect(isJapanese('泣き虫。！〜')).toBe(true));
    it('泣き虫.!~ (w. romaji punctuation) is not kanji/kana',
      () => expect(isJapanese('泣き虫.!~')).toBe(false));
  });

  describe('isRomaji()', () => {
    it('A is romaji', () => expect(isRomaji('A')).toBe(true));
    it('xYz is romaji', () => expect(isRomaji('xYz')).toBe(true));
    it('Tōkyō and Ōsaka is romaji', () => expect(isRomaji('Tōkyō and Ōsaka')).toBe(true));
    it('あアA is not romaji', () => expect(isRomaji('あアA')).toBe(false));
    it('お願い is not romaji', () => expect(isRomaji('お願い')).toBe(false));
    it('熟成 is not romaji', () => expect(isRomaji('熟成')).toBe(false));
    it('passes roman punctuation', () => expect(isRomaji('a*b&c-d')).toBe(true));
    it('fails japanese punctuation', () => expect(isRomaji('a！b&cーd')).toBe(false));
  });

  describe('isMixed()', () => {
    it('Aア is mixed', () => expect(isMixed('Aア')).toBe(true));
    it('Aあ is mixed', () => expect(isMixed('Aあ')).toBe(true));
    it('Aあア is mixed', () => expect(isMixed('Aあア')).toBe(true));
    it('あア is not mixed', () => expect(isMixed('あア')).toBe(false));
    it('お腹A is mixed', () => expect(isMixed('お腹A')).toBe(true));
    it('お腹A is not mixed when { passKanji: false }', () => expect(isMixed('お腹A', { passKanji: false })).toBe(false));
    it('お腹 is not mixed', () => expect(isMixed('お腹')).toBe(false));
    it('腹 is not mixed', () => expect(isMixed('腹')).toBe(false));
    it('A is not mixed', () => expect(isMixed('A')).toBe(false));
    it('あ is not mixed', () => expect(isMixed('あ')).toBe(false));
    it('ア is not mixed', () => expect(isMixed('ア')).toBe(false));
  });
});

describe('Character conversion', () => {
  describe('Quick Brown Fox - Romaji to Hiragana', () => {
    // thanks to Yuki http://www.yesjapan.com/YJ6/question/1099/is-there-a-group-of-sentences-that-uses-every-hiragana
    expect(toHiragana('IROHANIHOHETO', { useObsoleteKana: true }))
      .toBe('いろはにほへと'); // Even the colorful fragrant flowers'
    expect(toHiragana('CHIRINURUWO', { useObsoleteKana: true }))
      .toBe('ちりぬるを'); // die sooner or later.'
    expect(toHiragana('WAKAYOTARESO', { useObsoleteKana: true }))
      .toBe('わかよたれそ'); // Us who live in this world'
    expect(toHiragana('TSUNENARAMU', { useObsoleteKana: true }))
      .toBe('つねならむ'); // cannot live forever, either.'
    expect(toHiragana('UWINOOKUYAMA', { useObsoleteKana: true }))
      .toBe('うゐのおくやま'); // This transient mountain with shifts and changes,'
    expect(toHiragana('KEFUKOETE', { useObsoleteKana: true }))
      .toBe('けふこえて'); // today we are going to overcome, and reach the world of enlightenment.'
    expect(toHiragana('ASAKIYUMEMISHI', { useObsoleteKana: true }))
      .toBe('あさきゆめみし'); // We are not going to have meaningless dreams'
    expect(toHiragana('WEHIMOSESUN', { useObsoleteKana: true }))
      .toBe('ゑひもせすん'); // nor become intoxicated with the fake world anymore.'
  });

  describe('Test every character with toHiragana() and toKatakana()', () => {
    TEST_TABLE.forEach((item) => {
      const [romaji, hiragana, katakana] = item;
      it('converts to hiragana', () => {
        const result = toHiragana(romaji);
        expect(result).toBe(hiragana);
        expect(result).toMatchSnapshot();
      });
      it('converts to katakana', () => {
        const result = toKatakana(romaji.toUpperCase());
        expect(result).toBe(katakana);
        expect(result).toMatchSnapshot();
      });
    });
  });

  describe('Double consonants transliterate to glottal stops (small tsu)', () => {
    it('double B', () => expect(toHiragana('babba')).toBe('ばっば'));
    it('double C', () => expect(toHiragana('cacca')).toBe('かっか'));
    it('double Ch', () => expect(toHiragana('chaccha')).toBe('ちゃっちゃ'));
    it('double D', () => expect(toHiragana('dadda')).toBe('だっだ'));
    it('double F', () => expect(toHiragana('fuffu')).toBe('ふっふ'));
    it('double G', () => expect(toHiragana('gagga')).toBe('がっが'));
    it('double H', () => expect(toHiragana('hahha')).toBe('はっは'));
    it('double J', () => expect(toHiragana('jajja')).toBe('じゃっじゃ'));
    it('double K', () => expect(toHiragana('kakka')).toBe('かっか'));
    it('double L', () => expect(toHiragana('lalla')).toBe('らっら'));
    it('double M', () => expect(toHiragana('mamma')).toBe('まっま'));
    it('double N', () => expect(toHiragana('nanna')).toBe('なんな'));
    it('double P', () => expect(toHiragana('pappa')).toBe('ぱっぱ'));
    it('double Q', () => expect(toHiragana('qaqqa')).toBe('くぁっくぁ'));
    it('double R', () => expect(toHiragana('rarra')).toBe('らっら'));
    it('double S', () => expect(toHiragana('sassa')).toBe('さっさ'));
    it('double Sh', () => expect(toHiragana('shassha')).toBe('しゃっしゃ'));
    it('double T', () => expect(toHiragana('tatta')).toBe('たった'));
    it('double Ts', () => expect(toHiragana('tsuttsu')).toBe('つっつ'));
    it('double V', () => expect(toHiragana('vavva')).toBe('ゔぁっゔぁ'));
    it('double W', () => expect(toHiragana('wawwa')).toBe('わっわ'));
    it('double X', () => expect(toHiragana('yayya')).toBe('やっや'));
    it('double Z', () => expect(toHiragana('zazza')).toBe('ざっざ'));
  });

  describe('toKana()', () => {
    it('Lowercase characters are transliterated to hiragana.',
      () => expect(toKana('onaji')).toBe('おなじ'));

    it('Lowercase with double consonants and double vowels are transliterated to hiragana.',
      () => expect(toKana('buttsuuji')).toBe('ぶっつうじ'));

    it('Uppercase characters are transliterated to katakana.',
      () => expect(toKana('ONAJI')).toBe('オナジ'));

    it('Uppercase with double consonants and double vowels are transliterated to katakana.',
      () => expect(toKana('BUTTSUUJI')).toBe('ブッツウジ'));

    it('WaniKani -> ワにカに - Mixed case uses the first character for each syllable.',
      () => expect(toKana('WaniKani')).toBe('ワにカに'));

    it('Non-romaji will be passed through.',
      () => expect(toKana('ワニカニ AiUeO 鰐蟹 12345 @#$%')).toBe('ワニカニ アいウえオ 鰐蟹 12345 @#$%'));

    it('It handles mixed syllabaries',
      () => expect(toKana('座禅‘zazen’スタイル')).toBe('座禅「ざぜん」スタイル'));

    it('Will convert short to long dashes',
      () => expect(toKana('batsuge-mu')).toBe('ばつげーむ'));

    it('Will convert punctuation but pass through spaces',
      () => expect(toKana(EN_PUNC.join(' '))).toBe(JA_PUNC.join(' ')));
  });

  describe('Converting kana to kana', () => {
    it('k -> h', () => expect(toHiragana('バケル')).toBe('ばける'));
    it('h -> k', () => expect(toKatakana('ばける')).toBe('バケル'));

    it('It survives only katakana toKatakana', () => expect(toKatakana('スタイル')).toBe('スタイル'));
    it('It survives only hiragana toHiragana', () => expect(toHiragana('すたいる')).toBe('すたいる'));
    it('Mixed kana converts every char k -> h', () => expect(toKatakana('アメリカじん')).toBe('アメリカジン'));
    it('Mixed kana converts every char h -> k', () => expect(toHiragana('アメリカじん')).toBe('あめりかじん'));
    it('Converts long vowels correctly from k -> h', () => expect(toHiragana('バツゴー')).toBe('ばつごう'));
    it('Preserves long dash from h -> k', () => expect(toKatakana('ばつゲーム')).toBe('バツゲーム'));

    describe('Mixed syllabaries', () => {
      it('It passes non-katakana through when passRomaji is true k -> h',
        () => expect(toHiragana('座禅‘zazen’スタイル', { passRomaji: true })).toBe('座禅‘zazen’すたいる'));

      it('It passes non-hiragana through when passRomaji is true h -> k',
        () => expect(toKatakana('座禅‘zazen’すたいる', { passRomaji: true })).toBe('座禅‘zazen’スタイル'));

      it('It converts non-katakana when passRomaji is false k -> h',
        () => expect(toHiragana('座禅‘zazen’スタイル')).toBe('座禅「ざぜん」すたいる'));

      it('It converts non-hiragana when passRomaji is false h -> k',
        () => expect(toKatakana('座禅‘zazen’すたいる')).toBe('座禅「ザゼン」スタイル'));
    });
  });

  describe('Case sensitivity', () => {
    it("cAse DoEsn'T MatTER for toHiragana()", () => expect(toHiragana('aiueo')).toBe(toHiragana('AIUEO')));
    it("cAse DoEsn'T MatTER for toKatakana()", () => expect(toKatakana('aiueo')).toBe(toKatakana('AIUEO')));
    it('Case DOES matter for toKana()', () => expect(toKana('aiueo')).not.toBe(toKana('AIUEO')));
  });

  describe('N edge cases', () => {
    it('Solo N', () => expect(toKana('n')).toBe('ん'));
    it('double N', () => expect(toKana('onn')).toBe('おん'));
    it('N followed by N* syllable', () => expect(toKana('onna')).toBe('おんな'));
    it('Triple N', () => expect(toKana('nnn')).toBe('んん'));
    it('Triple N followed by N* syllable', () => expect(toKana('onnna')).toBe('おんな'));
    it('Quadruple N', () => expect(toKana('nnnn')).toBe('んん'));
    it('nya -> にゃ', () => expect(toKana('nyan')).toBe('にゃん'));
    it('nnya -> んにゃ', () => expect(toKana('nnyann')).toBe('んにゃん'));
    it('nnnya -> んにゃ', () => expect(toKana('nnnyannn')).toBe('んにゃんん'));
    it("n'ya -> んや", () => expect(toKana("n'ya")).toBe('んや'));
    it("kin'ya -> きんや", () => expect(toKana("kin'ya")).toBe('きんや'));
    it("shin'ya -> しんや", () => expect(toKana("shin'ya")).toBe('しんや'));
    it('kinyou -> きにょう', () => expect(toKana('kinyou')).toBe('きにょう'));
    it("kin'you -> きんよう", () => expect(toKana("kin'you")).toBe('きんよう'));
    it("kin'yu -> きんゆ", () => expect(toKana("kin'yu")).toBe('きんゆ'));
    it('Properly add space after "n[space]"', () => expect(toKana('ichiban warui')).toBe('いちばん わるい'));
  });

  describe('Bogus 4 character sequences', () => {
    it('Non bogus sequences work', () => expect(toKana('chya')).toBe('ちゃ'));
    it('Bogus sequences do not work', () => expect(toKana('chyx')).toBe('chyx'));
    it('Bogus sequences do not work', () => expect(toKana('shyp')).toBe('shyp'));
    it('Bogus sequences do not work', () => expect(toKana('ltsb')).toBe('ltsb'));
  });
});

describe('Kana to Romaji', () => {
  describe('toRomaji()', () => {
    it('Convert katakana to romaji',
     () => expect(toRomaji('ワニカニ　ガ　スゴイ　ダ')).toBe('wanikani ga sugoi da'));

    it('Convert hiragana to romaji',
     () => expect(toRomaji('わにかに　が　すごい　だ')).toBe('wanikani ga sugoi da'));

    it('Convert mixed kana to romaji',
     () => expect(toRomaji('ワニカニ　が　すごい　だ')).toBe('wanikani ga sugoi da'));

    it('Will convert punctuation and full-width spaces',
     () => expect(toRomaji(JA_PUNC.join(''))).toBe(EN_PUNC.join('')));

    it('Use the upcaseKatakana flag to preserve casing. Works for katakana.',
     () => expect(toRomaji('ワニカニ', { upcaseKatakana: true })).toBe('WANIKANI'));

    it('Use the upcaseKatakana flag to preserve casing. Works for mixed kana.',
     () => expect(toRomaji('ワニカニ　が　すごい　だ', { upcaseKatakana: true })).toBe('WANIKANI ga sugoi da'));

    it("Doesn't mangle the long dash 'ー' or slashdot '・'",
     () => expect(toRomaji('罰ゲーム・ばつげーむ')).toBe('罰ge-mu/batsuge-mu'));

    it('Spaces must be manually entered',
     () => expect(toRomaji('わにかにがすごいだ')).not.toBe('wanikani ga sugoi da'));
  });

  describe('Quick Brown Fox - Hiragana to Romaji', () => {
    expect(toRomaji('いろはにほへと')).toBe('irohanihoheto');
    expect(toRomaji('ちりぬるを')).toBe('chirinuruwo');
    expect(toRomaji('わかよたれそ')).toBe('wakayotareso');
    expect(toRomaji('つねならむ')).toBe('tsunenaramu');
    expect(toRomaji('うゐのおくやま')).toBe('uwinookuyama');
    expect(toRomaji('けふこえて')).toBe('kefukoete');
    expect(toRomaji('あさきゆめみし')).toBe('asakiyumemishi');
    expect(toRomaji('ゑひもせすん')).toBe('wehimosesun');
  });

  describe("double n's and double consonants", () => {
    it('Double and single n', () => expect(toRomaji('きんにくまん')).toBe('kinnikuman'));
    it('N extravaganza', () => expect(toRomaji('んんにんにんにゃんやん')).toBe("nnninninnyan'yan"));
    it('Double consonants',
      () => expect(toRomaji('かっぱ　たった　しゅっしゅ ちゃっちゃ　やっつ')).toBe('kappa tatta shusshu chaccha yattsu'));
  });

  describe('Small kana', () => {
    it("Small tsu doesn't transliterate", () => expect(toRomaji('っ')).toBe(''));
    it('Small ya', () => expect(toRomaji('ゃ')).toBe('ya'));
    it('Small yu', () => expect(toRomaji('ゅ')).toBe('yu'));
    it('Small yo', () => expect(toRomaji('ょ')).toBe('yo'));
    it('Small a', () => expect(toRomaji('ぁ')).toBe('a'));
    it('Small i', () => expect(toRomaji('ぃ')).toBe('i'));
    it('Small u', () => expect(toRomaji('ぅ')).toBe('u'));
    it('Small e', () => expect(toRomaji('ぇ')).toBe('e'));
    it('Small o', () => expect(toRomaji('ぉ')).toBe('o'));
    it('Small ke (ka)', () => expect(toRomaji('ヶ')).toBe('ka'));
    it('Small ka', () => expect(toRomaji('ヵ')).toBe('ka'));
    it('Small wa', () => expect(toRomaji('ゎ')).toBe('wa'));
  });
});

describe('stripOkurigana', () => {
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

describe('tokenize', () => {
  it('passes default parameter tests', () => {
    expect(tokenize('ふふ')).toEqual(['ふふ']);
    expect(tokenize('フフ')).toEqual(['フフ']);
    expect(tokenize('ふふフフ')).toEqual(['ふふ', 'フフ']);
    expect(tokenize('阮咸')).toEqual(['阮咸']);
    expect(tokenize('感じ')).toEqual(['感', 'じ']);
    expect(tokenize('私は悲しい')).toEqual(['私', 'は', '悲', 'しい']);
    expect(tokenize('what the...私は「悲しい」。')).toEqual(['what the...', '私', 'は', '「', '悲', 'しい', '」。']);
  });
});

describe('Event listener helpers', () => {
  document.body.innerHTML = `
      <div>
        <input type="text" id="ime" />
        <textarea id="ime2"></textarea>
      </div>
    `;
  const inputField1 = document.querySelector('#ime');
  const inputField2 = document.querySelector('#ime2');

  it('should warn if invalid params passed', () => {
    const consoleRef = global.console;
    global.console = { warn: jest.fn() };
    bind('not an element');
    unbind(inputField1);
    expect(console.warn).toHaveBeenCalledTimes(2); // eslint-disable-line no-console
    global.console = consoleRef; // restore console
  });

  it('adds onInput event listener', () => {
    bind(inputField1);
    inputField1.value = 'wanakana';
    simulant.fire(inputField1, 'input');
    expect(inputField1.value).toEqual('わなかな');
  });

  it('forces autocapitalize "none"', () => {
    expect(inputField1.autocapitalize).toEqual('none');
  });

  it('removes onInput event listener', () => {
    unbind(inputField1);
    inputField1.value = 'fugu';
    simulant.fire(inputField1, 'input');
    expect(inputField1.value).toEqual('fugu');
  });

  it('should handle passed options', () => {
    bind(inputField1, { useObsoleteKana: true });
    inputField1.value = 'wiweWIWEwo';
    simulant.fire(inputField1, 'input');
    expect(inputField1.value).toEqual('ゐゑヰヱを');
    unbind(inputField1);
  });

  it('should instantiate separate onInput bindings', () => {
    bind(inputField1, {});
    bind(inputField2, { useObsoleteKana: true });
    inputField1.value = 'WIWEwiwe';
    inputField2.value = 'WIWEwiwe';
    simulant.fire(inputField1, 'input');
    simulant.fire(inputField2, 'input');
    expect(inputField1.value).toEqual('ウィウェうぃうぇ');
    expect(inputField2.value).toEqual('ヰヱゐゑ');
    unbind(inputField1);
    unbind(inputField2);
  });

  it('should not be possible to force { IMEMode: false }', () => {
    inputField1.value = 'wanakana';
    bind(inputField1, { IMEMode: false });
    simulant.fire(inputField1, 'input');
    expect(inputField1.value).toEqual('わなかな');
    unbind(inputField1);
  });

  it('should handle nonascii', () => {
    bind(inputField1);
    inputField1.value = 'ｈｉｒｏｉ';
    simulant.fire(inputField1, 'input');
    expect(inputField1.value).toEqual('ひろい');
    // passes setting value if conversion would be the same
    inputField1.value = 'かんじ';
    simulant.fire(inputField1, 'input');
    expect(inputField1.value).toEqual('かんじ');
    unbind(inputField1);
  });

  it('should reset cursor to end of input values', () => {
    bind(inputField1);
    inputField1.value = 'sentaku';
    const expected = 'せんたく';
    inputField1.setSelectionRange(2, 2);
    simulant.fire(inputField1, 'input');
    expect(inputField1.value).toEqual(expected);
    expect(inputField1.selectionStart).toEqual(expected.length);
    unbind(inputField1);
  });

  it('should reset cursor to end of input values on IE < 9', () => {
    const setSelRef = inputField1.setSelectionRange;
    const collapseSpy = jest.fn();
    const selectSpy = jest.fn();
    inputField1.setSelectionRange = null;
    inputField1.createTextRange = () => ({ collapse: collapseSpy, select: selectSpy });
    bind(inputField1);
    inputField1.value = 'sentaku';
    simulant.fire(inputField1, 'input');
    expect(inputField1.value).toEqual('せんたく');
    expect(collapseSpy).toBeCalled();
    expect(selectSpy).toBeCalled();
    delete inputField1.createTextRange;
    inputField1.setSelectionRange = setSelRef;
    unbind(inputField1);
  });
});

describe('Options', () => {
  describe('useObsoleteKana', () => {
    describe('toKana', () => {
      it('useObsoleteKana is false by default',
      () => expect(toKana('wi')).toBe('うぃ'));
      it('wi = ゐ (when useObsoleteKana is true)',
      () => expect(toKana('wi', { useObsoleteKana: true })).toBe('ゐ'));
      it('we = ゑ (when useObsoleteKana is true)',
      () => expect(toKana('we', { useObsoleteKana: true })).toBe('ゑ'));
      it('WI = ヰ (when useObsoleteKana is true)',
      () => expect(toKana('WI', { useObsoleteKana: true })).toBe('ヰ'));
      it('WE = ヱ (when useObsoleteKana is true)',
      () => expect(toKana('WE', { useObsoleteKana: true })).toBe('ヱ'));
    });

    describe('toHiragana', () => {
      it('useObsoleteKana is false by default',
        () => expect(toHiragana('wi')).toBe('うぃ'));
      it('wi = ゐ (when useObsoleteKana is true)',
          () => expect(toHiragana('wi', { useObsoleteKana: true })).toBe('ゐ'));
      it('we = ゑ (when useObsoleteKana is true)',
          () => expect(toHiragana('we', { useObsoleteKana: true })).toBe('ゑ'));
      it('wi = うぃ when useObsoleteKana is false',
          () => expect(toHiragana('wi', { useObsoleteKana: false })).toBe('うぃ'));
    });

    describe('toKataKana', () => {
      it('wi = ウィ when useObsoleteKana is false',
        () => expect(toKatakana('WI', { useObsoleteKana: false })).toBe('ウィ'));
      it('WI = ヰ (when useObsoleteKana is true)',
          () => expect(toKatakana('wi', { useObsoleteKana: true })).toBe('ヰ'));
      it('WE = ヱ (when useObsoleteKana is true)',
          () => expect(toKatakana('we', { useObsoleteKana: true })).toBe('ヱ'));
    });
  });

  describe('IMEMode', () => {
    /**
     * Simulate real typing by calling the function on every character in sequence
     * @param  {String} input
     * @param  {Object} options
     * @return {String} converted romaji as kana
     */
    function testTyping(input, options) {
      let pos = 1;
      let text = input;
      const len = text.length;
      // console.log(`--${text}--`);
      while (pos <= len) {
        let buffer = text.slice(0, pos);
        const rest = text.slice(pos);
        buffer = toKana(buffer, options);
        // console.log(`${pos}:${buffer} <-${rest}`);
        text = buffer + rest;
        pos += 1;
      }
      return text;
    }

    it("Without IME mode, solo n's are transliterated.", () => expect(toKana('n')).toBe('ん'));
    it("Without IME mode, double n's are transliterated.", () => expect(toKana('nn')).toBe('ん'));

    it("With IME mode, solo n's are not transliterated.", () => expect(testTyping('n', { IMEMode: true })).toBe('n'));
    it("With IME mode, double n's are transliterated.", () => expect(testTyping('nn', { IMEMode: true })).toBe('ん'));
    it('With IME mode, n + space are transliterated.', () => expect(testTyping('n ', { IMEMode: true })).toBe('ん'));
    it("With IME mode, n + ' are transliterated.", () => expect(testTyping("n'", { IMEMode: true })).toBe('ん'));
    it('With IME mode, ni.', () => expect(testTyping('ni', { IMEMode: true })).toBe('に'));

    it('kan', () => expect(testTyping('kan', { IMEMode: true })).toBe('かn'));
    it('kanp', () => expect(testTyping('kanp', { IMEMode: true })).toBe('かんp'));
    it('kanpai!', () => expect(testTyping('kanpai', { IMEMode: true })).toBe('かんぱい'));
    it('nihongo', () => expect(testTyping('nihongo', { IMEMode: true })).toBe('にほんご'));

    it("y doesn't count as a consonant for IME", () => expect(testTyping('ny', { IMEMode: true })).toBe('ny'));
    it('nya works as expected', () => expect(testTyping('nya', { IMEMode: true })).toBe('にゃ'));

    it("With IME mode, solo N's are not transliterated - katakana.", () => expect(testTyping('N', { IMEMode: true })).toBe('N'));
    it("With IME mode, double N's are transliterated - katakana.", () => expect(testTyping('NN', { IMEMode: true })).toBe('ン'));
    it('With IME mode, NI - katakana.', () => expect(testTyping('NI', { IMEMode: true })).toBe('ニ'));
    it('With IME mode - KAN - katakana', () => expect(testTyping('KAN', { IMEMode: true })).toBe('カN'));
    it('With IME mode - NIHONGO - katakana', () => expect(testTyping('NIHONGO', { IMEMode: true })).toBe('ニホンゴ'));
  });

  describe('Apostrophes for vague consonant vowel combos', () => {
    it("おんよみ = on'yomi", () => expect(toRomaji('おんよみ')).toBe("on'yomi"));
    it('Checking other combinations', () => expect(toRomaji('んよ んあ んゆ')).toBe("n'yo n'a n'yu"));
  });
});
