/**
 * ucFirst
 * @param {string} str
 * @returns {string}
 */
function ucFirst(str) {
  let firstLetter = str.charAt(0);
  let firstLetterUpperCase = firstLetter.toUpperCase();
  let otherLetters = str.slice(1);

  return `${firstLetterUpperCase}${otherLetters}`;
}
