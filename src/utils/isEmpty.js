import typeOf from './typeOf';
/**
 * Checks if input string is empty
 * @param  {String} input text input
 * @return {Boolean} true if no input
 */
function isEmpty(input) {
  if (typeOf(input) !== 'string') {
    return true;
  }
  return !input.length;
}

export default isEmpty;
