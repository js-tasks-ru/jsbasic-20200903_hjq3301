import Cart from './index.js';

describe('8-module-4-task', () => {
  let cart;

  let cartIcon;

  let products;

  beforeEach(() => {
    let cartIconElem = document.createElement('div');

    products = [
      {
        "name": "Laab kai chicken salad",
        "price": 10,
        "category": "salads",
        "image": "laab_kai_chicken_salad.png",
        "id": "laab-kai-chicken-salad",
        "spiciness": 2
      },
      {
        "name": "Som tam papaya salad",
        "price": 9.5,
        "category": "salads",
        "image": "som_tam_papaya_salad.png",
        "id": "som-tam-papaya-salad",
        "spiciness": 0
      }
    ]

    cartIcon = jasmine.createSpyObj('cartIcon', ['update']);
    cartIcon.elem = cartIconElem;

    cart = new Cart(cartIcon);
  });

  afterEach(() => {
    let modal = document.querySelector('.modal');
    document.body.classList.remove('is-modal-open');

    if (modal) {
      modal.remove();
    }
  });

  it('корзина должна быть пустой после создания', () => {
    expect(cart.isEmpty()).toBe(true);
  });

  it('корзина должна быть не пустой после добавления товара', () => {
    cart.addProduct(products[0]);

    expect(cart.isEmpty()).toBe(false);
  });

  it('добавление товара должно обновить иконку корзины', () => {
    cart.addProduct(products[0]);

    expect(cartIcon.update).toHaveBeenCalledWith(cart);
  });

  describe('если добавлен один и тот же товар', () => {
    it('должно измениться общее количество товаров', () => {
      cart.addProduct(products[0]);
      cart.addProduct(products[0]);

      expect(cart.getTotalCount()).toBe(2);
    });

    it('должна измениться общая стоимость', () => {
      cart.addProduct(products[0]);
      cart.addProduct(products[0]);

      expect(cart.getTotalPrice()).toBe(20);
    });
  });

  describe('если добавлены разные товары', () => {
    it('должно измениться общее количество товаров', () => {
      cart.addProduct(products[0]);
      cart.addProduct(products[1]);

      expect(cart.getTotalCount()).toBe(2);
    });

    it('должна измениться общая стоимость', () => {
      cart.addProduct(products[0]);
      cart.addProduct(products[1]);

      expect(cart.getTotalPrice()).toBe(19.5);
    });
  });

  describe('отображение корзины', () => {
    let clickEvent;

    beforeEach(() => {
      clickEvent = new MouseEvent('click', { bubbles: true });
    });

    describe('открытие модального окна с корзиной', () => {
      beforeEach(() => {
        cart.addProduct(products[0]);
        cartIcon.elem.dispatchEvent(clickEvent);
      });

      it('должна открывать модальное окно', () => {
        let modal = document.querySelector('.modal');

        expect(modal).toBeTruthy();
      });

      it('должна задавать заголовок модальному окну', () => {
        let modalTitle = document.querySelector('.modal__title');

        expect(modalTitle.textContent).toBe('Your order');
      });

      it('должна отображать карточку товара', () => {
        let product = document.querySelector('.cart-product');

        expect(product).toBeTruthy();
      });

      it('должна отображать форму заказа', () => {
        let orderForm = document.querySelector('.cart-form');

        expect(orderForm).toBeTruthy();
      });
    });

    describe('отправка формы заказа', () => {
      let realFetch;
      let cartForm;

      let submitPreventDefaultSpy;

      let fetchPromise;

      let response;
      let resultFromServer;
      let responseJsonPromise;

      beforeEach(() => {
        cart.addProduct(products[0]);
        cartIcon.elem.dispatchEvent(clickEvent);

        resultFromServer = { orderCreated: true };
        response = new Response();
        responseJsonPromise = Promise.resolve(resultFromServer);
        spyOn(response, 'json').and.returnValue(responseJsonPromise);

        realFetch = fetch;
        fetchPromise = Promise.resolve(response);

        fetch = jasmine.createSpy('fetch');
        fetch.and.returnValue(fetchPromise);

        let submitEvent = new Event('submit');
        cartForm = document.querySelector('.cart-form');

        submitPreventDefaultSpy = spyOn(submitEvent, 'preventDefault');

        cartForm.dispatchEvent(submitEvent);
      });

      afterEach(() => {
        fetch = realFetch;
      });

      it('должна предотвращать перезагрузку страницы', () => {
        expect(submitPreventDefaultSpy).toHaveBeenCalled();
      });

      it('должна отправлять заказ', () => {
        let expectedUrl = 'https://httpbin.org/post';
        let expectedBody = new FormData(cartForm);

        expect(fetch).toHaveBeenCalledWith(expectedUrl,
          { method: 'POST', body: expectedBody });
      });

      describe('если отправка успешная', () => {
        it('должна менять заголовок модальному окну', async function(done) {
          await Promise.all([fetchPromise, responseJsonPromise]);

          let modalTitle = document.querySelector('.modal__title');

          expect(modalTitle.textContent).toBe('Success!');

          done();
        });

        it('должна отображать текст о размещении заказа', async function(done) {
          await Promise.all([fetchPromise, responseJsonPromise]);

          let modalInnerP = document.querySelector('.modal__inner p');
          let isOrderSuccessfull = modalInnerP.textContent
          .indexOf('Order successful!') !== -1;

          expect(isOrderSuccessfull).toBe(true);

          done();
        });

        it('должна удалять все товары из корзины', async function(done) {
          await Promise.all([fetchPromise, responseJsonPromise]);

          expect(cart.getTotalCount()).toBe(0);

          done();
        });
      });
    });

    describe('изменение количества товаров в корзине', () => {
      let productId;

      describe('увеличение на единицу', () => {
        beforeEach(() => {
          cart.addProduct(products[0]);
          cartIcon.elem.dispatchEvent(clickEvent);

          productId = products[0].id;
          let plusButton = document.querySelector(`[data-product-id="${productId}"] .cart-counter__button_plus`);
          plusButton.dispatchEvent(clickEvent);
        });

        it('должна отображать увеличение товара на единицу', () => {
          let count = document.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);

          expect(count.textContent).toBe('2');
        });

        it('должна отображать увеличение стоимости товара', () => {
          let price = document.querySelector(`[data-product-id="${productId}"] .cart-product__price`);

          expect(price.textContent).toBe('€20.00');
        });

        it('должна отображать увеличение общей стоимости товара', () => {
          let totalPrice = document.querySelector(`.cart-buttons__info-price`);

          expect(totalPrice.textContent).toBe('€20.00');
        });
      });

      describe('уменьшение на единицу', () => {
        let minusButton;

        beforeEach(() => {
          cart.addProduct(products[0]);
          cart.addProduct(products[0]);
          cart.addProduct(products[0]);
          cart.addProduct(products[0]);

          cart.addProduct(products[1]);

          cartIcon.elem.dispatchEvent(clickEvent);

          productId = products[0].id;
          minusButton = document.querySelector(`[data-product-id="${productId}"] .cart-counter__button_minus`);

          minusButton.dispatchEvent(clickEvent);
        });

        it('должна отображать уменьшение товара на единицу', () => {
          let count = document.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);

          expect(count.textContent).toBe('3');
        });

        it('должна отображать уменьшение стоимости товара', () => {
          let price = document.querySelector(`[data-product-id="${productId}"] .cart-product__price`);

          expect(price.textContent).toBe('€30.00');
        });

        it('должна отображать уменьшение общей стоимости товара', () => {
          let totalPrice = document.querySelector(`.cart-buttons__info-price`);

          expect(totalPrice.textContent).toBe('€39.50');
        });

        it('должна закрывать модальное окно если товаров в корзине не осталось', () => {
          minusButton.dispatchEvent(clickEvent);
          minusButton.dispatchEvent(clickEvent);
          minusButton.dispatchEvent(clickEvent);

          let minusButton2 = document
            .querySelector(`[data-product-id="${products[1].id}"] .cart-counter__button_minus`);

          minusButton2.dispatchEvent(clickEvent);

          let modal = document.querySelector('.modal');

          expect(modal).toBe(null);
        });

        it('должна удалять товар из корзины если его количество равно 0', () => {
          minusButton.dispatchEvent(clickEvent);
          minusButton.dispatchEvent(clickEvent);
          minusButton.dispatchEvent(clickEvent);

          let product = document.querySelector('[data-product-id="${productId}"]');

          expect(product).toBe(null);
        });
      });
    });
  });

});
