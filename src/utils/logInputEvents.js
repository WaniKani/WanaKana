/* eslint-disable no-console */
const onInput = ({ target: { value, selectionStart, selectionEnd } }) => console.log('input:', { value, selectionStart, selectionEnd });
const onCompositionStart = () => console.log('compositionstart');
const onCompositionUpdate = ({
  target: { value, selectionStart, selectionEnd },
  data,
}) => console.log('compositionupdate', {
  data,
  value,
  selectionStart,
  selectionEnd,
});
const onCompositionEnd = () => console.log('compositionend');

const events = {
  input: onInput,
  compositionstart: onCompositionStart,
  compositionupdate: onCompositionUpdate,
  compositionend: onCompositionEnd,
};

export const addDebugListeners = (input) => {
  Object.entries(events).forEach(([event, handler]) => input.addEventListener(event, handler)
  );
};

export const removeDebugListeners = (input) => {
  Object.entries(events).forEach(([event, handler]) => input.removeEventListener(event, handler)
  );
};
