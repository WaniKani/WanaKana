import toKana from '../../src/toKana';
import toRomaji from '../../src/toRomaji';
import { createCustomMapping } from '../../src/utils/kanaMapping';

describe('Test custom mappings options', () => {
  it('applies customKanaMapping', () => {
    expect(
      toKana('WanaKana', {
        customKanaMapping: createCustomMapping({ na: 'に', ka: 'Bana' }),
      })
    ).toBe('ワにBanaに');
  });

  it("can't romanize with an invalid method", () => {
    expect(toRomaji('つじぎり', { romanization: "it's called rōmaji!!!" })).toBe('つじぎり');
  });

  it('applies customRomajiMapping', () => {
    expect(
      toRomaji('つじぎり', {
        customRomajiMapping: createCustomMapping({ じ: 'zi', つ: 'tu', り: 'li' }),
      })
    ).toBe('tuzigili');
  });

  it('will accept a plain object and merge it internally via createCustomMapping()', () => {
    expect(
      toKana('WanaKana', {
        customKanaMapping: { na: 'に', ka: 'Bana' },
      })
    ).toBe('ワにBanaに');

    expect(
      toRomaji('つじぎり', {
        customRomajiMapping: { じ: 'zi', つ: 'tu', り: 'li' },
      })
    ).toBe('tuzigili');
  });
});
