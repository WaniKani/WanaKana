/* eslint-disable no-console */
import isCharConsonant from '../../src/utils/isCharConsonant';

const valueObserver = new MutationObserver((mutations) => {
  mutations.forEach(({ target, oldValue }) => {
    console.log('value mutation', { target, newValue: target.value, newGetAttrValue: target.getAttribute('value'), oldValue });
  });
});

// Notify me of everything!
const observerConfig = {
  attributes: true,
  attributeFilter: ['value'],
  childList: false,
  attributeOldValue: true,
};

const onBeforeInput = (event) => console.log('beforeinput', event);
const onInput = ({ target }) => console.log(`input: ${target.value}`);
const onChange = ({ target }) => console.log(`change: ${target.value}`);
const onKeypress = ({ which }) => console.log(`keypress: ${String.fromCharCode(which)}`);
const onCompositionStart = () => console.log('compositionstart');
const onCompositionEnd = () => console.log('compositionend');
const onCompositionUpdate = (event) => {
  const [char1, char2] = event.data.slice(-2).split('');
  const isFirstLetterN = char1 === 'n';
  const isDoubleConsonant = isCharConsonant(char1) && char1 === char2;
  console.log(`compositionupdate: ${event.data}`);
  if (!isFirstLetterN && isDoubleConsonant) console.log('Ignoring next input event!', 'tomato');
};

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
  valueObserver.observe(input, observerConfig);
};

export const removeDebugListeners = (input) => {
  Object.entries(events).forEach(([event, handler]) => input.removeEventListener(event, handler));
  valueObserver.disconnect();
};
