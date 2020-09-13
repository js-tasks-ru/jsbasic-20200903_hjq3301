describe('2-module-1-task', () => {
  it('должна складывать все зарплаты', () => {
    let salaries = {
      John: 1000,
      Ann: 1600,
      Pete: 1300
    };

    expect(sumSalary(salaries)).toEqual(3900);
  });

  it('должна игнорировать свойства других типов', () => {
    let salaries = {
      John: 1000,
      Ann: 1600,
      Pete: 1300,
      month: 'December',
      currency: 'USD',
      isPayed: false
    };

    expect(sumSalary(salaries)).toEqual(3900);
  });

  it('должна возвращать 0 если нет свойств с зарплатами', () => {
    let salaries = {
      month: 'December',
      currency: 'USD',
      isPayed: false
    };

    expect(sumSalary(salaries)).toEqual(0);
  });
});
