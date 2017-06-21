/**
 * @jest-environment node
 */

import Benchmark from 'benchmark';

import toKana from '../toKana';
import toRomaji from '../toRomaji';

describe('Performance', () => {
  const maxTime = 0.05;
  const TEN_MS = 0.01;
  const log = (testName, { stats: { mean } }) => {
    console.log(`20 ${testName} mean: ${(mean * 1000).toFixed(3)} ms`); // eslint-disable-line no-console
  };

  it('mean romaji toHiragana speed < 10ms', () => {
    const bench = Benchmark(() => toKana('aiueosashisusesonaninunenokakikukeko'), { maxTime });
    bench.run();
    log('romaji toHiragana', bench);
    expect(bench.stats.mean).toBeLessThan(TEN_MS);
  });

  it('mean romaji toKatakana speed < 10ms', () => {
    const bench = Benchmark(() => toKana('AIUEOSASHISUSESONANINUNENOKAKIKUKEKO'), { maxTime });
    bench.run();
    log('romaji toKatakana', bench);
    expect(bench.stats.mean).toBeLessThan(TEN_MS);
  });

  it('mean hiragana ToRomaji speed < 10ms', () => {
    const bench = Benchmark(() => toRomaji('あいうえおさしすせそなにぬねのかきくけこ'), { maxTime });
    bench.run();
    log('hiragana toRomaji', bench);
    expect(bench.stats.mean).toBeLessThan(TEN_MS);
  });

  it('mean katakana ToRomaji speed < 10ms', () => {
    const bench = Benchmark(() => toRomaji('アイウエオサシスセソナニヌネノカキクケコ'), { maxTime });
    bench.run();
    log('katakana ToRomaji', bench);
    expect(bench.stats.mean).toBeLessThan(TEN_MS);
  });
});
