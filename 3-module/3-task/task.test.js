describe('3-module-3-task', () => {
  it('должна оставить пустую строку без изменений ', () => {
    expect(camelize('')).toBe('');
  });

  it('должна преобразовать \'background-color\'', () => {
    expect(camelize('background-color')).toBe('backgroundColor');
  });

  it('должна преобразовать \'list-style-image\' ', () => {
    expect(camelize('list-style-image')).toBe('listStyleImage');
  });

  it('должна преобразовать \'-webkit-transition\'', () => {
    expect(camelize('-webkit-transition')).toBe('WebkitTransition');
  });
});
