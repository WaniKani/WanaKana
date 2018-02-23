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
  let prevInput;
  const mergedConfig = Object.assign({}, mergeWithDefaultOptions(options), {
    IMEMode: options.IMEMode || true,
  });
  const preConfiguredMap = createRomajiToKanaMap(mergedConfig);
  const triggers = [
    ...Object.keys(preConfiguredMap),
    ...Object.keys(preConfiguredMap).map((char) => char.toUpperCase()),
  ];

  return function onInput({ target }) {
    if (target.value !== prevInput && target.dataset.ignoreComposition !== 'true') {
      convertInput(target, mergedConfig, preConfiguredMap, triggers, prevInput);
    }
  };
}

export function convertInput(target, options, map, triggers, prevInput) {
  const [head, textToConvert, tail] = splitInput(target.value, target.selectionEnd, triggers);
  const convertedText = toKana(textToConvert, options, map);

  if (textToConvert !== convertedText) {
    const newCursor = head.length + convertedText.length;
    const newValue = head + convertedText + tail;
    target.value = newValue;
    prevInput = newValue;

    // push later on event loop (otherwise mid-text insertion can be 1 char too far to the right)
    tail.length
      ? setTimeout(() => target.setSelectionRange(newCursor, newCursor), 1)
      : target.setSelectionRange(newCursor, newCursor);
  } else {
    prevInput = target.value;
  }
}

export function onComposition({ type, target, data }) {
  if (type === 'compositionupdate' && isJapanese(data)) {
    target.dataset.ignoreComposition = 'true';
  }

  if (type === 'compositionend') {
    target.dataset.ignoreComposition = 'false';
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
export function splitInput(text = '', cursor = 0, triggers = []) {
  let head;
  let toConvert;
  let tail;

  if (cursor === 0 && triggers.includes(text[0])) {
    [head, toConvert, tail] = workFromStart(text, triggers);
  } else if (cursor > 0) {
    [head, toConvert, tail] = workBackwards(text, cursor);
  } else {
    [head, toConvert] = takeWhileAndSlice(text, (char) => !triggers.includes(char));
    [toConvert, tail] = takeWhileAndSlice(toConvert, (char) => !isJapanese(char));
  }

  return [head, toConvert, tail];
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
