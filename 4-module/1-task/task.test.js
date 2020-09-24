describe('4-module-1-task', () => {
  const friends = [
    {
      firstName: 'Artsiom',
      lastName: 'Mezin',
    },
    {
      firstName: 'Ilia',
      lastName: 'Kantor',
    },
    {
      firstName: 'Christopher',
      lastName: 'Michael',
    },
  ];

  it('функция должна возвращать HTML список', () => {
    const ul = makeFriendsList(friends);

    expect(ul && ul.constructor).toEqual(HTMLUListElement, 'Результат вызова функции не HTMLUListElement');
  });

  it('Число элементов в списке и число объектов в массиве должны быть одинаковыми', () => {
    const ul = makeFriendsList(friends);
    const lis = ul && ul.querySelectorAll('li');

    expect(lis.length).toEqual(friends.length, 'Отличается длина списка и массива данных');
  });

  it('проверяем содержимое списка', () => {
    const ul = makeFriendsList(friends);
    const lis = ul && ul.querySelectorAll('li');

    lis.forEach((li, index) => {
      const actualFirstName = li.innerHTML.includes(friends[index].firstName);
      const actualLastName = li.innerHTML.includes(friends[index].lastName);

      expect(actualFirstName, `Элемент номер ${index} не содержит firstName`);
      expect(actualLastName, `Элемент номер ${index} не содержит lastName`);
    });
  });
});
