/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  let num = str.split(",").join(" ").split(" ").filter((item) => parseFloat(item));
  return {
    min: Math.min(...num),
    max: Math.max(...num),
  };
}
