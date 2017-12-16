# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

<!--
- TITLE
  - Add link at EOF to compare changes:
    - [2.2.3]: https://github.com/WaniKani/WanaKana/compare/2.2.2...2.2.3
  - List release date in YYYY-MM-DD format
- DETAILS
  - Added: for new features.
  - Changed: for changes in existing functionality.
  - Deprecated: for once-stable features removed in upcoming releases.
  - Removed: for deprecated features removed in this release.
  - Fixed: for any bug fixes.
  - Security: to invite users to upgrade in case of vulnerabilities.
-->

<!--
## [Unreleased]
### Add any unpublished changes here as they are made, for easy reference come release time.
-->
## [2.3.4] - 2017-12-16
### Fixed
- *Uppercase* input with toHiragana() including a double consonant was incorrectly producing a katakana ッ instead of っ

## [2.3.3] - 2017-12-12
### Fixed
- Add https to unpkg link

## [2.3.2] - 2017-12-12
### Added
- Specify minified bundle in package.json for easy use with unpkg

## [2.3.1] - 2017-10-17
### Changed
- Set cursor in IME mode to the current position after conversion (rather than the end of all input)

## [2.3.0] - 2017-08-28
### Changed
- Increase character coverage for isJapanese to include numbers and hankaku katakana

## [2.2.4] - 2017-08-24
### Fixed
- Pass through long vowel conversion using toHiragana with odd/mixed input

## [2.2.3] - 2017-08-05
### Fixed
- Mobile input not converting automatically during autosuggest (regression due to 2.2.1)

## [2.2.2] - 2017-07-30
### Fixed
- Keep track of event listeners by generated ids

## [2.2.1] - 2017-07-30
### Fixed
- [Microsoft IME input with 'tt' / っ](https://github.com/WaniKani/WanaKana/issues/48)

## [2.2.0] - 2017-07-13
### Added
- Options object setting `IMEMode` can now accept `'toHiragana'` or `'toKatakana'` to enforce specific conversion on input

## [2.1.0] - 2017-07-09
### Added
- Set `autocapitalize="none"` on bound input fields
- Handle multiple event listeners with separate options
- Increased test coverage

### Fixed
- Hold onto merged options for dom utils via closure instead of global
- Keep track of event listeners for removal on unbind

### Changed
- `bind`, `unbind` are now named exports in 'wanakana/domUtils'

## [2.0.4] - 2017-07-07
### Fixed
- Wanakana website address in package.json

## [2.0.3] - 2017-07-07
### Fixed
- Missing description field in package.json

## [2.0.2] - 2017-06-30
### Added
- Documentation regarding recommended use of autocapitalize="none" on input fields

### Changed
- Improve font readability on demo page

## [2.0.1] - 2017-06-17
### Changed
- Fixed some incorrect text references
- Internal build modifications

## [2.0.0] - 2017-06-17
### Added
- Changelog!
- Separate bundles for different environments (node, esmodules, browser)
- New method: `stripOkurigana()`
- New method: `tokenize()`
- Default options extended with `passRomaji` and `upcaseKatakana`
- [Extended docs](http://www.wanakana.com/docs)

### Fixed
- [Ambiguous N](https://github.com/WaniKani/WanaKana/issues/38) thanks to @DTJB
- [Mixed Case toHiragana](https://github.com/WaniKani/WanaKana/issues/39) thanks to @DTJB
- [Katakana Long Vowels](https://github.com/WaniKani/WanaKana/issues/40) thanks to @dianahervascastillo @maesierra @codebar @ladieswhocode
- [Missing Space](https://github.com/WaniKani/WanaKana/issues/50) thanks to @mimshwright

### Changed
- Transliteration converts major punctuation marks both ways.
- `isJapanese()` & `isRomaji()` check major punctuation.
- `isRomaji()` allows hepburn romanisation long vowels. (IE. Tōkyō)


[2.3.4]: https://github.com/WaniKani/WanaKana/compare/2.3.3...2.3.4
[2.3.3]: https://github.com/WaniKani/WanaKana/compare/2.3.2...2.3.3
[2.3.2]: https://github.com/WaniKani/WanaKana/compare/2.3.1...2.3.2
[2.3.1]: https://github.com/WaniKani/WanaKana/compare/2.3.0...2.3.1
[2.3.0]: https://github.com/WaniKani/WanaKana/compare/2.2.4...2.3.0
[2.2.4]: https://github.com/WaniKani/WanaKana/compare/2.2.3...2.2.4
[2.2.3]: https://github.com/WaniKani/WanaKana/compare/2.2.2...2.2.3
[2.2.2]: https://github.com/WaniKani/WanaKana/compare/2.2.1...2.2.2
[2.2.1]: https://github.com/WaniKani/WanaKana/compare/2.2.0...2.2.1
[2.2.0]: https://github.com/WaniKani/WanaKana/compare/2.1.0...2.2.0
[2.1.0]: https://github.com/WaniKani/WanaKana/compare/2.0.4...2.1.0
[2.0.4]: https://github.com/WaniKani/WanaKana/compare/2.0.3...2.0.4
[2.0.3]: https://github.com/WaniKani/WanaKana/compare/2.0.2...2.0.3
[2.0.2]: https://github.com/WaniKani/WanaKana/compare/2.0.1...2.0.2
[2.0.1]: https://github.com/WaniKani/WanaKana/compare/2.0.0...2.0.1
[2.0.0]: https://github.com/WaniKani/WanaKana/compare/1.3.7...2.0.0
