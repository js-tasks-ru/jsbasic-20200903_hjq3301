describe('1-module-4-task', () => {
  it('должна возвращать true для \'1XbeT now\'', () => {
    expect(checkSpam('1XbeT now')).toBe(true);
  });

  it('должна возвращать true для \'free xxxxx\'', () => {
    expect(checkSpam('free xxxxx')).toBe(true);
  });

  it('должна возвращать false для \'innocent rabbit\'', () => {
    expect(checkSpam('innocent rabbit')).toBe(false);
  });
});
