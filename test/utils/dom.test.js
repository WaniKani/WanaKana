import { splitInput } from '../../src/utils/dom';
import { createRomajiToKanaMap } from '../../src/toKana';

describe('splitInput', () => {
  const preConfiguredMap = createRomajiToKanaMap(true /* IMEMode */);
  const triggers = [
    ...Object.keys(preConfiguredMap),
    ...Object.keys(preConfiguredMap).map((char) => char.toUpperCase()),
  ];

  describe('divides parts properly', () => {
    it('wa2なn', () => expect(splitInput("wa2なn'", 0, triggers)).toEqual(['', 'wa', "2なn'"]));
    it('n', () => expect(splitInput("n'な", 0, triggers)).toEqual(['', "n'", 'な']));
    it('なn', () => expect(splitInput("なn'", 0, triggers)).toEqual(['な', "n'", '']));
    it('12１２aaａａ', () => expect(splitInput('12１２aaａａ.。', 0, triggers)).toEqual(['12１２', 'aa', 'ａａ.。']));
    it('わn', () => expect(splitInput("わn'な", 0, triggers)).toEqual(['わ', "n'", 'な']));
    it('わn', () => expect(splitInput('わn な', 0, triggers)).toEqual(['わ', 'n ', 'な']));
    it('わshinな', () => expect(splitInput('わshinな', 5, triggers)).toEqual(['わ', 'shin', 'な']));
    it('かnyaな', () => expect(splitInput('かnyaな', 4, triggers)).toEqual(['か', 'nya', 'な']));
    it('わRA-MENな', () => expect(splitInput('わRA-MENな', 0, triggers)).toEqual(['わ', 'RA-MEN', 'な']));
    it('こsこrこsこ', () => expect(splitInput('こsこrこsこ', 0, triggers)).toEqual(['こ', 's', 'こrこsこ']));
    it('こsこrこshiこ', () => expect(splitInput('こsこrこshiこ', 8, triggers)).toEqual(['こsこrこ', 'shi', 'こ']));
    it('こsこrこsこ', () => expect(splitInput('こsこrこsこ', 4, triggers)).toEqual(['こsこ', 'r', 'こsこ']));
    it('こsoこrこsこ', () => expect(splitInput('こsoこrこsこ', 3, triggers)).toEqual(['こ', 'so', 'こrこsこ']));
  });
});
