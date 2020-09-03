describe('1-module-1-task', () => {
  it('факториал 0 равен 1', () => {
    expect(factorial(0)).toEqual(1);
  });

  it('факториал 1 равен 1', () => {
    expect(factorial(1)).toEqual(1);
  });

  it('факториал 3 равен 6 ', () => {
    expect(factorial(3)).toEqual(6);
  });

  it('факториал 5 равен 120 ', () => {
    expect(factorial(5)).toEqual(120);
  });
});
