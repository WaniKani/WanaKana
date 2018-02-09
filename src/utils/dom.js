import { TO_KANA_METHODS } from '../constants';
import isJapanese from '../isJapanese';
import toKana, { createRomajiToKanaMap } from '../toKana';
import mergeWithDefaultOptions from './mergeWithDefaultOptions';

let LISTENERS = [];

/**
 * Automagically replaces input values with converted text to kana
 * @param  {defaultOptions} [options] user config overrides, default conversion is toKana()
 * @return {Function} event handler with bound options
 * @ignore
 */
export function makeOnInput(options) {
  const mergedConfig = Object.assign({}, mergeWithDefaultOptions(options), {
    IMEMode: options.IMEMode || true,
  });

  return function onInput(event) {
    if (event.target.dataset.ignoreComposition === 'true') {
      return;
    }

    convertAndSetValue(event, { options: mergedConfig });
  };
}

export function convertAndSetValue({ target }, { options }) {
  const [head, textToConvert, tail] = splitInput(target.value, target.selectionEnd, options);
  const convertedText = toKana(textToConvert, options);

  if (textToConvert !== convertedText) {
    const newCursor = head.length + convertedText.length;
    target.value = head + convertedText + tail;
    target.setSelectionRange(newCursor, newCursor);
  }
}

/**
 * Sets flags used in onInput() due to composition events
 * @param  {defaultOptions} [options] user config overrides
 * @return {Function} event handler with bound options
 * @ignore
 */
export function makeOnComposition(options) {
  let isComposing = false;

  return function onComposition(event) {
    const { type, target } = event;

    if (type === 'compositionend') {
      isComposing = false;
      target.dataset.ignoreComposition = 'false';
    } else {
      // in composition
      isComposing = true;
    }

    if (type === 'compositionupdate' && isComposing && isJapanese(event.data)) {
      target.dataset.ignoreComposition = 'true';
    }
  };
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
export function splitInput(text = '', cursor = 0, config = {}) {
  let head;
  let toConvert;
  let tail;
  let triggers = Object.keys(createRomajiToKanaMap(config));
  triggers = [...triggers, ...triggers.map((char) => char.toUpperCase())];

  if (cursor === 0 && triggers.includes(text[0])) {
    [head, toConvert, tail] = workFromStart(text, triggers);
  } else if (cursor > 0) {
    [head, toConvert, tail] = workBackwards(text, cursor);
  } else {
    [head, toConvert] = takeWhileAndSlice(text, (char) => !triggers.includes(char));
    [toConvert, tail] = takeWhileAndSlice(toConvert, (char) => !isJapanese(char));
  }

  return [head, enforceKanaType(toConvert, config), tail];
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

function enforceKanaType(text = '', { IMEMode } = {}) {
  // Some keyboards autocapitalize first letter of input,
  // so enforce hiragana if all mora are not uppercase
  const mixedCase = /^[A-Z]+[a-z]+/.test(text);

  switch (true) {
    case IMEMode === TO_KANA_METHODS.KATAKANA:
      return text.toUpperCase();
    case IMEMode === TO_KANA_METHODS.HIRAGANA || mixedCase:
      return text.toLowerCase();
    default:
      return text;
  }
}
