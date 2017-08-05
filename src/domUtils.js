import { DEFAULT_OPTIONS } from './constants';
import convertFullwidthCharsToASCII from './utils/convertFullwidthCharsToASCII';
import isCharConsonant from './utils/isCharConsonant';
import toKana from './toKana';

const ELEMENTS = ['TEXTAREA', 'INPUT'];
let LISTENERS = [];
let idCounter = 0;
let ignoreMicrosoftIMEDoubleConsonant = false;

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
    input.setAttribute('data-wanakana-id', id);
    input.autocapitalize = 'none'; // eslint-disable-line no-param-reassign
    input.addEventListener('compositionupdate', onCompositionUpdate);
    input.addEventListener('input', listener);
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
    input.removeAttribute('data-wanakana-id');
    input.removeEventListener('compositionupdate', onCompositionUpdate);
    input.removeEventListener('input', trackedListener.handler);
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

    if (ignoreMicrosoftIMEDoubleConsonant) {
      ignoreMicrosoftIMEDoubleConsonant = false;
      return;
    }

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

function onCompositionUpdate(event) {
  const data = event.data || (event.detail && event.detail.data); // have to use custom event with detail in tests
  const finalTwoChars = (data && data.slice(-2).split('')) || [];
  const isFirstLetterN = finalTwoChars[0] === 'n';
  const isDoubleConsonant = finalTwoChars.every((char) => isCharConsonant(convertFullwidthCharsToASCII(char)));
  ignoreMicrosoftIMEDoubleConsonant = !isFirstLetterN && isDoubleConsonant;
}

function trackListener(listener, id) {
  return LISTENERS.concat({
    id,
    handler: listener,
  });
}

function findListener(input) {
  return input && LISTENERS.find(({ id }) => id === input.getAttribute('data-wanakana-id'));
}

function untrackListener({ id: targetId }) {
  return LISTENERS.filter(({ id }) => id !== targetId);
}

// easy way to still use `toKana` to handle IME input - but with forced conversion type
function setKanaType(input, flag) {
  switch (true) {
    case flag === 'toHiragana': return input.toLowerCase();
    case flag === 'toKatakana': return input.toUpperCase();
    default: return input;
  }
}
