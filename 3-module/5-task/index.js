/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  let stringWithoutSpaces = str.split(' ').join();
  let itemsDividedByComma = stringWithoutSpaces.split(',');
  let numbersOnly = itemsDividedByComma
    .filter((item) => item !== '' && isFinite(item));

  let max = Math.max(...numbersOnly);
  let min = Math.min(...numbersOnly);

  return {min, max};
}
