import { DEFAULT_OPTIONS } from './constants';
import convertFullwidthCharsToASCII from './utils/convertFullwidthCharsToASCII';
import toKana from './toKana';
/* import { addDebugListeners, removeDebugListeners } from './utils/logInputEvents';*/

const ELEMENTS = ['TEXTAREA', 'INPUT'];
let LISTENERS = [];
let idCounter = 0;

const newId = () => {
  idCounter += 1;
  return `${Date.now()}${idCounter}`;
};

/**
 * Binds eventListener for 'input' events to an input field to automagically replace values with kana
 * Can pass { IMEMode: 'toHiragana' } or `'toKatakana'` as second param to enforce kana conversion type
 * @param  {HTMLElement} input textarea, input[type="text"] etc
 * @param  {DefaultOptions} [options=defaultOptions] defaults to { IMEMode: true } using `toKana`
 */
export function bind(input, options = {}) {
  const listener = onInput(options);
  if (input instanceof Element && ELEMENTS.includes(input.nodeName)) {
    const id = newId();
    /* addDebugListeners(input);*/
    input.setAttribute('data-wanakana-id', id);
    input.autocapitalize = 'none'; // eslint-disable-line no-param-reassign
    input.addEventListener('input', listener);
    input.addEventListener('compositionstart', ignoreComposition);
    input.addEventListener('compositionend', unignoreComposition);
    LISTENERS = trackListener(listener, id);
  } else {
    console.warn('Input provided to wanakana.bind was not a valid input field.'); // eslint-disable-line no-console
  }
}

/**
 * Unbinds eventListener from input field
 * @param  {HTMLElement} input textarea, input[type="text"] etc
 */
export function unbind(input) {
  const trackedListener = findListener(input);
  if (trackedListener != null) {
    /* removeDebugListeners(input); */
    input.removeAttribute('data-wanakana-id');
    input.removeEventListener('input', trackedListener.handler);
    input.removeEventListener('compositionstart', ignoreComposition);
    input.removeEventListener('compositionend', unignoreComposition);
    LISTENERS = untrackListener(trackedListener);
  } else {
    console.warn('Input had no listener registered.'); // eslint-disable-line no-console
  }
}

/**
 * Automagically replaces input values with converted text to kana
 * @param  {Object} event DOM event to listen to
 * @param  {defaultOptions} [options] user config overrides, default conversion is toKana()
 * @return {Function} event handler with bound options
 * @ignore
 */
function onInput(options) {
  const config = Object.assign({}, DEFAULT_OPTIONS, options);

  return function listener(event) {
    const input = event.target;
    if (findListener(input).isComposing) return;

    const normalizedInputString = convertFullwidthCharsToASCII(input.value);
    const hiraOrKataString = setKanaType(normalizedInputString, config.IMEMode);
    const ensureIMEModeConfig = Object.assign({}, config, { IMEMode: true });
    const newText = toKana(hiraOrKataString, ensureIMEModeConfig);

    if (normalizedInputString !== newText) {
      input.value = newText;

      // Modern browsers, set cursor to the end of the new text
      if (input.setSelectionRange != null && typeof input.selectionStart === 'number') {
        input.setSelectionRange(input.value.length, input.value.length);
        return;
      }
      // < IE 9
      if (input.createTextRange != null) {
        input.focus();
        const range = input.createTextRange();
        range.collapse(false);
        range.select();
      }
    }
  };
}

function trackListener(listener, id) {
  return LISTENERS.concat({
    id,
    handler: listener,
    isComposing: false,
  });
}

function findListener(input) {
  return input && LISTENERS.find(({ id }) => id === input.getAttribute('data-wanakana-id'));
}

function untrackListener({ id: targetId }) {
  return LISTENERS.filter(({ id }) => id !== targetId);
}

function ignoreComposition(event) {
  findListener(event.target).isComposing = true;
}

function unignoreComposition(event) {
  const inputListener = findListener(event.target);
  inputListener.isComposing = false;
  // force a conversion in case final IME composition input was romaji
  inputListener.handler(event);
}

// easy way to still use `toKana` to handle IME input - but with forced conversion type
function setKanaType(input, flag) {
  switch (true) {
    case flag === 'toHiragana': return input.toLowerCase();
    case flag === 'toKatakana': return input.toUpperCase();
    default: return input;
  }
}
