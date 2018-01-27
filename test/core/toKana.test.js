import { toKana, splitIntoConvertedKana } from '../../src/toKana';
import { JA_PUNC, EN_PUNC } from '../helpers/conversionTables';

describe('toKana()', () => {
  it('sane defaults', () => {
    expect(toKana()).toEqual('');
    expect(toKana('')).toEqual('');
  });

  it('Lowercase characters are transliterated to hiragana.', () =>
    expect(toKana('onaji')).toBe('おなじ'));

  it('Lowercase with double consonants and double vowels are transliterated to hiragana.', () =>
    expect(toKana('buttsuuji')).toBe('ぶっつうじ'));

  it('Uppercase characters are transliterated to katakana.', () =>
    expect(toKana('ONAJI')).toBe('オナジ'));

  it('Uppercase with double consonants and double vowels are transliterated to katakana.', () =>
    expect(toKana('BUTTSUUJI')).toBe('ブッツウジ'));

  it('WaniKani -> ワにカに - Mixed case uses the first character for each syllable.', () =>
    expect(toKana('WaniKani')).toBe('ワにカに'));

  it('Non-romaji will be passed through.', () =>
    expect(toKana('ワニカニ AiUeO 鰐蟹 12345 @#$%')).toBe('ワニカニ アいウえオ 鰐蟹 12345 @#$%'));

  it('It handles mixed syllabaries', () =>
    expect(toKana('座禅‘zazen’スタイル')).toBe('座禅「ざぜん」スタイル'));

  it('Will convert short to long dashes', () => expect(toKana('batsuge-mu')).toBe('ばつげーむ'));

  it('Will convert punctuation but pass through spaces', () =>
    expect(toKana(EN_PUNC.join(' '))).toBe(JA_PUNC.join(' ')));
});

describe('splitIntoConvertedKana()', () => {
  it('sane defaults', () => {
    expect(splitIntoConvertedKana()).toEqual([]);
    expect(splitIntoConvertedKana('')).toEqual([]);
  });
  it('Lowercase characters are transliterated to hiragana.', () =>
    expect(splitIntoConvertedKana('onaji')).toEqual([[0, 1, 'お'], [1, 3, 'な'], [3, 5, 'じ']]));

  it('Lowercase with double consonants and double vowels are transliterated to hiragana.', () =>
    expect(splitIntoConvertedKana('buttsuuji')).toEqual([
      [0, 2, 'ぶ'],
      [2, 6, 'っつ'],
      [6, 7, 'う'],
      [7, 9, 'じ'],
    ]));

  it('Non-romaji will be passed through.', () =>
    expect(splitIntoConvertedKana('ワニカニ AiUeO 鰐蟹 12345 @#$%')).toEqual([
      [0, 1, 'ワ'],
      [1, 2, 'ニ'],
      [2, 3, 'カ'],
      [3, 4, 'ニ'],
      [4, 5, ' '],
      [5, 6, 'あ'],
      [6, 7, 'い'],
      [7, 8, 'う'],
      [8, 9, 'え'],
      [9, 10, 'お'],
      [10, 11, ' '],
      [11, 12, '鰐'],
      [12, 13, '蟹'],
      [13, 14, ' '],
      [14, 15, '1'],
      [15, 16, '2'],
      [16, 17, '3'],
      [17, 18, '4'],
      [18, 19, '5'],
      [19, 20, ' '],
      [20, 21, '@'],
      [21, 22, '#'],
      [22, 23, '$'],
      [23, 24, '%'],
    ]));

  it('It handles mixed syllabaries', () =>
    expect(splitIntoConvertedKana('座禅‘zazen’スタイル')).toEqual([
      [0, 1, '座'],
      [1, 2, '禅'],
      [2, 3, '「'],
      [3, 5, 'ざ'],
      [5, 7, 'ぜ'],
      [7, 8, 'ん'],
      [8, 9, '」'],
      [9, 10, 'ス'],
      [10, 11, 'タ'],
      [11, 12, 'イ'],
      [12, 13, 'ル'],
    ]));

  it('Will convert short to long dashes', () =>
    expect(splitIntoConvertedKana('batsuge-mu')).toEqual([
      [0, 2, 'ば'],
      [2, 5, 'つ'],
      [5, 7, 'げ'],
      [7, 8, 'ー'],
      [8, 10, 'む'],
    ]));

  it('Will convert punctuation but pass through spaces', () =>
    expect(splitIntoConvertedKana(EN_PUNC.join(' '))).toEqual([
      [0, 1, '！'],
      [1, 2, ' '],
      [2, 3, '？'],
      [3, 4, ' '],
      [4, 5, '。'],
      [5, 6, ' '],
      [6, 7, '：'],
      [7, 8, ' '],
      [8, 9, '・'],
      [9, 10, ' '],
      [10, 11, '、'],
      [11, 12, ' '],
      [12, 13, '〜'],
      [13, 14, ' '],
      [14, 15, 'ー'],
      [15, 16, ' '],
      [16, 17, '「'],
      [17, 18, ' '],
      [18, 19, '」'],
      [19, 20, ' '],
      [20, 21, '『'],
      [21, 22, ' '],
      [22, 23, '』'],
      [23, 24, ' '],
      [24, 25, '［'],
      [25, 26, ' '],
      [26, 27, '］'],
      [27, 28, ' '],
      [28, 29, '（'],
      [29, 30, ' '],
      [30, 31, '）'],
      [31, 32, ' '],
      [32, 33, '｛'],
      [33, 34, ' '],
      [34, 35, '｝'],
    ]));
});
