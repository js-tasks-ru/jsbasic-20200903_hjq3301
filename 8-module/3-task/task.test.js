import Cart from './index.js';

describe('8-module-3-task', () => {
  let cart;

  let cartIcon;

  let products;

  beforeEach(() => {
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

    cart = new Cart(cartIcon);
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
    beforeEach(() => {
      cart.addProduct(products[0]);
      cart.addProduct(products[0]);
    });

    it('должно измениться общее количество товаров', () => {
      expect(cart.getTotalCount()).toBe(2);
    });

    it('должна измениться общая стоимость', () => {
      expect(cart.getTotalPrice()).toBe(20);
    });

    describe('при увеличиние единиц товара', () => {
      beforeEach(() => {
        cart.updateProductCount(products[0].id, 1);
      });

      it('должно увеличиваться количество единиц этого товара', () => {
        expect(cart.getTotalCount()).toBe(3);
      });

      it('должна измениться общая стоимость', () => {
        expect(cart.getTotalPrice()).toBe(30);
      });
    });

    describe('при уменьшении единиц товара', () => {
      beforeEach(() => {
        cart.updateProductCount(products[0].id, -1);
      });

      it('должно уменьшаться количество единиц этого товара', () => {
        expect(cart.getTotalCount()).toBe(1);
      });

      it('должна измениться общая стоимость', () => {
        expect(cart.getTotalPrice()).toBe(10);
      });

      it('корзина должна стать пустой', () => {
        cart.updateProductCount(products[0].id, -1);

        expect(cart.isEmpty()).toBe(true);
      });
    })
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

});
