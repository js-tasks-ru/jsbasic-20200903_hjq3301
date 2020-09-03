/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  let i = 1;
  while(n) {
    i *= n--;
  }
  return i;
}  
factorial(0); 
factorial(1);
factorial(3); 
factorial(5); 


