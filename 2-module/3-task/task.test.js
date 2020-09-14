describe('2-module-3-task', () => {
  it('должно складывать числа', () => {
    calculator.read(3, 5);
    expect(calculator.sum()).toBe(8);
  });

  it('должно умножать числа', () => {
    calculator.read(3, 5);
    expect(calculator.mul()).toBe(15);
  });
});
