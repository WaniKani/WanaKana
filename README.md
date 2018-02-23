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
<h4>Javascript utility library for checking and converting between Kanji, Hiragana, Katakana, and Romaji</h4>
</div>

## Demo

Visit the [website](http://www.wanakana.com) to see WanaKana in action.

## Documentation

[Extended API reference](http://www.wanakana.com/docs/global.html)

## Quick Start

#### Install

```shell
yarn add wanakana
# alternatively: npm install wanakana
```

#### Or to get the minified browser (umd) bundle

[https://unpkg.com/wanakana](https://unpkg.com/wanakana)

#### Browser:

```html
<input type="text" id="wanakana-input" />
<script src="https://unpkg.com/wanakana"></script>
<script>
  const textInput = document.querySelector('#wanakana-input');
  wanakana.bind(textInput); // uses IMEMode toKana() as default
</script>
```

#### JavaScript:

```javascript
import wanakana from 'wanakana';
// with destructuring
import { toKana, isRomaji } from 'wanakana';
// directly reference single methods for smaller builds:
import isKanji from 'wanakana/isKanji';

/*** OPTIONS ***/
{
  // Use obsolete kana characters, such as ゐ and ゑ.
  useObsoleteKana: false,
  // Pass through romaji when using toKatakana() or toHiragana()
  passRomaji: false,
  // Convert katakana to uppercase when using toRomaji()
  upcaseKatakana: false,
  // Convert characters from a text input while being typed.
  IMEMode: false, // alternatives are: true, 'toHiragana', or 'toKatakana'
  // Choose toRomaji() romanization map
  romanization: 'hepburn' // (currently only hepburn)
  // custom map will be merged with default conversion
  customKanaMapping: {}
  // toKana('wanikani', { customKanaMapping: { na: 'に', ka: 'bana' }) });
  // => 'わにbanaに'
  customRomajiMapping: {}
  // toRomaji('つじぎり', { customRomajiMapping: { じ: 'zi', つ: 'tu', り: 'li' }) };
  // => 'tuzigili'
}

/*** DOM HELPERS ***/
// Automatically converts text using an eventListener on input
// Handles cursor positioning, mid-text insertion, passthrough native IME composition
// bind() uses option: { IMEMode: true } with `toKana()` by default
// Alternatives are: 'toHiragana' or 'toKatakana' to enforce kana type
wanakana.bind(HTMLElement [, options]);

// Removes event listener
wanakana.unbind(HTMLElement);


/*** TEXT CHECKING UTILITIES ***/
wanakana.isJapanese('泣き虫。！〜２￥ｚｅｎｋａｋｕ')
// => true

wanakana.isKana('あーア')
// => true

wanakana.isHiragana('げーむ')
// => true

wanakana.isKatakana('ゲーム')
// => true

wanakana.isKanji('切腹')
// => true

wanakana.isRomaji('Tōkyō and Ōsaka')
// => true

/*
 * toKana notes:
 * Lowercase -> Hiragana.
 * Uppercase -> Katakana.
 * Non-romaji and _English_ punctuation is passed through: 123 @#$%
 * Limited Japanese equivalent punctuation is converted:
 * !?.:/,~-‘’“”[](){}
 * ！？。：・、〜ー「」『』［］（）｛｝
 */
wanakana.toKana('ONAJI buttsuuji')
// => 'オナジ ぶっつうじ'
wanakana.toKana('座禅‘zazen’スタイル')
// => '座禅「ざぜん」スタイル'
wanakana.toKana('batsuge-mu')
// => 'ばつげーむ'

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


/*** EXTRA UTILITIES ***/
wanakana.stripOkurigana('お祝い')
// => 'お祝'
wanakana.stripOkurigana('踏み込む')
// => '踏み込'
wanakana.stripOkurigana('踏み込む', { all: true })
// => '踏込'

wanakana.tokenize('ふふフフ')
// => ['ふふ', 'フフ']
wanakana.tokenize('感じ')
// => ['感', 'じ']
wanakana.tokenize('I said "私は悲しい"')
// => ['I said "','私', 'は', '悲', 'しい', '"']
```

## Important

Only the browser build via unpkg or `wanakana/umd/*.js` include polyfills for older browsers.

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

The following are ports created by the community:

* Java ([MasterKale/WanaKanaJava](https://github.com/MasterKale/WanaKanaJava))
