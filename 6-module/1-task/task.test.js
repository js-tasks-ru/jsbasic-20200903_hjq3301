import UserTable from './index.js';

describe('6-module-1-task', () => {
  let sut;

  let clickEvent;

  beforeEach(() => {
    clickEvent = new MouseEvent('click', { bubbles: true });

    let rows = [
      {
        name: 'Вася',
        age: 25,
        salary: 1000,
        city: 'Самара'
      },
      {
        name: 'Петя',
        age: 30,
        salary: 1500,
        city: 'Москва'
      }
    ];

    sut = new UserTable(rows);

    document.body.append(sut.elem);
  });

  afterEach(() => {
    sut.elem.remove();
  });

  it('компонент должен отрисовать всех пользователей', () => {
    let rowsInHTMLlength = sut.elem.querySelectorAll('tbody tr').length;

    expect(rowsInHTMLlength).toBe(2);
  });

  it('при клике на кнопку удаляется строка', () => {
    let buttons = sut.elem.querySelectorAll('button');

    buttons[0].dispatchEvent(clickEvent);
    buttons[1].dispatchEvent(clickEvent);

    expect(sut.elem.querySelector('tbody tr')).toBeNull();
  });
});
