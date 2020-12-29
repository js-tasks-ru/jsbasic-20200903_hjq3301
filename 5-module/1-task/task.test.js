describe('5-module-1-task', () => {
  let buttonElement;

  beforeEach(() => {
    buttonElement = document.createElement('button');
    buttonElement.textContent = 'Нажмите, чтобы спрятать';
    buttonElement.className = 'hide-self-button';

    document.body.append(buttonElement);

    hideSelf();
  });

  afterEach(() => {
    buttonElement.remove();
  });

  it('после клика по кнопке она должна исчезнуть', () => {
    let clickEvent = new MouseEvent('click', { bubbles: true });
    buttonElement.dispatchEvent(clickEvent);

    expect(buttonElement.hidden).toBeTruthy();
  });
});
