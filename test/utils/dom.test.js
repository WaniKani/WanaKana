import { splitInput } from '../../src/utils/dom';

describe('splitInput', () => {
  describe('divides parts properly', () => {
    it('wa2なn', () => expect(splitInput("wa2なn'")).toEqual(['', 'wa', "2なn'"]));
    it('n', () => expect(splitInput("n'な")).toEqual(['', "n'", 'な']));
    it('なn', () => expect(splitInput("なn'")).toEqual(['な', "n'", '']));
    it('12１２aaａａ', () =>
      expect(splitInput('12１２aaａａ.。')).toEqual(['12１２', 'aa', 'ａａ.。']));
    it('わn', () => expect(splitInput("わn'な")).toEqual(['わ', "n'", 'な']));
    it('わn', () => expect(splitInput('わn な')).toEqual(['わ', 'n ', 'な']));
    it('わshinな', () => expect(splitInput('わshinな')).toEqual(['わ', 'shin', 'な']));
    it('わRA', () => expect(splitInput('わRA-MENな')).toEqual(['わ', 'RA-MEN', 'な']));
    it('こsこrこsこ', () => expect(splitInput('こsこrこsこ')).toEqual(['こ', 's', 'こrこsこ']));
    it('こsこrこshiこ', () =>
      expect(splitInput('こsこrこshiこ', 8)).toEqual(['こsこrこ', 'shi', 'こ']));
    it('こsこrこsこ', () => expect(splitInput('こsこrこsこ', 4)).toEqual(['こsこ', 'r', 'こsこ']));
    it('こsoこrこsこ', () =>
      expect(splitInput('こsoこrこsこ', 3)).toEqual(['こ', 'so', 'こrこsこ']));
  });
});
