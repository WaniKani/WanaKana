import { DEFAULT_OPTIONS, TO_KANA_METHODS } from '../constants';
import { splitIntoKana, toKana } from '../toKana';
import convertFullwidthCharsToASCII from './convertFullwidthCharsToASCII';
import isCharConsonant from './isCharConsonant';

let LISTENERS = [];
let ignoreMicrosoftIMEDoubleConsonant = false;

/**
 * Automagically replaces input values with converted text to kana
 * @param  {Object} event DOM event to listen to
 * @param  {defaultOptions} [options] user config overrides, default conversion is toKana()
 * @return {Function} event handler with bound options
 * @ignore
 */
export function onInput(options) {
  const config = Object.assign({}, DEFAULT_OPTIONS, options);
  return function listener(event) {
    const input = event.target;

    if (ignoreMicrosoftIMEDoubleConsonant) {
      ignoreMicrosoftIMEDoubleConsonant = false;
      return;
    }

    const normalizedInputString = convertFullwidthCharsToASCII(input.value);
    const hiraOrKataString = setKanaType(normalizedInputString, config.IMEMode);
    const ensureIMEModeConfig = Object.assign({}, config, { IMEMode: true });
    const kanaTokens = splitIntoKana(hiraOrKataString, ensureIMEModeConfig);
    const newText = toKana(hiraOrKataString, ensureIMEModeConfig);

    if (normalizedInputString !== newText) {
      const { selectionEnd } = input;
      input.value = newText;

      if (selectionEnd === 0) {
        input.setSelectionRange(0, 0);
      } else {
        input.setSelectionRange(input.value.length, input.value.length);
        let kanaLength = 0;
        for (let index = 0; index < kanaTokens.length; index += 1) {
          const [, tokenEnd, tokenKana = ''] = kanaTokens[index];
          kanaLength += tokenKana.length;
          if (tokenEnd >= selectionEnd) {
            input.setSelectionRange(kanaLength, kanaLength);
            break;
          }
        }
      }
    }
  };
}

/**
 * Sets a flag on compositionupdate for a once-off ignore in onInput
 * see https://github.com/WaniKani/WanaKana/issues/48
 * @param  {object} event compositionupdate event
 * @ignore
 */
export function onCompositionUpdate(event) {
  const data = event.data || (event.detail && event.detail.data); // have to use custom event with detail in tests
  const finalTwoChars = (data && data.slice(-2)) || '';
  const isFirstLetterN = finalTwoChars[0] === 'n';
  const isDoubleConsonant = convertFullwidthCharsToASCII(finalTwoChars)
    .split('')
    .every(isCharConsonant);

  ignoreMicrosoftIMEDoubleConsonant = !isFirstLetterN && isDoubleConsonant;
}

export function trackListener(listener, id) {
  LISTENERS = LISTENERS.concat({
    id,
    handler: listener,
  });
}

export function untrackListener({ id: targetId }) {
  LISTENERS = LISTENERS.filter(({ id }) => id !== targetId);
}

export function findListener(input) {
  return input && LISTENERS.find(({ id }) => id === input.getAttribute('data-wanakana-id'));
}

// easy way to still use `toKana` to handle IME input - but with forced conversion type
function setKanaType(input, flag) {
  switch (true) {
    case flag === TO_KANA_METHODS.HIRAGANA:
      return input.toLowerCase();
    case flag === TO_KANA_METHODS.KATAKANA:
      return input.toUpperCase();
    default:
      return input;
  }
}
