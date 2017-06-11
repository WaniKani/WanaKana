import isEmpty from './isEmpty';
import isCharEnglishPunctuation from './isCharEnglishPunctuation';
import isCharJapanesePunctuation from './isCharJapanesePunctuation';

/**
 * Tests a character. Returns true if the character is considered Japanese or English punctuation.
 * @param  {String} char character string to test
 * @return {Boolean}
 */
function isCharPunctuation(char = '') {
  if (isEmpty(char)) return false;
  return isCharEnglishPunctuation(char) || isCharJapanesePunctuation(char);
}

export default isCharPunctuation;
