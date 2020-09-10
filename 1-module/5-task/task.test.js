describe('1-module-5-task', () => {
  it('должна усекать строку ', () => {
    let baseStr = 'Вот, что мне хотелось бы сказать на эту тему:';
    let resultStr = 'Вот, что мне хотело…';

    expect(truncate(baseStr, 20)).toBe(resultStr);
  });

  it('должна не трогать короткую строку ', () => {
    let baseStr = 'Всем привет!';

    expect(truncate(baseStr, 20)).toBe(baseStr);
  });
});
