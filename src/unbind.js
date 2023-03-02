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
  const attributes = JSON.parse(element.dataset.previousAttributes);
  Object.keys(attributes).forEach((key) => {
    if (attributes[key]) {
      element.setAttribute(key, attributes[key]);
    } else {
      element.removeAttribute(key);
    }
  });
  element.removeAttribute('data-previous-attributes');
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
