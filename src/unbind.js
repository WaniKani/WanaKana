import { findListener, untrackListener } from './utils/dom';
import { removeDebugListeners } from './utils/logInputEvents';

/**
 * Unbinds eventListener from input field
 * @param  {HTMLElement} input <textarea>, <input>
 */
export function unbind(input) {
  const trackedListener = findListener(input);
  if (trackedListener == null) {
    throw new Error(
      `Element provided to Wanakana unbind() had no listener registered.\n Received: ${JSON.stringify(
        input
      )}`
    );
  }

  input.removeAttribute('data-wanakana-id');
  input.removeEventListener('input', trackedListener.handler);
  untrackListener(trackedListener);

  // eslint-disable-next-line no-underscore-dangle
  if (window && window.__DEBUG_WANAKANA) {
    removeDebugListeners(input);
  }
}

export default unbind;
