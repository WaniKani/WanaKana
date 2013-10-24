ワナカナ <-> WanaKana <-> わなかな
===============================

Javascript library that provides utilities for detecting and transliterating Hiragana &lt;--> Katakana &lt;--> Romaji.

See [demo site](http://wanakana.com) to see WanaKana in action.

## Build using Grunt

- Clone repository.
- Install all dependencies from `package.json` using `npm install`.
- Run grunt.
	- General development `grunt default` or just `grunt`
	- Open test suite (Mac only) `grunt test`
	- Deploy `grunt deploy`
	- Demo `grunt demo` - runs a `deploy` then copies html and opens a browser window
	- Full list of tasks `grunt --help`

## Usage

```html
// HTML
<textarea id="ime"></textarea>
```

```javascript
// Javascript
var input = document.getElementById('ime');
wanakana.bind(input);
```

## Documentation

```javascript
// Bind IME functionality to form textarea or input.
// Pass in option { useObsoleteKana: true } to use obsolete characters, such as ゐ and ゑ.
wanakana.bind(element, options)

// Unbind IME from element.
wanakana.unbind(element)

// Returns false if string contains mixed characters, otherwise true if Hiragana.
wanakana.isHiragana(string)

// Returns false if string contains characters outside of the kana family, otherwise true if Hiragana and/or Katakana.
wanakana.isKana(string)

//Returns false if string contains mixed characters, otherwise true if Katakana.
wanakana.isKatakana(string)

// Convert Katakana or Romaji to Hiragana.
wanakana.toHiragana(string)

// Convert Romaji to Kana. Lowcase entries output Hiragana, while upcase entries output Katakana.
wanakana.toKana(string)

// Convert Hiragana or Romaji to Katakana.
wanakana.toKatakana(string)

// Convert Kana to Romaji.
wanakana.toRomaji(string)
```

## Contributors

- [Mims H. Wright](http://github.com/mimshwright)	Author
- [James McNamee](http://github.com/dotfold)		Contributor

## Ports
The following are ports created by the community:

- Java ([MasterKale/WanaKanaJava](https://github.com/MasterKale/WanaKanaJava))