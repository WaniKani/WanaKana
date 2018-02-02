/* eslint-disable no-console */
const onInput = ({ target }) => console.log(`input: ${target.value}`);
const onTextInput = ({ target }) => console.log(`textinput: ${target.value}`);
const onKeyDown = ({ key, which }) => {
  const char = String.fromCharCode(which);
  const message = `which: ${which} ${/[a-z]/i.test(char) ? `char: ${char}` : ''}`;
  console.log(`$keydown: ${message}`);
};
const onCompositionStart = () => console.log('compositionstart');
const onCompositionEnd = () => console.log('compositionend');
const onCompositionUpdate = ({ data }) => console.log(`compositionupdate: data: ${data}`);

const events = {
  input: onInput,
  textinput: onTextInput,
  keydown: onKeyDown,
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
