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
// Automatically bind IME functionality to a form textarea or input.
wanakana.bind(element);

// Unbind IME from element.
wanakana.unbind(element);

// Returns false if string contains mixed characters, otherwise true if Hiragana.
wanakana.isHiragana(string);

// Returns false if string contains characters outside of the kana family, otherwise true if Hiragana and/or Katakana.
wanakana.isKana(string);

//Returns false if string contains mixed characters, otherwise true if Katakana.
wanakana.isKatakana(string);

// Convert Katakana or Romaji to Hiragana.
wanakana.toHiragana(string [, options]);

// Convert Romaji to Kana. Lowcase entries output Hiragana, while upcase entries output Katakana.
wanakana.toKana(string [, options]);

// Convert Hiragana or Romaji to Katakana.
wanakana.toKatakana(string [, options]);

// Convert Kana to Romaji.
wanakana.toRomaji(string [, options]);

// Options:
// Many functions take an optional `options` object.
// Here is the default object used for options.
{
	useObsoleteKana: false, // Set to true to use obsolete characters, such as ゐ and ゑ.

  	IMEMode: false // Set to true to handle input from a text input as it is typed.
}
```

## Credits

Project sponsered by [Tofugu](http://www.tofugu.com) & [WaniKani](http://www.wanikani.com)

### Contributors

- [Mims H. Wright](http://github.com/mimshwright)	Author
- [James McNamee](http://github.com/dotfold)		Contributor

## Ports

The following are ports created by the community:

- Java ([MasterKale/WanaKanaJava](https://github.com/MasterKale/WanaKanaJava))