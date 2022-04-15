import { DEFAULT_OPTIONS } from '../../src/constants';
import mergeWithDefaultOptions from '../../src/utils/mergeWithDefaultOptions';

describe('mergeWithDefaultOptions()', () => {
  it('sane defaults', () => {
    expect(mergeWithDefaultOptions()).toEqual(DEFAULT_OPTIONS);
    expect(mergeWithDefaultOptions({})).toEqual(DEFAULT_OPTIONS);
  });

  it('applies custom options over default options', () => {
    expect(
      mergeWithDefaultOptions({
        useObsoleteKana: true,
        passRomaji: true,
        upcaseKatakana: true,
        convertLongVowelMark: false,
        IMEMode: true,
        romanization: 'hepburn',
        customKanaMapping: { wa: 'な' },
        customRomajiMapping: { な: 'wa' },
      })
    ).toEqual({
      useObsoleteKana: true,
      passRomaji: true,
      upcaseKatakana: true,
      convertLongVowelMark: false,
      IMEMode: true,
      romanization: 'hepburn',
      customKanaMapping: { wa: 'な' },
      customRomajiMapping: { な: 'wa' },
    });
  });
});
