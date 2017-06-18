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
</div>

<div align="center">
<h1>カナワナ &lt;--&gt; WanaKana &lt;--&gt; かなわな</h1>
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
#### Or download the minified bundle for browser use
[wanakana.min.js](https://raw.github.com/WaniKani/WanaKana/gh-pages/assets/js/wanakana.min.js)

#### HTML:
```html
<input type="text" id="wanakana-input" />
<script src="node_modules/wanakana/lib/wanakana.min.js"></script>
<script>
  const textInput = document.querySelector('#wanakana-input');
  wanakana.bind(textInput); // IME Mode
</script>
```

#### JavaScript:
```javascript
/* UMD/CommonJS/node */
const wanakana = require('wanakana');

/* ES modules */
import wanakana from 'wanakana';
// with destructuring
import { toKana, isRomaji } from 'wanakana';
// or directly reference single methods for smaller builds:
import isKanji from 'wanakana/isKanji';

/*** DEFAULT OPTIONS ***/
{
  // Use obsolete kana characters, such as ゐ and ゑ.
  useObsoleteKana: false,
  // Pass through romaji when using toKatakana() or toHiragana()
  passRomaji: false,
  // Convert katakana to uppercase when using toRomaji()
  upcaseKatakana: false,
  // Convert characters from a text input while being typed.
  IMEMode: false,
}

/*** DOM HELPERS ***/
// Automatically converts to kana using an eventListener on input
// Uses { IMEMode:true } by default (first example on the demo page)
wanakana.bind(domElement [, options]);

// Removes event listener
wanakana.unbind(domElement);


/*** TEXT CHECKING UTILITIES ***/
wanakana.isJapanese('泣き虫。！〜') // Full-width punctuation allowed
// => true
wanakana.isJapanese('泣き虫.!~') // Half-width / Latin punctuation fails
// => false

wanakana.isKana('あーア')
// => true

wanakana.isHiragana('げーむ')
// => true

wanakana.isKatakana('ゲーム')
// => true

wanakana.isKanji('切腹')
// => true

wanakana.isMixed('お腹A')
// => true

wanakana.isRomaji('Tōkyō and Ōsaka') // allows basic Hepburn romanisation
// => true

/*
 * toKana notes:
 * Lowercase -> Hiragana.
 * Uppercase -> Katakana.
 * Non-romaji and _English_ punctuation is passed through: 123 @#$%
 * Japanese equivalent punctuation is converted:
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

## Contributing
Please see [CONTRIBUTING.md](CONTRIBUTING.md)

## Contributors
- [Mims H. Wright](https://github.com/mimshwright) – Author
- [Duncan Bay](https://github.com/DJTB) – Contributor
- [James McNamee](https://github.com/dotfold) – Contributor

## Credits
Project sponsored by [Tofugu](http://www.tofugu.com) & [WaniKani](http://www.wanikani.com)

## Ports
  The following are ports created by the community:
  - Java ([MasterKale/WanaKanaJava](https://github.com/MasterKale/WanaKanaJava))
