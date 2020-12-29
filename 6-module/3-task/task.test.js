import slides from './slides.js';
import Carousel from './index.js';

describe('6-module-3-task', () => {
  let sut;

  let carouselInner;
  let carouselArrowRight;
  let carouselArrowLeft;

  let clickEvent;
  let testSlides;

  beforeEach(() => {
    testSlides = slides.slice(1);

    sut = new Carousel(testSlides);
    document.body.append(sut.elem);

    let slideWidth = '500px';

    carouselInner = sut.elem.querySelector('.carousel__inner');
    sut.elem.style.width = slideWidth;

    let slidesElements = sut.elem.querySelectorAll('.carousel__slide');

    slidesElements.forEach((slideElement) => {
      slideElement.style.width = slideWidth;
      let img = slideElement.querySelector('.carousel__img');

      if (img) {
        img.style.width = slideWidth;
      }
    });

    carouselArrowRight = sut.elem.querySelector('.carousel__arrow_right');
    carouselArrowLeft = sut.elem.querySelector('.carousel__arrow_left');

    clickEvent = new MouseEvent('click', { bubbles: true });
  });

  afterEach(() => {
    sut.elem.remove();
  });

  describe('отрисовка вёрстки после создания', () => {
    it('должна добавлять корневой элемент в свойство "elem"', () => {
      expect(sut.elem.classList.contains('carousel')).toBe(true);
    });

    it('должна отрисовать все слайды', () => {
      let slidesElements = sut.elem.querySelectorAll('.carousel__slide');

      expect(slidesElements.length).toBe(3);
    });
  });

  describe('переключение слайдов', () => {
    describe('переключение вперёд', () => {
      it('при клике по кнопке "вперёд", должна переключать на один слайд вперёд', () => {
        carouselArrowRight.dispatchEvent(clickEvent);

        expect(carouselInner.style.transform).toBe("translateX(-500px)");
      });
    });

    describe('переключение назад', () => {
      beforeEach(() => {
        carouselArrowRight.dispatchEvent(clickEvent);
        carouselArrowRight.dispatchEvent(clickEvent);
      });

      it('при клике по кнопке "назад", должна переключать на один слайд назад', () => {
        carouselArrowLeft.dispatchEvent(clickEvent);

        expect(carouselInner.style.transform).toBe('translateX(-500px)');
      });
    });

    describe('скрытие стрелок переключения', () => {
      it('в исходном состоянии скрывает стрелку переключения назад', () => {
        expect(carouselArrowLeft.style.display).toBe('none');
      });

      it('при достижении крайнего слайда, должна скрыть стрелку переключения вперёд', () => {
        carouselArrowRight.dispatchEvent(clickEvent);
        carouselArrowRight.dispatchEvent(clickEvent);

        expect(carouselArrowRight.style.display).toBe('none');
      });
    });
  });

  describe('генерация события добавления в корзину("product-add")', () => {
    let productAddEvent;

    beforeEach(() => {
      productAddEvent = null;

      document.body.addEventListener('product-add', (event) => {
        productAddEvent = event;
      }, { once: true });

      let addButton = sut.elem.querySelector('.carousel__button');

      addButton.dispatchEvent(clickEvent);
    });

    it('после клика по кнопке, должно быть создано событие', () => {
      expect(productAddEvent instanceof CustomEvent).toBe(true);
    });

    it('созданное событие должно содержать в себе уникальный идентификатор товара("id") c 1-ого слайда', () => {
      expect(productAddEvent.detail).toBe(testSlides[0].id);
    });
  });
});
