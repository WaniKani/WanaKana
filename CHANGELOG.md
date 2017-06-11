# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

<!--
- TITLE
  - Add link at EOF to compare changes:
    - [2.2.3]: https://github.com/Kaniwani/KanaWana/compare/2.2.2...2.2.3
  - List release date in YYYY-MM-DD format
- DETAILS
  - Added: for new features.
  - Changed: for changes in existing functionality.
  - Deprecated: for once-stable features removed in upcoming releases.
  - Removed: for deprecated features removed in this release.
  - Fixed: for any bug fixes.
  - Security: to invite users to upgrade in case of vulnerabilities.
-->

## [Unreleased]
### Added
- Alias module with jsnext:main in `package.json` to cater for different bundling environments

## [2.2.4] - 2017-04-21
### Added
- Changelog for better package history

### Changed
- No longer rebuild docs automatically. Prevents messy git diffs due to the docs having inlined timestamps that always change despite no actual documentation changes.

## [2.2.3] - 2017-04-20
### Fixed
- Additional files copied to package dir (README etc)
- Homepage and Browser fields updated in package

## [2.2.2] - 2017-04-20
### Changed
- Documentation clarifications
- Relocate demo and docs to gh-pages dir

### Fixed
- Links to demo and docs
- Coveralls coverage after Travis success

## [2.2.1] - 2017-04-20
### Fixed
- Update Travis config due to NPM scripts name changes

## [2.2.0] - 2017-04-20
### Added
- Helper scripts for finalising build and publishing changes to NPM

### Changed
- Convert build from webpack to rollup

### Fixed
- ES module individual method imports for smaller builds

## [2.1.0] - 2017-04-13
### Added
- The following new methods are available
  - `stripOkurigana('踏み込む') // => '踏み込'`
- More punctuation conversion between romaji and kana
  - English :‘’“”[] and Japanese equivalents ：「」『』［］

### Changed
- Start prepending a `v` to version number as per github convention

## [2.0.0] - 2017-04-13
### Changed
- Methods renamed to better reflect their operation
- `isKanjiKana()` renamed to `isJapanese()`
- `isRomajiKana()` renamed to `isMixed()`

### Removed
- `isKanjiKana()`
- `isRomajiKana()`

## [1.3.0] - 2017-04-13
### Added
- `tokenize('すごく寒い') // => ['すごく', '寒', 'い']`
- Default parameters for functions
  - Modification methods default to `''`
  - Checker methods default to `false`

### Changed
- Internal util functions
- Further documentation

## [1.2.0] - 2017-01-12
### Changed
- `toKana()` converts ~ to 〜 automatically now
- Documentation updates

## [1.1.2] - 2017-01-04
### Changed
- Documentation updates
- Repo file structure, extracted methods to individual files
- Full core/utils test coverage

## [1.1.1] - 2017-01-01
### Added
- Extra documentation

### Changed
- Attempts to fix travis microtime dependency build

## [1.1.0] - 2017-01-01
### Changed
- `stripKana()` method is now `stripOkurigana()`

### Removed
- `stripKana()`

## [1.0.3] - 2016-12-31
### Added
- `stripKana()` method

### Changed
- Install instructions, license info, badges & demo links in readme

## [1.0.2] - 2016-12-19
### Added
- Multiple package entry points (es6, umd, cjs)

### Fixed
- Typos

## [1.0.1] - 2016-12-19
### Changed
- Updated readme

## [1.0.0] - 2016-12-19
### Initial release

[2.2.4]: https://github.com/Kaniwani/KanaWana/compare/v2.2.3...v2.2.4
[2.2.3]: https://github.com/Kaniwani/KanaWana/compare/v2.2.2...v2.2.3
[2.2.2]: https://github.com/Kaniwani/KanaWana/compare/v2.2.1...v2.2.2
[2.2.1]: https://github.com/Kaniwani/KanaWana/compare/v2.2.0...v2.2.1
[2.2.0]: https://github.com/Kaniwani/KanaWana/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/Kaniwani/KanaWana/compare/2.0.0...v2.1.0
[2.0.0]: https://github.com/Kaniwani/KanaWana/compare/1.3.0...2.0.0
[1.3.0]: https://github.com/Kaniwani/KanaWana/compare/1.2.0...1.3.0
[1.2.0]: https://github.com/Kaniwani/KanaWana/compare/1.1.2...1.2.0
[1.1.2]: https://github.com/Kaniwani/KanaWana/compare/1.1.1...1.1.2
[1.1.1]: https://github.com/Kaniwani/KanaWana/compare/1.1.1...1.1.2
[1.1.0]: https://github.com/Kaniwani/KanaWana/compare/1.0.3...1.1.0
[1.0.3]: https://github.com/Kaniwani/KanaWana/compare/1.0.2...1.0.3
[1.0.2]: https://github.com/Kaniwani/KanaWana/compare/1.0.1...1.0.2
[1.0.1]: https://github.com/Kaniwani/KanaWana/compare/1.0.0...1.0.1
[1.0.0]: https://github.com/Kaniwani/KanaWana/compare/3832a36...1.0.0
