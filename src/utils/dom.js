import { TO_KANA_METHODS } from '../constants';
import isJapanese from '../isJapanese';
import toKana, { createRomajiToKanaMap } from '../toKana';
import mergeWithDefaultOptions from './mergeWithDefaultOptions';

let LISTENERS = [];

/**
 * Automagically replaces input values with converted text to kana
 * @param  {HTMLElement} [el] input/textarea element
 * @param  {defaultOptions} [options] user config overrides, default conversion is toKana()
 * @return {Function} event handler with bound options
 * @ignore
 */
export function makeOnInput(el, options) {
  const mergedConfig = Object.assign({}, mergeWithDefaultOptions(options), {
    IMEMode: options.IMEMode || true,
  });

  return function onInput({ target }) {
    const { dataset, value, selectionEnd } = target;
    if (dataset.isComposing === 'true') {
      console.log(`isComposing: early exit for value: ${value}`);
      return;
    }
    const [head, textToConvert, tail] = splitInput(value, selectionEnd, mergedConfig);
    const convertedText = toKana(textToConvert, mergedConfig);

    if (textToConvert !== convertedText) {
      target.value = head + convertedText + tail;
      const newCursor = head.length + convertedText.length;
      target.setSelectionRange(newCursor, newCursor);
    }
  };
}

export function onComposition({ target, type }) {
  const isChrome = window && !!window.chrome && !!window.chrome.webstore;

  if (type === 'compositionend') {
    target.dataset.isComposing = 'false';

    // Chrome fires 'compositionEnd' event after 'input' event.
    // https://chromium.googlesource.com/chromium/src/+/afce9d93e76f2ff81baaa088a4ea25f67d1a76b3%5E%21/
    if (isChrome) {
      const inputEvent = new Event('input');
      target.dispatchEvent(inputEvent);
    }
  } else {
    // in composition
    target.dataset.isComposing = 'true';
  }
}

export function trackListeners(id, inputHandler, compositionHandler) {
  LISTENERS = LISTENERS.concat({
    id,
    inputHandler,
    compositionHandler,
  });
}

export function untrackListeners({ id: targetId }) {
  LISTENERS = LISTENERS.filter(({ id }) => id !== targetId);
}

export function findListeners(el) {
  return el && LISTENERS.find(({ id }) => id === el.getAttribute('data-wanakana-id'));
}

// so we can handle non-terminal inserted input conversion:
// | -> わ| -> わび| -> わ|び -> わs|び -> わsh|び -> わshi|び -> わし|び
// or multiple ambiguous positioning (IE select which "s" to work from)
// こsこs|こsこ -> こsこso|こsこ -> こsこそ|こsこ
export function splitInput(text = '', startIndex = 0, config = {}) {
  let head;
  let toConvert;
  let tail;
  let triggers = Object.keys(createRomajiToKanaMap(config));
  triggers = [...triggers, ...triggers.map((char) => char.toUpperCase())];

  if (startIndex === 0 && triggers.includes(text[0])) {
    [head, toConvert, tail] = workFromStart(text, triggers);
    // NOTE: maybe we can just *always* work backwards?
  } else if (startIndex > 0) {
    [head, toConvert, tail] = workBackwards(text, startIndex);
  } else {
    [head, toConvert] = takeWhileAndSlice(text, (char) => !triggers.includes(char));
    [toConvert, tail] = takeWhileAndSlice(toConvert, (char) => !isJapanese(char));
  }

  return [head, setKanaType(toConvert, config), tail];
}

function workFromStart(text, catalystChars) {
  return [
    '',
    ...takeWhileAndSlice(
      text,
      (char) => catalystChars.includes(char) || !isJapanese(char, /[0-9]/)
    ),
  ];
}

function workBackwards(text = '', startIndex = 0) {
  const [toConvert, head] = takeWhileAndSlice(
    [...text.slice(0, startIndex)].reverse(),
    (char) => !isJapanese(char)
  );
  return [
    head.reverse().join(''),
    toConvert
      .split('')
      .reverse()
      .join(''),
    text.slice(startIndex),
  ];
}

function takeWhileAndSlice(source = {}, predicate = (x) => !!x) {
  const result = [];
  const { length } = source;
  let i = 0;
  while (i < length && predicate(source[i], i)) {
    result.push(source[i]);
    i += 1;
  }
  return [result.join(''), source.slice(i)];
}

// allow us to to continue use `toKana` to handle IME input with forced conversion type
function setKanaType(input = '', { IMEMode } = {}) {
  switch (true) {
    case IMEMode === TO_KANA_METHODS.HIRAGANA:
      return input.toLowerCase();
    case IMEMode === TO_KANA_METHODS.KATAKANA:
      return input.toUpperCase();
    default:
      return input;
  }
}
