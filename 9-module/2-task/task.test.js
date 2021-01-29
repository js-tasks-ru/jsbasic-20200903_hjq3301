import Main from './index.js';
import createElement from '../../assets/lib/create-element.js';

describe('9-module-2-task', () => {
  let main;

  let realFetch;

  let products;
  let bodyInner;

  beforeEach(() => {
    bodyInner = createElement(`
    <div>
      <header class="header container">
      <!-- the font does not support cyrillic -->
        <h1 class="heading logo">Bangkok Express</h1>
        <h3 class="subheading">Great food・Free delivery・Fair price</h3>

        <div data-cart-icon-holder>
        </div>
      </header>

      <main>
        <div class="container" data-carousel-holder></div>

        <div class="container">
          <h2 class="section-heading">
            Our Menu
          </h2>
          <div data-ribbon-holder></div>
        </div>

        <div class="container">
          <div class="filters">
            <div class="filters__inner">
              <div class="filters__group">
                <label class="filters__label">Max spiciness</label>
                <div class="filters__slider" data-slider-holder></div>
              </div>
              <div class="filters__group">
                <div class="filters__checkbox">
                  <input
                    class="styled-checkbox"
                    id="nuts-checkbox"
                    type="checkbox"
                    value="1"
                  >
                  <label for="nuts-checkbox">
                    <span class="filters__label">No nuts</span>
                  </label>
                </div>
              </div>
              <div class="filters__group">
                <div class="filters__checkbox">
                  <input
                    class="styled-checkbox"
                    id="vegeterian-checkbox"
                    type="checkbox"
                    value="1"
                  >
                  <label for="vegeterian-checkbox">
                    <span class="filters__label">Vegeterian only</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container" data-products-grid-holder>
          <div class="products-grid is-loading">
            <div class="products-grid__skeleton">
              <div class="products-grid__skeleton-item"></div>
              <div class="products-grid__skeleton-item"></div>
              <div class="products-grid__skeleton-item"></div>
              <div class="products-grid__skeleton-item"></div>
              <div class="products-grid__skeleton-item"></div>
              <div class="products-grid__skeleton-item"></div>
            </div>
            <div class="products-grid__inner"></div>
          </div>
        </div>
      </main>
    </div>
    `);

    products = [
      {
        "name": "Laab kai chicken salad",
        "price": 10,
        "category": "salads",
        "image": "laab_kai_chicken_salad.png",
        "id": "laab-kai-chicken-salad",
        "nuts": true,
        "vegeterian": false,
        "spiciness": 2
      },
      {
        "name": "Som tam papaya salad",
        "price": 9.5,
        "category": "salads",
        "image": "som_tam_papaya_salad.png",
        "id": "som-tam-papaya-salad",
        "nuts": false,
        "vegeterian": true,
        "spiciness": 0
      },
      {
        "name": "Tom yam kai",
        "price": 7,
        "category": "soups",
        "image": "tom_yam.png",
        "id": "tom-yam-kai",
        "nuts": false,
        "vegeterian": false,
        "spiciness": 3
      },
      {
        "name": "Tom kha kai",
        "price": 7,
        "category": "soups",
        "image": "tom_kha.png",
        "id": "tom-kha-kai",
        "nuts": false,
        "vegeterian": false,
        "spiciness": 3
      },
    ];

    realFetch = fetch;
    fetch = jasmine.createSpy('fetch');

    let response = new Response();
    let responseJsonPromise = Promise.resolve(products);
    spyOn(response, 'json').and.returnValue(responseJsonPromise);

    let fetchPromise = Promise.resolve(response);

    fetch.and.returnValue(fetchPromise);

    document.body.append(bodyInner);

    main = new Main();
  });

  afterEach(() => {
    fetch = realFetch;

    bodyInner.remove();
  });

  describe('создание базовых компонент', () => {
    it('должна показывать Карусель', async function() {
      await main.render();

      let component = document.querySelector('[data-carousel-holder] .carousel');

      expect(component).not.toBeNull();
    });

    it('должна показывать Ленту-Меню', async function() {
      await main.render();

      let component = document.querySelector('[data-ribbon-holder] .ribbon');

      expect(component).not.toBeNull();
    });

    it('должна показывать Слайдер', async function() {
      await main.render();

      let component = document.querySelector('[data-slider-holder] .slider');

      expect(component).not.toBeNull();
    });

    it('должна показывать Иконку корзины', async function() {
      await main.render();

      let component = document.querySelector('[data-cart-icon-holder] .cart-icon');

      expect(component).not.toBeNull();
    });

    it('должна показывать Список товаров', async function() {
      await main.render();

      let component = document.querySelector('[data-products-grid-holder] .products-grid');

      expect(component).not.toBeNull();
    });
  });

  describe('взаимодействие компонент', () => {
    it('должна добавлять товар в корзину', async function() {
      await main.render();

      document.body.dispatchEvent(new CustomEvent('product-add', { detail: products[0].id }));

      let cartIconCount = document.querySelector('.cart-icon__count');

      expect(cartIconCount.textContent).toBe('1');
    });

    it('товары должны быть отфильтрованы по полю noNuts', async function() {
      await main.render();

      let nutsCheckbox = document.getElementById('nuts-checkbox');
      nutsCheckbox.checked = true;

      nutsCheckbox
        .dispatchEvent(new Event('change', { bubbles: true }));

      let filteredProductCardsNames = [...document.querySelectorAll('.card')]
        .map((productCard) => {
          let cardTitleElement = productCard.querySelector('.card__title');

          return cardTitleElement && cardTitleElement.textContent.trim();
        });

      let expectedProductNames = ["Som tam papaya salad", "Tom yam kai", "Tom kha kai"];

      expect(filteredProductCardsNames).toEqual(expectedProductNames);
    });

    it('товары должны быть отфильтрованы по полю vegeterianOnly', async function() {
      await main.render();

      let vegetarianCheckbox = document.getElementById('vegeterian-checkbox');
      vegetarianCheckbox.checked = true;

      vegetarianCheckbox
        .dispatchEvent(new Event('change', { bubbles: true }));

      let filteredProductCardsNames = [...document.querySelectorAll('.card')]
        .map((productCard) => {
          let cardTitleElement = productCard.querySelector('.card__title');

          return cardTitleElement && cardTitleElement.textContent.trim();
        });

      let expectedProductNames = ["Som tam papaya salad"];

      expect(filteredProductCardsNames).toEqual(expectedProductNames);
    });

    it('товары должны быть отфильтрованы по полю maxSpiciness', async function() {
      await main.render();

      let slider = document.querySelector('.slider');
      slider.dispatchEvent(new CustomEvent('slider-change', { detail: 2, bubbles: true }));

      let filteredProductCardsNames = [...document.querySelectorAll('.card')]
        .map((productCard) => {
          let cardTitleElement = productCard.querySelector('.card__title');

          return cardTitleElement && cardTitleElement.textContent.trim();
        });

      let expectedProductNames = [
        "Laab kai chicken salad",
        "Som tam papaya salad",
      ];

      expect(filteredProductCardsNames).toEqual(expectedProductNames);
    });

    it('товары должны быть отфильтрованы по полю category', async function() {
      await main.render();

      let ribbon = document.querySelector('.ribbon');
      ribbon.dispatchEvent(new CustomEvent('ribbon-select', { detail: 'soups', bubbles: true }));

      let filteredProductCardsNames = [...document.querySelectorAll('.card')]
        .map((productCard) => {
          let cardTitleElement = productCard.querySelector('.card__title');

          return cardTitleElement && cardTitleElement.textContent.trim();
        });

      let expectedProductNames = [
        "Tom yam kai",
        "Tom kha kai",
      ];

      expect(filteredProductCardsNames).toEqual(expectedProductNames);
    });
  });

});
