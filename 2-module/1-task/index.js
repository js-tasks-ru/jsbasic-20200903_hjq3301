/**
 * Складываем зарплаты
 * @param {Object} salaries - объект зарплат
 * @returns {Number}
 */
function sumSalary(salaries) {
  let sumOfSalaries = 0;

  for (let key in salaries) {
    let isSalary = typeof salaries[key] === 'number';

    if (isSalary) {
      sumOfSalaries += salaries[key];
    }
  }

  return sumOfSalaries;
}
