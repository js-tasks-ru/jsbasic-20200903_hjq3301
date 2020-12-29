/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
     *          name: 'Ilia',
     *          age: 25,
     *          salary: '1000',
     *          city: 'Petrozavodsk'
     *      },
 *
 * @constructor
 */
export default class UserTable {
  constructor(rows) {
    this.elem = document.createElement('table');

    this.elem.innerHTML = `
      <thead>
          <tr>
            <td>Имя</td>
            <td>Возраст</td>
            <td>Зарплата</td>
            <td>Город</td>
            <td></td>
          </tr>
      </thead>
    `;

    let tbody = this.elem.querySelector('tbody');

    let tableInner = rows.map(row => {
      let cellsWithData = Object.values(row) // для каждого значения из объекта row
        .map(value => `<td>${value}</td>`) // обернуть его в <td>
        .join(''); // полученный массив <td>...</td> объединить в одну строку

      return `
          <tr>
            ${cellsWithData}
            <td><button>X</button></td>
          </tr>
        `; // возвращаем верстку одной строки
    }).join('');

    this.elem.innerHTML += `
      <tbody>
        ${tableInner}
      <tbody>
    `; // оборачиваем полученные строчки в tbody

    this.elem.addEventListener('click', (event) => this.onClick(event));
  }

  onClick(event) {
    if (event.target.tagName != 'BUTTON') {
      return;
    }

    let tr = event.target.closest('tr');

    tr.remove();
  }

}
