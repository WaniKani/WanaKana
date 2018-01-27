import simulant from 'jsdom-simulant';

import { TO_KANA_METHODS } from '../src/constants';
import { bind, unbind, toKana, toHiragana, toKatakana } from '../src/index';

// TODO: headless chrome test real dom rather than faking it
describe('event listener helpers', () => {
  document.body.innerHTML = `
      <div>
        <input id="ime" type="text" />
        <textarea id="ime2"></textarea>
        <input id="ime3" type="text" />
        <input class="has-no-id" type="text" />
      </div>
    `;
  const inputField1 = document.querySelector('#ime');
  const inputField2 = document.querySelector('#ime2');
  const inputField3 = document.querySelector('.has-no-id');

  it('fails safely with console warning when invalid element passed', () => {
    expect(() => bind()).not.toThrow();
    expect(() => bind('nerp')).not.toThrow();
    expect(() => unbind()).not.toThrow();
    expect(() => unbind('nerp')).not.toThrow();
  });

  it('adds onInput event listener', () => {
    bind(inputField1);
    inputField1.value = 'wanakana';
    simulant.fire(inputField1, 'input');
    expect(inputField1.value).toEqual('わなかな');
    expect(inputField1.getAttribute('data-wanakana-id')).toBeDefined();
  });

  it('forces autocapitalize "none"', () => {
    expect(inputField1.autocapitalize).toEqual('none');
  });

  it('removes onInput event listener', () => {
    unbind(inputField1);
    inputField1.value = 'fugu';
    simulant.fire(inputField1, 'input');
    expect(inputField1.value).toEqual('fugu');
    expect(inputField1.getAttribute('data-wanakana-id')).toBeNull();
  });

  it('forces IMEMode true if option not specified', () => {
    bind(inputField1);
    inputField1.value = "n'";
    simulant.fire(inputField1, 'input');
    expect(inputField1.value).toEqual('ん');
    unbind(inputField1);
  });

  it('should handle an options object', () => {
    bind(inputField1, { useObsoleteKana: true });
    inputField1.value = 'wiweWIWEwo';
    simulant.fire(inputField1, 'input');
    expect(inputField1.value).toEqual('ゐゑヰヱを');
    unbind(inputField1);
  });

  it('should allow conversion type selection', () => {
    bind(inputField1, { IMEMode: TO_KANA_METHODS.KATAKANA });
    bind(inputField2, { IMEMode: TO_KANA_METHODS.HIRAGANA });
    inputField1.value = 'amerika';
    inputField2.value = 'KURO';
    simulant.fire(inputField1, 'input');
    simulant.fire(inputField2, 'input');
    expect(inputField1.value).toEqual('アメリカ');
    expect(inputField2.value).toEqual('くろ');
    unbind(inputField1);
    unbind(inputField2);
  });

  it('should instantiate separate onInput bindings', () => {
    bind(inputField1, {});
    bind(inputField2, { useObsoleteKana: true });
    inputField1.value = 'WIWEwiwe';
    inputField2.value = 'WIWEwiwe';
    simulant.fire(inputField1, 'input');
    simulant.fire(inputField2, 'input');
    expect(inputField1.value).toEqual('ウィウェうぃうぇ');
    expect(inputField2.value).toEqual('ヰヱゐゑ');
    unbind(inputField1);
    unbind(inputField2);
  });

  it('should keep track of separate onInput bindings if element has no id', () => {
    bind(inputField2);
    bind(inputField3);
    inputField2.value = 'wana';
    inputField3.value = 'kana';
    simulant.fire(inputField2, 'input');
    simulant.fire(inputField3, 'input');
    expect(inputField2.value).toEqual('わな');
    expect(inputField3.value).toEqual('かな');
    unbind(inputField2);
    unbind(inputField3);
  });

  it('ignores double consonants following composeupdate', () => {
    bind(inputField1);
    inputField1.value = 'かｔ';
    simulant.fire(inputField1, 'input');
    expect(inputField1.value).toEqual('かｔ');
    inputField1.value = 'かｔｔ';
    // have to fake it... no compositionupdate in jsdom
    inputField1.dispatchEvent(
      new CustomEvent('compositionupdate', {
        bubbles: true,
        cancellable: true,
        detail: { data: 'かｔｔ' },
      })
    );
    simulant.fire(inputField1, 'input');
    expect(inputField1.value).toEqual('かｔｔ');
    unbind(inputField1);
  });

  it('should handle nonascii', () => {
    bind(inputField1);
    inputField1.value = 'ｈｉｒｏｉ';
    simulant.fire(inputField1, 'input');
    expect(inputField1.value).toEqual('ひろい');
    // skips setting value if conversion would be the same
    inputField1.value = 'かんじ';
    simulant.fire(inputField1, 'input');
    expect(inputField1.value).toEqual('かんじ');
    unbind(inputField1);
  });

  it('should keep the cursor at the correct position even after conversion', () => {
    bind(inputField1);
    const inputValue = 'sentaku';
    const expected = 'せんたく';
    const expectedCursorPositions = [0, 1, 1, 2, 3, 3, 4, 4];
    for (let index = 0; index < expected.length; index += 1) {
      inputField1.value = inputValue;
      inputField1.setSelectionRange(index, index);
      simulant.fire(inputField1, 'input');
      expect(inputField1.value).toEqual(expected);
      expect(inputField1.selectionStart).toBe(expectedCursorPositions[index]);
    }
    unbind(inputField1);
  });
  it('should keep the cursor at the correct position even after conversion', () => {
    bind(inputField1);
    const inputValue = 'senshitaku';
    const expected = 'せんしたく';
    const expectedCursorPositions = [0, 1, 1, 2, 3, 3, 3, 4, 4, 5, 5];
    for (let index = 0; index < expected.length; index += 1) {
      inputField1.value = inputValue;
      inputField1.setSelectionRange(index, index);
      simulant.fire(inputField1, 'input');
      expect(inputField1.value).toEqual(expected);
      expect(inputField1.selectionStart).toBe(expectedCursorPositions[index]);
    }
    unbind(inputField1);
  });
});

