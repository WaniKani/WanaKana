/* eslint-disable no-console */
const onBeforeInput = ({ data, target: { value } }) => console.log(`beforeinput data ${data}, value: ${value}`);
const onInput = ({ target }) => console.log(`input: ${target.value}`);
const onChange = ({ target }) => console.log(`change: ${target.value}`);
const onKeypress = ({ which }) => console.log(`keypress: ${String.fromCharCode(which)}`);
const onCompositionStart = () => console.log('compositionstart');
const onCompositionEnd = () => console.log('compositionend');
const onCompositionUpdate = (event) => console.log(`compositionupdate: ${event.data}`);

const events = {
  beforeinput: onBeforeInput,
  input: onInput,
  change: onChange,
  keypress: onKeypress,
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
