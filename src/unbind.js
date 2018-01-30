import { findListeners, untrackListeners } from './utils/dom';
import { removeDebugListeners } from './utils/logInputEvents';

/**
 * Unbinds eventListener from input field
 * @param  {HTMLElement} input <textarea>, <input>
 */
export function unbind(input, debug = false) {
  const listeners = findListeners(input);
  if (listeners == null) {
    throw new Error(
      `Element provided to Wanakana unbind() had no listener registered.\n Received: ${JSON.stringify(
        input
      )}`
    );
  }
  const { inputHandler, compositionHandler } = listeners;
  input.removeAttribute('data-wanakana-id');
  input.removeAttribute('data-is-composing');
  input.removeEventListener('input', inputHandler);
  input.removeEventListener('compositionstart', compositionHandler);
  input.removeEventListener('compositionupdate', compositionHandler);
  input.removeEventListener('compositionend', compositionHandler);
  untrackListeners(listeners);
  if (debug === true) {
    removeDebugListeners(input);
  }
}

export default unbind;
