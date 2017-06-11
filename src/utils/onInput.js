import { DEFAULT_OPTIONS } from '../constants';
import toKana from '../toKana';
import convertFullwidthCharsToASCII from './convertFullwidthCharsToASCII';

/**
 * Automagically replaces input values with converted text to kana
 * @param  {Object} event DOM event to listen to
 * @param  {defaultOptions} [options] user config overrides, {IMEMode: true} cannot be changed
 * @ignore
 */
export function onInput(event) {
  const config = Object.assign({}, DEFAULT_OPTIONS, window.wanakanaOptions, { IMEMode: true });
  const input = event.target;
  // const startingCursor = input.selectionStart;
  // const startingLength = input.value.length;
  const normalizedInputString = convertFullwidthCharsToASCII(input.value);
  const newText = toKana(normalizedInputString, config);
  if (normalizedInputString !== newText) {
    input.value = newText;
    if (typeof input.selectionStart === 'number') {
      input.selectionStart = input.value.length;
      input.selectionEnd = input.value.length;
      return;
    }
    if (typeof input.createTextRange !== 'undefined') {
      input.focus();
      const range = input.createTextRange();
      range.collapse(false);
      range.select();
    }
  }
}

export default onInput;
