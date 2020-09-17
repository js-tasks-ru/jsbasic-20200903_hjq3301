describe('2-module-2-task', () => {
  it('{} должен вернуть true', () => {
    const obj = {};
    expect(isEmpty(obj)).toEqual(true);
  });

  it('объект со свойством undefined должен считаться не пустым', () => {
    const obj = {
      test: true,
    };

    obj.test = undefined;

    expect(isEmpty(obj)).toEqual(false);
  });

  it('объект с удалённым свойством - пустой', () => {
    const obj = {
      test: true,
    };

    delete obj.test;

    expect(isEmpty(obj)).toEqual(true);
  });

  it('если у объекта есть хоть одно свойство, то он не пустой', () => {
    const obj = {
      test: true,
    };

    expect(isEmpty(obj)).toEqual(false);
  });
});
