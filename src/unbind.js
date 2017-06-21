import onInput from './utils/onInput';

/**
 * Unbinds eventListener from input field
 * @param  {HTMLElement} input textarea, input[type="text"] etc
 */
export function unbind(input) {
  input.removeEventListener('input', onInput);
}

export default unbind;
