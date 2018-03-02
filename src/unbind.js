import { findListeners, untrackListeners } from './utils/dom';
import { removeDebugListeners } from './utils/logInputEvents';

/**
 * Unbinds eventListener from input field
 * @param  {HTMLElement} element textarea, input
 */
export function unbind(element, debug = false) {
  const listeners = findListeners(element);
  if (listeners == null) {
    throw new Error(
      `Element provided to Wanakana unbind() had no listener registered.\n Received: ${JSON.stringify(
        element
      )}`
    );
  }
  const { inputHandler, compositionHandler } = listeners;
  element.removeAttribute('data-wanakana-id');
  element.removeAttribute('data-ignore-composition');
  element.removeEventListener('input', inputHandler);
  element.removeEventListener('compositionstart', compositionHandler);
  element.removeEventListener('compositionupdate', compositionHandler);
  element.removeEventListener('compositionend', compositionHandler);
  untrackListeners(listeners);
  if (debug === true) {
    removeDebugListeners(element);
  }
}

export default unbind;
