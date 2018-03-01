/**
 * @jest-environment node
 */

import Benchmark from 'benchmark';

import toKana from '../src/toKana';
import toHiragana from '../src/toHiragana';
import toKatakana from '../src/toKatakana';
import toRomaji from '../src/toRomaji';

describe('Performance', () => {
  const maxTime = 0.05;
  const ONE_MS = 0.001;
  const log = (testName, { stats: { mean } }) => {
    console.log(`20 ${testName} mean: ${(mean * 1000).toFixed(2)} ms`); // eslint-disable-line no-console
  };

  it('mean romaji toKana as hiragana speed < 1ms', () => {
    const bench = Benchmark(() => toKana('aiueosashisusesonaninunenokakikukeko'), { maxTime });
    bench.run();
    log('lowercase romaji toKana', bench);
    expect(bench.stats.mean).toBeLessThan(ONE_MS);
  });

  it('mean romaji toKana as katakana speed < 1ms', () => {
    const bench = Benchmark(() => toKana('AIUEOSASHISUSESONANINUNENOKAKIKUKEKO'), { maxTime });
    bench.run();
    log('uppercase romaji toKana', bench);
    expect(bench.stats.mean).toBeLessThan(ONE_MS);
  });

  it('mean romaji toHiragana speed < 1ms', () => {
    const bench = Benchmark(() => toHiragana('aiueosashisusesonaninunenokakikukeko'), { maxTime });
    bench.run();
    log('romaji toHiragana', bench);
    expect(bench.stats.mean).toBeLessThan(ONE_MS);
  });

  it('mean katakana toHiragana speed < 1ms', () => {
    const bench = Benchmark(() => toHiragana('アイウエオサシスセソナニヌネノカキクケコ'), {
      maxTime,
    });
    bench.run();
    log('katakana toHiragana', bench);
    expect(bench.stats.mean).toBeLessThan(ONE_MS);
  });

  it('mean romaji toKatakana speed < 1ms', () => {
    const bench = Benchmark(() => toKatakana('aiueosashisusesonaninunenokakikukeko'), { maxTime });
    bench.run();
    log('romaji toKatakana', bench);
    expect(bench.stats.mean).toBeLessThan(ONE_MS);
  });

  it('mean hiragana toKatakana speed < 1ms', () => {
    const bench = Benchmark(() => toKatakana('あいうえおさしすせそなにぬねのかきくけこ'), {
      maxTime,
    });
    bench.run();
    log('hiragana toKatakana', bench);
    expect(bench.stats.mean).toBeLessThan(ONE_MS);
  });

  it('mean hiragana ToRomaji speed < 1ms', () => {
    const bench = Benchmark(() => toRomaji('あいうえおさしすせそなにぬねのかきくけこ'), {
      maxTime,
    });
    bench.run();
    log('hiragana toRomaji', bench);
    expect(bench.stats.mean).toBeLessThan(ONE_MS);
  });

  it('mean katakana ToRomaji speed < 1ms', () => {
    const bench = Benchmark(() => toRomaji('アイウエオサシスセソナニヌネノカキクケコ'), {
      maxTime,
    });
    bench.run();
    log('katakana ToRomaji', bench);
    expect(bench.stats.mean).toBeLessThan(ONE_MS);
  });
});
