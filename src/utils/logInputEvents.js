/* eslint-disable no-console */
const onInput = ({ target, data }) =>
  console.log(`input: { data: ${data}, target.value: ${target.value} }`);
const onCompositionStart = () => console.log('compositionstart');
const onCompositionUpdate = ({ data }) => console.log(`compositionupdate: data: ${data}`);
const onCompositionEnd = () => console.log('compositionend');

const events = {
  input: onInput,
  compositionstart: onCompositionStart,
  compositionupdate: onCompositionUpdate,
  compositionend: onCompositionEnd,
};

export const addDebugListeners = (input) => {
  Object.entries(events).forEach(([event, handler]) => input.addEventListener(event, handler));
};

export const removeDebugListeners = (input) => {
  Object.entries(events).forEach(([event, handler]) => input.removeEventListener(event, handler));
};
