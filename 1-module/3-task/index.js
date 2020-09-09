/**
 * ucFirst
 * @param {string} str
 * @returns {string}
 */
function ucFirst(str) {
    if (str === '') {
      return '';
    } else {
    let i = str[0].toUpperCase();
    let b = i + str.substring(1,str.length);
      return b;
  };
};
