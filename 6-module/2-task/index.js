import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.elem = this.render();
  }

  render() {
    this.card = document.createElement('div');
    this.card.classList.add('card');
    this.card.setAttribute('id', `${this.product.id}`);

    this.card.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="card__top">
      <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
      <span class="card__price">€${this.product.price.toFixed(2)}</span>
  </div>
  <div class="card__body">
      <div class="card__title">${this.product.name}</div>
      <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
  </div>
      `
    );

    this.event = new CustomEvent("product-add", { 
      detail: this.product.id,
      bubbles: true,  
    });

    this.card.addEventListener("click", (event) => {
      if (event.target.closest("button")) {
        this.card.dispatchEvent(this.event);
      }
    });

    return this.card;
  }
}

