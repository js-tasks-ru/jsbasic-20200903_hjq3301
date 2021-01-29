import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    this.dataCarouselHolder = document.querySelector('[data-carousel-holder]');
    this.dataSliderHolder = document.querySelector('[data-slider-holder]');
    this.dataRibbonHolder = document.querySelector('[data-ribbon-holder]');
    this.dataCartIconHolder = document.querySelector('[data-cart-icon-holder]');
    this.dataProductsGridHolder = document.querySelector('[data-products-grid-holder]');

    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3
    });
    this.cartIcon = new CartIcon();
    this.card = new Cart(this.cartIcon);
  }

  async render() {
    this.dataCarouselHolder.append(this.carousel.elem);
    this.dataRibbonHolder.append(this.ribbonMenu.elem);
    this.dataSliderHolder.append(this.stepSlider.elem);
    this.dataCartIconHolder.append(this.cartIcon.elem);
    
    let promise = await fetch("products.json");
    let products = await promise.json();

    if (promise.ok) {
      this.productsGrid = new ProductsGrid(products);
      this.dataProductsGridHolder.innerHTML = '';
      this.dataProductsGridHolder.append(this.productsGrid.elem);
    }

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    document.body.addEventListener('product-add', ({ detail: productId }) => {
      let product = products.find(product => product.id == productId);
      this.card.addProduct(product);
    });

    this.stepSlider.elem.addEventListener('slider-change', ({ detail: value }) => {
      this.productsGrid.updateFilter({
        maxSpiciness: value
      });
    });

    this.ribbonMenu.elem.addEventListener('ribbon-select', ({ detail: categoryId }) => {
      this.productsGrid.updateFilter({
        category: categoryId
      });
    });

    document.getElementById('nuts-checkbox').onchange = event => {
      this.productsGrid.updateFilter({
        noNuts: event.target.checked
      });
    };

    document.getElementById('vegeterian-checkbox').onchange = event => {
      this.productsGrid.updateFilter({
        vegeterianOnly: event.target.checked
      });
    };
  }
}
