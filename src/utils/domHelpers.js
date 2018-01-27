import { DEFAULT_OPTIONS, TO_KANA_METHODS } from '../constants';
import toKana from '../toKana';
import isJapanese from '../isJapanese';
import tokenize from '../tokenize';
import zenkakuToASCII from './zenkakuToASCII';
import isCharConsonant from './isCharConsonant';

let LISTENERS = [];
let ignoreMicrosoftIMEDoubleConsonant = false;
let state = {};

/**
 * Automagically replaces input values with converted text to kana
 * @param  {Object} event DOM event to listen to
 * @param  {defaultOptions} [options] user config overrides, default conversion is toKana()
 * @return {Function} event handler with bound options
 * @ignore
 */
export function onInput(options) {
  const config = Object.assign({}, DEFAULT_OPTIONS, options);

  return function listener(event) {
    const input = event.target;
    let text = input.value;

    const isComposing = false; // TODO: continue functionality from react-wanakana

    if (ignoreMicrosoftIMEDoubleConsonant || isComposing || isJapanese(text)) {
      ignoreMicrosoftIMEDoubleConsonant = false;
      return;
    }

    // allows splicing mid-string text conversion: わび わs|び わsa|び -> わさ|び
    const tokens = tokenize(text);
    const currentChar = text.charAt(input.selectionStart - 1);
    let tokenIndex = state.currentTokenIndex > 0 ? state.currentTokenIndex : null;
    if (tokenIndex != null && tokenIndex <= tokens.length) {
      if (!(tokens[tokenIndex] || '').endsWith(currentChar)) {
        tokenIndex = tokens.findIndex((tok, i) => i !== tokenIndex && tok.endsWith(currentChar));
      }
    } else {
      // NOTE: sometimes "wrong" if two positions have the same starting romaji char
      // こsこs|こ might select こ*s*こsこ internally but when the second char is input
      // こsこso|こ -> こsこそ|こ it'll replace the right token
      tokenIndex = tokens.findIndex((tok) => tok.endsWith(currentChar));
    }
    console.log(tokenize(text, { compact: true, detailed: true }));
    console.log(tokenize(text, { detailed: true }));
    // NOTE: numbers break stuff if in first token due to way tokenize groups romaji/numbers :/
    const numbersInStartingTokenEdgeCase = tokenIndex === -1 && /\d+/.test(tokens[0]);
    if (numbersInStartingTokenEdgeCase) {
      tokenIndex = 0;
    }

    text = tokens[tokenIndex] || text;

    state = {
      head: tokens.slice(0, tokenIndex).join(''),
      currentTokenIndex: tokenIndex,
      tail: tokens.slice(tokenIndex + 1).join(''),
    };

    const normalizedInputString = zenkakuToASCII(text);
    const hiraOrKataString = setKanaType(normalizedInputString, config.IMEMode);
    const ensureIMEModeConfig = Object.assign({}, config, { IMEMode: true });
    const newText = toKana(hiraOrKataString, ensureIMEModeConfig);

    if (normalizedInputString !== newText) {
      input.value = state.head + newText + state.tail;
      const newCursor = state.head.length + newText.length;
      input.setSelectionRange(newCursor, newCursor);
      state = {};
    }
  };
}

/**
 * Sets a flag on compositionupdate for a once-off ignore in onInput
 * see https://github.com/WaniKani/WanaKana/issues/48
 * @param  {object} event compositionupdate event
 * @ignore
 */
export function onCompositionUpdate(event) {
  // allow using custom event with "detail" key in tests
  const data = event.data || (event.detail && event.detail.data);
  const finalTwoChars = (data && data.slice(-2)) || '';
  const isFirstLetterN = finalTwoChars[0] === 'n';
  const isDoubleConsonant = zenkakuToASCII(finalTwoChars)
    .split('')
    .every(isCharConsonant);

  ignoreMicrosoftIMEDoubleConsonant = !isFirstLetterN && isDoubleConsonant;
}

export function trackListener(listener, id) {
  LISTENERS = LISTENERS.concat({
    id,
    handler: listener,
  });
}

export function untrackListener({ id: targetId }) {
  LISTENERS = LISTENERS.filter(({ id }) => id !== targetId);
}

export function findListener(input) {
  return input && LISTENERS.find(({ id }) => id === input.getAttribute('data-wanakana-id'));
}

// easy way to still use `toKana` to handle IME input - but with forced conversion type
function setKanaType(input, flag) {
  switch (true) {
    case flag === TO_KANA_METHODS.HIRAGANA:
      return input.toLowerCase();
    case flag === TO_KANA_METHODS.KATAKANA:
      return input.toUpperCase();
    default:
      return input;
  }
}
