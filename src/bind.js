import onInput from './utils/onInput';

/**
 * Binds eventListener for 'input' events to an input field to automagically replace values with kana
 * It is recommended to set `autocapitalize="none"` on the input field to prevent mobile devices from forcing the first input character to katakana.
 * @param  {HTMLElement} input textarea, input[type="text"] etc
 * @param  {DefaultOptions} [options=defaultOptions] user config overrides
 */
export function bind(input, options = {}) {
  window.wanakanaOptions = options;
  input.addEventListener('input', onInput);
}

export default bind;
