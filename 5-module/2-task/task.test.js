describe('5-module-2-task', () => {
  let buttonElement;
  let textElement;

  beforeEach(() => {
    buttonElement = document.createElement('button');
    buttonElement.textContent = 'Нажмите, чтобы спрятать/показать текст';
    buttonElement.className = 'toggle-text-button';

    textElement = document.createElement('div');
    textElement.id = 'text';
    textElement.textContent = 'Текст';

    document.body.append(buttonElement);
    document.body.append(textElement);

    toggleText();
  });

  afterEach(() => {
    buttonElement.remove();
    textElement.remove();
  });

  it('после первого клика по кнопке текст должен исчезнуть', () => {
    let clickEvent = new MouseEvent('click', { bubbles: true });
    buttonElement.dispatchEvent(clickEvent);

    expect(textElement.hidden).toBeTruthy();
  });

  it('после повторного клика по кнопке текст должен появиться', () => {
    let clickEvent = new MouseEvent('click', { bubbles: true });
    buttonElement.dispatchEvent(clickEvent);
    buttonElement.dispatchEvent(clickEvent);

    expect(textElement.hidden).toBeFalsy();
  });
});
