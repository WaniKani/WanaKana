<div align="center">
  <!-- Npm Version -->
  <a href="https://www.npmjs.com/package/wanakana">
    <img src="https://img.shields.io/npm/v/wanakana.svg" alt="NPM package" />
  </a>
  <!-- Build Status -->
  <a href="https://travis-ci.org/WaniKani/WanaKana">
    <img src="https://img.shields.io/travis/WaniKani/WanaKana.svg" alt="Build Status" />
  </a>
  <!-- Test Coverage -->
  <a href="https://coveralls.io/github/WaniKani/WanaKana">
    <img src="https://img.shields.io/coveralls/WaniKani/WanaKana.svg" alt="Test Coverage" />
  </a>
  <a href="https://dashboard.cypress.io/#/projects/tmdhov/runs">
    <img src="https://img.shields.io/badge/cypress-dashboard-brightgreen.svg" alt="Cypress Dashboard" />
  </a>
</div>

<div align="center">
<h1>ワナカナ &lt;--&gt; WanaKana &lt;--&gt; わなかな</h1>
<h4>Javascript utility library for detecting and transliterating Hiragana, Katakana, and Romaji</h4>
</div>

## Demo

Visit the [website](http://www.wanakana.com) to see WanaKana in action.

## Usage

### Browser

#### Use the minified (UMD) bundle (with browser polyfills)

[https://unpkg.com/wanakana](https://unpkg.com/wanakana)

```html
<head>
  <meta charset="UTF-8">
  <script src="https://unpkg.com/wanakana"></script>
</head>
<body>
  <input type="text" id="wanakana-input" />
  <script>
    var textInput = document.getElementById('wanakana-input');
    wanakana.bind(textInput, /* options */); // uses IMEMode with toKana() as default
    // to remove event listeners: wanakana.unbind(textInput);
  </script>
</body>
```

### Node

#### Install

```shell
npm install wanakana
```

```javascript
import * as wanakana from 'wanakana';
// or
import { toKana, isRomaji } from 'wanakana';
```

## Documentation

[Extended API reference](http://www.wanakana.com/docs/global.html)

## Quick Reference

```javascript
/*** DOM HELPERS ***/
// Automatically converts text using an eventListener on input
// Sets option: { IMEMode: true } with toKana() as converter by default
wanakana.bind(domElement [, options]);

// Removes event listener
wanakana.unbind(domElement);

/*** TEXT CHECKING UTILITIES ***/
wanakana.isJapanese('泣き虫。！〜２￥ｚｅｎｋａｋｕ')
// => true

wanakana.isKana('あーア')
// => true

wanakana.isHiragana('すげー')
// => true

wanakana.isKatakana('ゲーム')
// => true

wanakana.isKanji('切腹')
// => true
wanakana.isKanji('勢い')
// => false

wanakana.isRomaji('Tōkyō and Ōsaka')
// => true

wanakana.toKana('ONAJI buttsuuji')
// => 'オナジ ぶっつうじ'
wanakana.toKana('座禅‘zazen’スタイル')
// => '座禅「ざぜん」スタイル'
wanakana.toKana('batsuge-mu')
// => 'ばつげーむ'
wanakana.toKana('wanakana', { customKanaMapping: { na: 'に', ka: 'bana' }) });
// => 'わにbanaに'

wanakana.toHiragana('toukyou, オオサカ')
// => 'とうきょう、　おおさか'
wanakana.toHiragana('only カナ', { passRomaji: true })
// => 'only かな'
wanakana.toHiragana('wi', { useObsoleteKana: true })
// => 'ゐ'

wanakana.toKatakana('toukyou, おおさか')
// => 'トウキョウ、　オオサカ'
wanakana.toKatakana('only かな', { passRomaji: true })
// => 'only カナ'
wanakana.toKatakana('wi', { useObsoleteKana: true })
// => 'ヰ'

wanakana.toRomaji('ひらがな　カタカナ')
// => 'hiragana katakana'
wanakana.toRomaji('ひらがな　カタカナ', { upcaseKatakana: true })
// => 'hiragana KATAKANA'
wanakana.toRomaji('つじぎり', { customRomajiMapping: { じ: 'zi', つ: 'tu', り: 'li' }) };
// => 'tuzigili'

/*** EXTRA UTILITIES ***/
wanakana.stripOkurigana('お祝い')
// => 'お祝'
wanakana.stripOkurigana('踏み込む')
// => '踏み込'
wanakana.stripOkurigana('お腹', { leading: true });
// => '腹'
wanakana.stripOkurigana('ふみこむ', { matchKanji: '踏み込む' });
// => 'ふみこ'
wanakana.stripOkurigana('おみまい', { matchKanji: 'お祝い', leading: true });
// => 'みまい'

wanakana.tokenize('ふふフフ')
// => ['ふふ', 'フフ']
wanakana.tokenize('hello 田中さん')
// => ['hello', ' ', '田中', 'さん']
wanakana.tokenize('I said 私はすごく悲しい', { compact: true })
// => [ 'I said ', '私はすごく悲しい']
```

## Important

Only the browser build via unpkg or the root `wanakana.min.js` includes polyfills for older browsers.

## Contributing

Please see [CONTRIBUTING.md](CONTRIBUTING.md)

## Contributors

* [Mims H. Wright](https://github.com/mimshwright) – Author
* [Duncan Bay](https://github.com/DJTB) – Author
* [Geggles](https://github.com/geggles) – Contributor
* [James McNamee](https://github.com/dotfold) – Contributor

## Credits

Project sponsored by [Tofugu](http://www.tofugu.com) & [WaniKani](http://www.wanikani.com)

## Ports

The following ports have been created by the community:

* Python ([Starwort/wanakana-py](https://github.com/Starwort/wanakana-py)) on PyPI as `wanakana-python`
* Java ([MasterKale/WanaKanaJava](https://github.com/MasterKale/WanaKanaJava))
* Rust ([PSeitz/wana_kana_rust](https://github.com/PSeitz/wana_kana_rust))
* Swift ([profburke/WanaKanaSwift](https://github.com/profburke/WanaKanaSwift))
* Kotlin ([esnaultdev/wanakana-kt](https://github.com/esnaultdev/wanakana-kt))
