import { DEFAULT_OPTIONS } from './constants';
import convertFullwidthCharsToASCII from './utils/convertFullwidthCharsToASCII';
import isCharConsonant from './utils/isCharConsonant';
import { splitIntoKana } from './toKana';
/* import { addDebugListeners, removeDebugListeners } from './utils/logInputEvents';*/

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
    /* addDebugListeners(input);*/
    input.setAttribute('data-wanakana-id', id);
    input.autocapitalize = 'none';
    input.addEventListener('compositionupdate', onCompositionUpdate);
    input.addEventListener('input', listener);
    LISTENERS = trackListener(listener, id);
  } else {
    // eslint-disable-next-line no-console
    console.warn('Input provided to Wanakana bind() was not a valid input field.');
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
    input.removeEventListener('compositionupdate', onCompositionUpdate);
    input.removeEventListener('input', trackedListener.handler);
    LISTENERS = untrackListener(trackedListener);
  } else {
    console.warn('Input called with Wanakana unbind() had no listener registered.'); // eslint-disable-line no-console
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
    const kanaTokens = splitIntoKana(hiraOrKataString, ensureIMEModeConfig);
    const newText = kanaTokens.map((token) => token[2]).join('');

    if (normalizedInputString !== newText) {
      const { selectionEnd } = input;
      input.value = newText;

      // Modern browsers
      if (input.setSelectionRange != null && typeof input.selectionStart === 'number') {
        if (selectionEnd === 0) {
          input.setSelectionRange(0, 0);
        } else {
          input.setSelectionRange(input.value.length, input.value.length);
          let kanaLength = 0;
          for (let index = 0; index < kanaTokens.length; index += 1) {
            const [, tokenEnd, tokenKana] = kanaTokens[index];
            kanaLength += tokenKana.length;
            if (tokenEnd >= selectionEnd) {
              input.setSelectionRange(kanaLength, kanaLength);
              break;
            }
          }
        }
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

/**
 * Sets a flag on compositionupdate for a once-off ignore in onInput
 * see https://github.com/WaniKani/WanaKana/issues/48
 * @param  {object} event compositionupdate event
 */
function onCompositionUpdate(event) {
  const data = event.data || (event.detail && event.detail.data); // have to use custom event with detail in tests
  const finalTwoChars = (data && data.slice(-2)) || '';
  const isFirstLetterN = finalTwoChars[0] === 'n';
  const isDoubleConsonant = convertFullwidthCharsToASCII(finalTwoChars)
    .split('')
    .every(isCharConsonant);

  ignoreMicrosoftIMEDoubleConsonant = !isFirstLetterN && isDoubleConsonant;
}

function trackListener(listener, id) {
  return LISTENERS.concat({
    id,
    handler: listener,
  });
}

function findListener(input) {
  return (
    input && LISTENERS.find(({ id }) => id === input.getAttribute('data-wanakana-id'))
  );
}

function untrackListener({ id: targetId }) {
  return LISTENERS.filter(({ id }) => id !== targetId);
}

// easy way to still use `toKana` to handle IME input - but with forced conversion type
function setKanaType(input, flag) {
  switch (true) {
    case flag === 'toHiragana':
      return input.toLowerCase();
    case flag === 'toKatakana':
      return input.toUpperCase();
    default:
      return input;
  }
}
