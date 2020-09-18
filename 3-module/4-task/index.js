/**
 * showSalary
 * @param {Array} users - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */

function showSalary(users, age) {
  const n = users.filter(function (i) {
    return users.age >= 40;
  }).map(function (i) {
    return `${users.name},${users.balance}`
  });
  return
}
