/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
 let i = str.split('-');
 let b = i.map((word,index) {
   if (index == 0) {
     return false
   } else {
     word[0].toUpperCase() + word.slice(1);
     return i.join('');
   }
 })
}