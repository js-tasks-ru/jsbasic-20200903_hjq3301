import CartIcon from './index.js';
import createElement from '../../assets/lib/create-element.js';

describe('8-module-1-task', () => {
  let cartIcon;

  let cart;

  let styleElement;
  let mainElements;

  beforeEach(() => {
    styleElement = createElement(`
      <style>
        .container {
          max-width: 988px;
          margin: 0 auto;
        }

        .cart-icon {
          display: none;
          position: absolute;
          right: 0;
          top: 50px;
          width: 57px;
          height: 63px;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.5s ease;
        }

        .cart-icon.shake {
          animation: cartshake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
          backface-visibility: hidden;
          transform-origin: top right;
        }

        .cart-icon__inner {
          background: url("/assets/images/icons/cart-icon.svg") center no-repeat;
          background-size: cover;
          position: relative;
          width: 100%;
          height: 100%;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-right: 3px;
        }

        .cart-icon_visible {
          display: block;
        }

        .cart-icon__count {
          font-size: 26px;
          line-height: 1.1;
          font-weight: 900;
          color: var(--color-pink);
          margin-top: 16px;
        }

        .cart-icon__price {
          font-size: 11px;
          line-height: 1.1;
          font-weight: 500;
          color: var(--color-black);
          margin: 0;
        }

        @media all and (max-width: 767px) {
          .cart-icon {
            position: fixed;
            top: 15px;
            right: 10px;
            transform: none;
            z-index: 95;
          }

          .cart-icon:before {
            content: "";
            position: absolute;
            top: -15px;
            right: -10px;
            border: 55px solid transparent;
            border-right-color: var(--color-pink);
            border-top-color: var(--color-pink);
            z-index: 1;
          }

          .cart-icon__inner {
            position: relative;
            z-index: 2;
          }
        }

      </style>
    `);

    mainElements = createElement(`
    <div style="height: 5000px;">
      <header class="header container">
        <h1 class="heading logo">Бангкок Экспресс</h1>
        <h3 class="subheading">Отличная еда・Бесплатная доставка・Лучшие цены</h3>

        <div data-cart-icon-holder>
          <!--СЮДА ВСТАВЛЯЕТСЯ CART-ICON-->
        </div>
      </header>
    </div>
    `);

    document.body.append(styleElement);
    document.body.append(mainElements);

    cart = jasmine.createSpyObj('cart', [
      'isEmpty',
      'getTotalCount',
      'getTotalPrice',
    ]);

    cartIcon = new CartIcon();

    document.body.querySelector('[data-cart-icon-holder]').append(cartIcon.elem);
  });

  afterEach(() => {
    mainElements.remove();
    styleElement.remove();
  });

  describe('если корзина не пустая', () => {
    let cartIconElement;

    beforeEach(() => {
      cart.isEmpty.and.returnValue(false);
      cart.getTotalCount.and.returnValue(10);
      cart.getTotalPrice.and.returnValue(100);
      cartIconElement = document.body.querySelector('.cart-icon');
    });

    it('иконка корзины должна быть видимой на странице', () => {
      cartIcon.update(cart);

      let isCartIconVisible = cartIcon.elem.classList.contains('cart-icon_visible');

      expect(isCartIconVisible).toBe(true);
    });

    describe('если пользователь прокрутил до конца страницы ', () => {

      describe('ecли вокруг основного контейнера есть место для иконки', () => {
        beforeEach(() => {
          viewport.set(1920, 1080);

          cartIcon.update(cart);

          window.scrollTo(0, document.documentElement.scrollHeight);
        });

        it('иконка должна быть спозиционирована фиксированно', (done) => {
          setTimeout(() => {
            expect(getComputedStyle(cartIcon.elem).position).toBe('fixed');

            done();
          }, 100);
        });

        it('иконка должна смещаться на 20px правее от первого элемент в документе с классом `container`', (done) => {
          setTimeout(() => {
            let actualLeftIndent = Math.round(cartIcon.elem.getBoundingClientRect().left);
            let expectedLeftIndent = Math.round(document.querySelector('.container').getBoundingClientRect().right) + 20;

            expect(`${actualLeftIndent}px`).toBe(`${expectedLeftIndent}px`);

            done();
          }, 100);
        });
      });

      describe('ecли вокруг основного контейнера нет места для иконки', () => {
        beforeEach(() => {
          viewport.set(990, 1080);

          cartIcon.update(cart);

          window.scrollTo(0, document.documentElement.scrollHeight);
        });

        it('иконка должна быть спозиционирована фиксированно', (done) => {
          setTimeout(() => {
            expect(getComputedStyle(cartIcon.elem).position).toBe('fixed');

            done();
          }, 100);
        });

        it('иконка должна смещаться на 10px левее главного контейнера', (done) => {
          setTimeout(() => {

            let actualLeftIndent = Math.round(cartIcon.elem.getBoundingClientRect().left);
            let expectedLeftIndent = document.documentElement.clientWidth - cartIcon.elem.offsetWidth - 10;

            expect(`${actualLeftIndent}px`).toBe(`${expectedLeftIndent}px`);

            done();
          }, 100);
        });
      });

    });
  });

  describe('если корзина пустая', () => {
    let cartIconElement;

    beforeEach(() => {
      cart.isEmpty.and.returnValue(true);
      cart.getTotalCount.and.returnValue(0);
      cart.getTotalPrice.and.returnValue(0);
      cartIconElement = document.body.querySelector('.cart-icon');

      cartIcon.update(cart);
    });

    it('иконка корзины должна быть скрыта', () => {
      cartIcon.update(cart);

      let isCartIconVisible = cartIconElement.classList.contains('cart-icon_visible');

      expect(isCartIconVisible).toBe(false);
    });

  });

});
