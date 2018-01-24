import { findListener, onCompositionUpdate, untrackListener } from './utils/domHelpers';
import { removeDebugListeners } from './utils/logInputEvents';

/**
 * Unbinds eventListener from input field
 * @param  {HTMLElement} input textarea, input[type="text"] etc
 */
export function unbind(input) {
  const trackedListener = findListener(input);
  if (trackedListener != null) {
    // eslint-disable-next-line no-underscore-dangle
    if (window && window.__DEBUG_WANAKANA) {
      removeDebugListeners(input);
    }

    input.removeAttribute('data-wanakana-id');
    input.removeEventListener('compositionupdate', onCompositionUpdate);
    input.removeEventListener('input', trackedListener.handler);
    untrackListener(trackedListener);
  } else {
    console.warn('Element provided to Wanakana unbind() had no listener registered.'); // eslint-disable-line no-console
  }
}

export default unbind;
