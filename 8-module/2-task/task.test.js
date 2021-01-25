import ProductsGrid from './index.js';
import products from './products.js';

describe('8-module-2-task', () => {
  let productsGrid;

  beforeEach(() => {
    productsGrid = new ProductsGrid(products);

    document.body.append(productsGrid.elem);
  });

  afterEach(() => {
    productsGrid.elem.remove();
  });

  describe('отрисовка', () => {
    it('после создания должны быть показаны карточки для всех товаров', () => {
      let productCardsElements = productsGrid.elem.querySelectorAll('.card');

      expect(productCardsElements.length).toBe(products.length);
    });
  });

  describe('метод updateFilter(filters)', () => {
    it('товары должны быть отфильтрованы по полю noNuts', () => {
      productsGrid.updateFilter({ noNuts: true });

      let filteredProductCardsNames = [...productsGrid.elem.querySelectorAll('.card')]
        .map((productCard) => {
          let cardTitleElement = productCard.querySelector('.card__title');

          return cardTitleElement && cardTitleElement.textContent.trim();
        });

      let expectedProductNames = [
        "Laab kai chicken salad", "Som tam papaya salad", "Tom yam kai",
        "Tom kha kai", "Tom kha koong", "Tom yam koong", "Tom yam vegetarian",
        "Tom kha vegetarian", "Sweet 'n sour chicken", "Chicken cashew",
        "Kai see ew", "Beef massaman", "Seafood chu chee", "Penang shrimp",
        "Green curry veggies", "Tofu cashew", "Red curry veggies", "Krapau tofu",
        "Prawn crackers", "Fish cakes", "Chicken satay", "Satay sauce",
        "Shrimp springrolls", "Mini vegetarian spring rolls",
        "Chicken springrolls", "Thai fried rice", "Prik nam pla",
        "Fresh prawn crackers", "Stir fried vegetables", "White rice"];

      expect(filteredProductCardsNames).toEqual(expectedProductNames);
    });

    it('товары должны быть отфильтрованы по полю vegeterianOnly', () => {
      productsGrid.updateFilter({ vegeterianOnly: true });

      let filteredProductCardsNames = [...productsGrid.elem.querySelectorAll('.card')]
        .map((productCard) => {
          let cardTitleElement = productCard.querySelector('.card__title');

          return cardTitleElement && cardTitleElement.textContent.trim();
        });

      let expectedProductNames = ["Green curry veggies", "Tofu cashew"];

      expect(filteredProductCardsNames).toEqual(expectedProductNames);
    });

    it('товары должны быть отфильтрованы по полю maxSpiciness', () => {
      productsGrid.updateFilter({ maxSpiciness: 1 });

      let filteredProductCardsNames = [...productsGrid.elem.querySelectorAll('.card')]
        .map((productCard) => {
          let cardTitleElement = productCard.querySelector('.card__title');

          return cardTitleElement && cardTitleElement.textContent.trim();
        });

      let expectedProductNames = [
        "Som tam papaya salad", "Tom yam vegetarian",
        "Tom kha vegetarian", "Chicken cashew", "Green curry veggies",
        "Tofu cashew", "Krapau tofu", "Prawn crackers",
        "Fish cakes", "Chicken satay", "Fresh prawn crackers",
        "Stir fried vegetables", "White rice"
      ];

      expect(filteredProductCardsNames).toEqual(expectedProductNames);
    });

    it('товары должны быть отфильтрованы по полю category', () => {
      productsGrid.updateFilter({ category: 'seafood-dishes' });

      let filteredProductCardsNames = [...productsGrid.elem.querySelectorAll('.card')]
        .map((productCard) => {
          let cardTitleElement = productCard.querySelector('.card__title');

          return cardTitleElement && cardTitleElement.textContent.trim();
        });

      let expectedProductNames = ["Seafood chu chee", "Penang shrimp"];

      expect(filteredProductCardsNames).toEqual(expectedProductNames);
    });

    it('должен объединять объекты filters между разными вызовами', () => {
      productsGrid.updateFilter({ maxSpiciness: 2 });
      productsGrid.updateFilter({ category: 'seafood-dishes' });

      let filteredProductCardsNames = [...productsGrid.elem.querySelectorAll('.card')]
        .map((productCard) => {
          let cardTitleElement = productCard.querySelector('.card__title');

          return cardTitleElement && cardTitleElement.textContent.trim();
        });

      let expectedProductNames = ["Seafood chu chee"];

      expect(filteredProductCardsNames).toEqual(expectedProductNames);
    });
  });
});
