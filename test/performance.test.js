/**
 * @jest-environment node
 */

import Benchmark from 'benchmark';

import toKana from '../src/toKana';
import toHiragana from '../src/toHiragana';
import toKatakana from '../src/toKatakana';
import toRomaji from '../src/toRomaji';

const JEST_TIMEOUT = 60000; // 1 minute

describe('Performance', () => {
  const config = { async: true };
  const TEN_MS = 0.01;
  const log = (bench) => {
    // eslint-disable-next-line no-console
    console.log(
      `20 chars ${bench.name}\n`
        + `Executed ${bench.count * bench.stats.sample.length} times\n`
        + `Iterations per second: ${bench.hz}\n`
        + `Mean: ${(bench.stats.mean * 1000).toFixed(2)} ms`
    );
  };

  it(
    'mean romaji toKana as hiragana speed < 1ms',
    (done) => {
      const bench = Benchmark(
        'lowercase romaji toKana',
        () => toKana('aiueosashisusesonaninunenokakikukeko'),
        config
      );
      bench
        .on('complete', function onComplete() {
          log(this);
          expect(this.stats.mean).toBeLessThan(TEN_MS);
          done();
        })
        .run();
    },
    JEST_TIMEOUT
  );

  it(
    'mean romaji toKana as katakana speed < 1ms',
    (done) => {
      const bench = Benchmark(
        'uppercase romaji toKana',
        () => toKana('AIUEOSASHISUSESONANINUNENOKAKIKUKEKO'),
        config
      );
      bench
        .on('complete', function onComplete() {
          log(this);
          expect(this.stats.mean).toBeLessThan(TEN_MS);
          done();
        })
        .run();
    },
    JEST_TIMEOUT
  );

  it(
    'mean romaji toHiragana speed < 1ms',
    (done) => {
      const bench = Benchmark(
        'romaji toHiragana',
        () => toHiragana('aiueosashisusesonaninunenokakikukeko'),
        config
      );
      bench
        .on('complete', function onComplete() {
          log(this);
          expect(this.stats.mean).toBeLessThan(TEN_MS);
          done();
        })
        .run();
    },
    JEST_TIMEOUT
  );

  it(
    'mean katakana toHiragana speed < 1ms',
    (done) => {
      const bench = Benchmark(
        'katakana toHiragana',
        () => toHiragana('アイウエオサシスセソナニヌネノカキクケコ'),
        config
      );
      bench
        .on('complete', function onComplete() {
          log(this);
          expect(this.stats.mean).toBeLessThan(TEN_MS);
          done();
        })
        .run();
    },
    JEST_TIMEOUT
  );

  it(
    'mean romaji toKatakana speed < 1ms',
    (done) => {
      const bench = Benchmark(
        'romaji toKatakana',
        () => toKatakana('aiueosashisusesonaninunenokakikukeko'),
        config
      );
      bench
        .on('complete', function onComplete() {
          log(this);
          expect(this.stats.mean).toBeLessThan(TEN_MS);
          done();
        })
        .run();
    },
    JEST_TIMEOUT
  );

  it(
    'mean hiragana toKatakana speed < 1ms',
    (done) => {
      const bench = Benchmark(
        'hiragana toKatakana',
        () => toKatakana('あいうえおさしすせそなにぬねのかきくけこ'),
        config
      );
      bench
        .on('complete', function onComplete() {
          log(this);
          expect(this.stats.mean).toBeLessThan(TEN_MS);
          done();
        })
        .run();
    },
    JEST_TIMEOUT
  );

  it(
    'mean hiragana ToRomaji speed < 1ms',
    (done) => {
      const bench = Benchmark(
        'hiragana toRomaji',
        () => toRomaji('あいうえおさしすせそなにぬねのかきくけこ'),
        config
      );
      bench
        .on('complete', function onComplete() {
          log(this);
          expect(this.stats.mean).toBeLessThan(TEN_MS);
          done();
        })
        .run();
    },
    JEST_TIMEOUT
  );

  it(
    'mean katakana ToRomaji speed < 1ms',
    (done) => {
      const bench = Benchmark(
        'katakana ToRomaji',
        () => toRomaji('アイウエオサシスセソナニヌネノカキクケコ'),
        config
      );
      bench
        .on('complete', function onComplete() {
          log(this);
          expect(this.stats.mean).toBeLessThan(TEN_MS);
          done();
        })
        .run();
    },
    JEST_TIMEOUT
  );
});