// TODO: headless chrome test real input field
describe('iMEMode', () => {
  /**
   * Simulate real typing by calling the function on every character in sequence
   * @param  {String} input
   * @param  {Object} options
   * @return {String} converted romaji as kana
   */
  function testTyping(input, options) {
    let pos = 1;
    let text = input;
    const len = text.length;
    // console.log(`--${text}--`);
    while (pos <= len) {
      let buffer = text.slice(0, pos);
      const rest = text.slice(pos);
      buffer = toKana(buffer, options);
      // console.log(`${pos}:${buffer} <-${rest}`);
      text = buffer + rest;
      pos += 1;
    }
    return text;
  }

  it("without IME mode, solo n's are transliterated.", () => expect(toKana('n')).toBe('ん'));
  it("without IME mode, double n's are transliterated.", () => expect(toKana('nn')).toBe('んん'));

  it("with IME mode, solo n's are not transliterated.", () =>
    expect(testTyping('n', { IMEMode: true })).toBe('n'));
  it("with IME mode, solo n's are not transliterated, even when cursor has been relocated.", () =>
    // pretending k,a,n -> かん| then moving curosr to か|ん and typing 'n'
    expect(testTyping('かnん', { IMEMode: true })).toBe('かnん'));

  // NOTE: I think we need to store cursor location onInput, diff the text to remove any existing Japanese
  // before it is sent to toKana(), rather than our current processing of ALL text through toKana
  // then we can convert the new input as it is entered whilst
  // re-applying the previous existing text around it when setting the input field value on conversion
  // (all while setting the correct cursor location again :/ )
  it("with IME mode, solo n's are not transliterated, even when cursor has been relocated.", () =>
    // pretending k,a,n,a -> かな| then moving curosr to か|な and typing 'n,y'
    expect(testTyping('かnyな', { IMEMode: true })).toBe('かnyな'));
  it("with IME mode, double n's are transliterated.", () =>
    expect(testTyping('nn', { IMEMode: true })).toBe('ん'));
  it('With IME mode, n + space are transliterated.', () =>
    expect(testTyping('n ', { IMEMode: true })).toBe('ん'));
  it("with IME mode, n + ' are transliterated.", () =>
    expect(testTyping("n'", { IMEMode: true })).toBe('ん'));
  it('With IME mode, ni.', () => expect(testTyping('ni', { IMEMode: true })).toBe('に'));

  it('kan', () => expect(testTyping('kan', { IMEMode: true })).toBe('かn'));
  it('kanp', () => expect(testTyping('kanp', { IMEMode: true })).toBe('かんp'));
  it('kanpai!', () => expect(testTyping('kanpai', { IMEMode: true })).toBe('かんぱい'));
  it('nihongo', () => expect(testTyping('nihongo', { IMEMode: true })).toBe('にほんご'));

  it("y doesn't count as a consonant for IME", () =>
    expect(testTyping('ny', { IMEMode: true })).toBe('ny'));
  it('nya works as expected', () => expect(testTyping('nya', { IMEMode: true })).toBe('にゃ'));

  it("with IME mode, solo N's are not transliterated - katakana.", () =>
    expect(testTyping('N', { IMEMode: true })).toBe('N'));
  it("with IME mode, double N's are transliterated - katakana.", () =>
    expect(testTyping('NN', { IMEMode: true })).toBe('ン'));
  it('With IME mode, NI - katakana.', () => expect(testTyping('NI', { IMEMode: true })).toBe('ニ'));
  it('With IME mode - KAN - katakana', () =>
    expect(testTyping('KAN', { IMEMode: true })).toBe('カN'));
  it('With IME mode - NIHONGO - katakana', () =>
    expect(testTyping('NIHONGO', { IMEMode: true })).toBe('ニホンゴ'));
});

