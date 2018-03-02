import { makeOnInput, onComposition, trackListeners } from './utils/dom';
import { addDebugListeners } from './utils/logInputEvents';

const ELEMENTS = ['TEXTAREA', 'INPUT'];

let idCounter = 0;
const newId = () => {
  idCounter += 1;
  return `${Date.now()}${idCounter}`;
};

/**
 * Binds eventListener for 'input' events to an input field to automagically replace values with kana
 * Can pass `{ IMEMode: 'toHiragana' || 'toKatakana' }` to enforce kana conversion type
 * @param  {HTMLElement} element textarea, input[type="text"] etc
 * @param  {DefaultOptions} [options=defaultOptions] defaults to { IMEMode: true } using `toKana`
 * @example
 * bind(document.querySelector('#myInput'));
 */
function bind(element = {}, options = {}, debug = false) {
  if (!ELEMENTS.includes(element.nodeName)) {
    throw new Error(
      `Element provided to Wanakana bind() was not a valid input or textarea element.\n Received: (${JSON.stringify(
        element
      )})`
    );
  }
  const onInput = makeOnInput(options);
  const id = newId();
  element.setAttribute('data-wanakana-id', id);
  element.setAttribute('lang', 'ja');
  element.setAttribute('autoCapitalize', 'none');
  element.setAttribute('autoCorrect', 'off');
  element.setAttribute('autoComplete', 'off');
  element.setAttribute('spellCheck', 'false');
  element.addEventListener('input', onInput);
  element.addEventListener('compositionupdate', onComposition);
  element.addEventListener('compositionend', onComposition);
  trackListeners(id, onInput, onComposition);
  if (debug === true) {
    addDebugListeners(element);
  }
}

export default bind;
