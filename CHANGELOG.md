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


[2.0.0]: https://github.com/WaniKani/WanaKana/compare/2.0.0...1.3.7
