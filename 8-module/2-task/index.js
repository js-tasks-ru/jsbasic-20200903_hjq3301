import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
  }

  render() {
    this.elem = createElement(`<div class="products-grid">
      <div class="products-grid__inner"></div>
    </div>`);
    this.filter();
  }

  filter() {
    const gridInner = this.elem.querySelector(".products-grid__inner")
    gridInner.innerHTML = '';
    
    for (const iterator of this.products) {
      if (this.filters.noNuts && iterator.nuts) {continue;}

      if (this.filters.vegeterianOnly && !iterator.vegeterian) {continue;}

      if (this.filters.maxSpiciness !== undefined && iterator.spiciness > this.filters.maxSpiciness) {
        continue;
      }

      if (this.filters.category && iterator.category != this.filters.category) {
        continue;
      }

      let card = new ProductCard(iterator);
      gridInner.append(card.elem);
    }
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);
    this.filter();
  }
}
