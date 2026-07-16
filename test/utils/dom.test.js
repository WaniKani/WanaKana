import { makeOnInput, splitInput } from '../../src/utils/dom';
import { createRomajiToKanaMap } from '../../src/toKana';
import * as toKanaModule from '../../src/toKana';

function createFakeInput(initialValue) {
  return {
    value: initialValue,
    selectionEnd: initialValue.length,
    dataset: {},
    setSelectionRange(start) {
      this.selectionEnd = start;
    },
  };
}

describe('makeOnInput', () => {
  it('skips reprocessing when a duplicate "input" event fires with an unchanged value', () => {
    // Regression test for a dead-store bug: convertInput() used to reassign its local
    // `prevInput` parameter instead of the `prevInput` closed over by makeOnInput(), so the
    // dedup guard (`target.value !== prevInput`) never actually recorded what was already
    // processed. Every "input" event - including a redundant/duplicate one some hardware
    // keyboard + browser combinations fire for a single keystroke - was reprocessed from
    // scratch, which is one way an already-converted kana character could get reprocessed
    // and duplicated.
    const toKanaSpy = jest.spyOn(toKanaModule, 'default');
    const onInput = makeOnInput({ IMEMode: true });
    const target = createFakeInput('ka');

    onInput({ target });
    expect(target.value).toBe('か');
    expect(toKanaSpy).toHaveBeenCalledTimes(1);

    // Duplicate "input" event for the same value - nothing new was typed.
    onInput({ target });

    expect(target.value).toBe('か');
    expect(toKanaSpy).toHaveBeenCalledTimes(1);

    toKanaSpy.mockRestore();
  });
});

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
