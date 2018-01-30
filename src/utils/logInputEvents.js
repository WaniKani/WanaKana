/* eslint-disable no-console */
const onInput = ({ target }) => console.log(`input: ${target.value}`);
const onTextInput = ({ target }) => console.log(`textinput: ${target.value}`);
const onKeyDown = ({ key, which }) => console.log(`keydown: key: ${key} which: ${which}`);
const onKeyUp = ({ key, which }) => console.log(`keyup: key: ${key} which: ${which}`);
const onCompositionStart = () => console.log('compositionstart');
const onCompositionEnd = () => console.log('compositionend');
const onCompositionUpdate = (event) => console.log(`compositionupdate: data: ${event.data}`);

const events = {
  input: onInput,
  textinput: onTextInput,
  keydown: onKeyDown,
  keyup: onKeyUp,
  compositionstart: onCompositionStart,
  compositionend: onCompositionEnd,
  compositionupdate: onCompositionUpdate,
};

export const addDebugListeners = (input) => {
  Object.entries(events).forEach(([event, handler]) => input.addEventListener(event, handler));
};

export const removeDebugListeners = (input) => {
  Object.entries(events).forEach(([event, handler]) => input.removeEventListener(event, handler));
};
