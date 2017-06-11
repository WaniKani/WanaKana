import isEmpty from './isEmpty';

/**
 * Tests a character and an english vowel. Returns true if the char is a vowel.
 * @param  {String} char
 * @param  {Boolean} [includeY=true] Optional parameter to include y as a vowel in test
 * @return {Boolean}
 */
function isCharVowel(char = '', includeY = true) {
  if (isEmpty(char)) return false;
  const regexp = includeY ? /[aeiouy]/ : /[aeiou]/;
  return char.toLowerCase().charAt(0).search(regexp) !== -1;
}

export default isCharVowel;
