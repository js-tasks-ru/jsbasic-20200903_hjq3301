import categories from './categories.js';
import RibbonMenu from './index.js';

describe('7-module-1-task', () => {
  let sut;

  let ribbonInner;
  let ribbonArrowRight;
  let ribbonArrowLeft;

  let clickEvent;

  beforeEach(() => {
    sut = new RibbonMenu(categories);
    document.body.append(sut.elem);

    ribbonInner = sut.elem.querySelector('.ribbon__inner');

    ribbonArrowRight = sut.elem.querySelector('.ribbon__arrow_right');
    ribbonArrowLeft = sut.elem.querySelector('.ribbon__arrow_left');

    clickEvent = new MouseEvent('click', { bubbles: true });
  });

  afterEach(() => {
    sut.elem.remove();
  });

  describe('отрисовка вёрстки после создания', () => {
    it('должна добавлять корневой элемент в свойство "elem"', () => {
      expect(sut.elem.classList.contains('ribbon')).toBe(true);
    });

    it('должна отрисовать все категории', () => {
      let categoriesElements = sut.elem.querySelectorAll('.ribbon__item');

      expect(categoriesElements.length).toBe(9);
    });
  });

  describe('прокрутка', () => {
    let scrollBySpy;

    beforeEach(() => {
      scrollBySpy = spyOn(ribbonInner, 'scrollBy').and.callThrough();
    });

    describe('вперёд', () => {
      it('при клике на кнопке "вперёд", должна прокрутить на 350px вперёд', () => {
        ribbonArrowRight.dispatchEvent(clickEvent);

        expect(scrollBySpy).toHaveBeenCalledWith(350, 0);
      });
    });

    describe('назад', () => {
      beforeEach(() => {
        ribbonArrowRight.dispatchEvent(clickEvent);
        ribbonArrowRight.dispatchEvent(clickEvent);
      });

      it('при клике по кнопке "назад", должна прокрутить на 350px назад', () => {
        ribbonArrowLeft.dispatchEvent(clickEvent);

        expect(scrollBySpy).toHaveBeenCalledWith(-350, 0);
      });
    });

  });

  describe('выбор категории', () => {
    let ribbonSelectEventName;
    let ribbonSelectEvent;
    let category;

    beforeEach(() => {
      ribbonSelectEventName = 'ribbon-select';

      document.body.addEventListener(ribbonSelectEventName, (event) => {
        ribbonSelectEvent = event;
      }, { once: true });

      category = categories[1];
      let categorySelectButton = sut.elem.querySelector(`[data-id="${category.id}"]`);

      categorySelectButton.dispatchEvent(clickEvent);
    });

    it('после клика по ссылке, должно быть создано событие', () => {
      expect(ribbonSelectEvent instanceof CustomEvent).toBe(true);
    });

    it('созданное событие должно содержать в себе уникальный идентификатор товара ("id")', () => {
      expect(ribbonSelectEvent.detail).toBe(category.id);
    });
  });
});
