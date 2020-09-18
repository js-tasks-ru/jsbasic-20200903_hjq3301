/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
 let i = str.split('-').map(function(word,index) {
  if (index == 0) {
    return word
  } else {
    let c = word[0].toUpperCase() + word.slice(1);
    return c;
  }
}) 
 return i.join('');
}