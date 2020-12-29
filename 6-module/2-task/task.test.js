import ProductCard from './index.js';

describe('6-module-2-task', () => {
  let sut;

  let product;
  let clickEvent;

  beforeEach(() => {
    product = {
      name: "Laab kai chicken salad",
      price: 10,
      category: "salads",
      image: "laab_kai_chicken_salad.png",
      id: "laab-kai-chicken-salad"
    };

    clickEvent = new MouseEvent('click', { bubbles: true });

    sut = new ProductCard(product);

    document.body.append(sut.elem);
  });

  afterEach(() => {
    sut.elem.remove();
  });

  describe('отрисовка', () => {
    it('карточка товара должна содержать картинку', () => {
      let imageElement = sut.elem.querySelector('.card__image');
      let actualImageSrc = imageElement.src.trim();
      let expectedImageSrc = `/assets/images/products/${product.image}`;

      let isCorrectSource = actualImageSrc.includes(expectedImageSrc);

      expect(isCorrectSource).toBe(true);
    });

    it('карточка товара должна содержать цену', () => {
      let priceElement = sut.elem.querySelector('.card__price');
      let actualPrice = priceElement.innerHTML.trim();
      let expectedPrice = '€10.00';

      expect(actualPrice).toBe(expectedPrice);
    });

    it('карточка товара должна содержать название товара', () => {
      let nameElement = sut.elem.querySelector('.card__title');
      let actualName = nameElement.innerHTML.trim();
      let expectedName = product.name;

      expect(actualName).toBe(expectedName);
    });
  });

  describe('генерация события добавления в корзину("product-add")', () => {
    let productAddEventName;
    let productAddEvent;

    beforeEach(() => {
      productAddEventName = 'product-add';

      document.body.addEventListener(productAddEventName, (event) => {
        productAddEvent = event;
      }, { once: true });

      let addButton = sut.elem.querySelector('.card__button');

      addButton.dispatchEvent(clickEvent);
    });

    it('после клика по кнопке, должно быть создано событие', () => {
      expect(productAddEvent instanceof CustomEvent).toBe(true);
    });

    it('созданное событие должно содержать в себе уникальный идентификатор товара ("id")', () => {
      expect(productAddEvent.detail).toBe(product.id);
    });
  });
});
