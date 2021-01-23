import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
    this.eventHandler();
    this.value = "";
  }

  render() {
    this.elem = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon" />
        </button>
        <nav class="ribbon__inner"></nav>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon" />
        </button>
      </div>
    `);

    this.inner = this.elem.querySelector(".ribbon__inner");

    for (let { name, id } of this.categories) {
      const categoryElem = createElement(
        `<a href="#" class="ribbon__item"></a>`
      );
      categoryElem.textContent = name;
      categoryElem.dataset.id = id;
      this.inner.append(categoryElem);
    }

    this.elem
      .querySelector(".ribbon__item")
      .classList.add("ribbon__item_active");
    this.right = this.elem.querySelector(".ribbon__arrow_right");
    this.left = this.elem.querySelector(".ribbon__arrow_left");
  }

  eventHandler() {
    this.left.onclick = (event) => this.arrowLeftClick(event);
    this.right.onclick = (event) => this.arrowRightClick(event);

    this.elem.onclick = (event) => {
      let itemElem = event.target.closest(".ribbon__item");
      if (itemElem) {
        this.itemClick(itemElem);
        event.preventDefault();
      }
    };

    this.inner.onscroll = () => this.renderArrows();
  }

  arrowRightClick() {
    this.trafficSlider(-350);
  }

  arrowLeftClick() {
    this.trafficSlider(350);
  }

  trafficSlider(offset) {
    this.inner.scrollBy(-offset, 0);
    this.renderArrows();
  }

  itemClick(itemElem) {
    const oldActive = this.elem.querySelector(".ribbon__item_active");
    if (oldActive) {
      oldActive.classList.remove("ribbon__item_active");
    }

    itemElem.classList.add("ribbon__item_active");

    this.elem.dispatchEvent(
      new CustomEvent("ribbon-select", {
        detail: itemElem.dataset.id,
        bubbles: true,
      })
    );
  }

  scrollRight() {
    return (
      this.inner.scrollWidth - (this.inner.scrollLeft + this.inner.clientWidth)
    );
  }

  scrollLeft() {
    return this.inner.scrollLeft;
  }

  renderArrows() {
    this.left.classList.remove("ribbon__arrow_visible");
    this.right.classList.remove("ribbon__arrow_visible");
    
    if (this.scrollLeft()) {
      this.left.classList.add("ribbon__arrow_visible");
    }

    if (this.scrollRight()) {
      this.right.classList.add("ribbon__arrow_visible");
    }
  }
}