describe('options', () => {
  describe('useObsoleteKana', () => {
    describe('toKana', () => {
      it('useObsoleteKana is false by default', () => expect(toKana('wi')).toBe('うぃ'));
      it('wi = ゐ (when useObsoleteKana is true)', () =>
        expect(toKana('wi', { useObsoleteKana: true })).toBe('ゐ'));
      it('we = ゑ (when useObsoleteKana is true)', () =>
        expect(toKana('we', { useObsoleteKana: true })).toBe('ゑ'));
      it('WI = ヰ (when useObsoleteKana is true)', () =>
        expect(toKana('WI', { useObsoleteKana: true })).toBe('ヰ'));
      it('WE = ヱ (when useObsoleteKana is true)', () =>
        expect(toKana('WE', { useObsoleteKana: true })).toBe('ヱ'));
    });

    describe('toHiragana', () => {
      it('useObsoleteKana is false by default', () => expect(toHiragana('wi')).toBe('うぃ'));
      it('wi = ゐ (when useObsoleteKana is true)', () =>
        expect(toHiragana('wi', { useObsoleteKana: true })).toBe('ゐ'));
      it('we = ゑ (when useObsoleteKana is true)', () =>
        expect(toHiragana('we', { useObsoleteKana: true })).toBe('ゑ'));
      it('wi = うぃ when useObsoleteKana is false', () =>
        expect(toHiragana('wi', { useObsoleteKana: false })).toBe('うぃ'));
    });

    describe('toKataKana', () => {
      it('wi = ウィ when useObsoleteKana is false', () =>
        expect(toKatakana('WI', { useObsoleteKana: false })).toBe('ウィ'));
      it('WI = ヰ (when useObsoleteKana is true)', () =>
        expect(toKatakana('wi', { useObsoleteKana: true })).toBe('ヰ'));
      it('WE = ヱ (when useObsoleteKana is true)', () =>
        expect(toKatakana('we', { useObsoleteKana: true })).toBe('ヱ'));
    });
  });
});
