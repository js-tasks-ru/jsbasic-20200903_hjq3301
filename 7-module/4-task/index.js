export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.parts = this.steps - 1;
    this.elem = this.render();
    this.thumb = this.elem.querySelector(".slider__thumb");
    this.progress = this.elem.querySelector(".slider__progress");
    this.sliderValue = this.elem.querySelector(".slider__value");
    this.thumb.ondragstart = () => false;
    this.thumb.onpointerdown = this.onPointerDown;
    this.changeValue();
  }

  render() {
    this.container = document.querySelector(".container");
    this.container.insertAdjacentHTML(
      "beforeend",
      `
      <div class="slider">
      <div class="slider__thumb">
        <span class="slider__value"></span>
      </div>
      <div class="slider__progress"></div>
      <div class="slider__steps">${"<span></span>".repeat(this.steps)}
      </div>
    </div>
  `
    );
    this.sliderStep = document.querySelector(".slider__steps");
    this.sliderStep.firstChild.classList.add("slider__step-active");
    return document.querySelector(".slider");
  }

  changeValue() {
    const procentStep = 100 / this.parts;

    this.elem.addEventListener("click", (event) => {
      const boundingClient = this.elem.getBoundingClientRect().left;

      let leftPercents =
        ((event.clientX - boundingClient) / this.elem.offsetWidth) * this.parts;
      leftPercents = (+leftPercents.toFixed(0) / this.parts) * 100;

      this.value = leftPercents / procentStep;

      this.sliderValue.innerHTML = this.value;

      if (this.elem.querySelector(".slider__step-active")) {
        this.elem
          .querySelector(".slider__step-active")
          .classList.remove("slider__step-active");
      }

      this.sliderStep.children[this.value].classList.add("slider__step-active");

      this.thumb.style.left = `${leftPercents}%`;
      this.progress.style.width = `${leftPercents}%`;

      let customEvent = new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true,
      });
      this.elem.dispatchEvent(customEvent);
    });
  }

  onPointerDown = (event) => {
    event.preventDefault();

    this.elem.classList.add("slider_dragging");

    document.addEventListener("pointermove", this.onPointerMove);
    document.addEventListener("pointerup", this.onPointerUp);
  };

  onPointerMove = (event) => {
    event.preventDefault();
    let newLeft = this.calcLeft(event);

    this.thumb.style.left = `${newLeft * 100}%`;
    this.progress.style.width = `${newLeft * 100}%`;
    this.value = Math.round(this.parts * newLeft);
    this.sliderValue.innerHTML = this.value;
    if (this.elem.querySelector(".slider__step-active")) {
      this.elem
        .querySelector(".slider__step-active")
        .classList.remove("slider__step-active");
    }
    this.sliderStep.children[this.value].classList.add("slider__step-active");
  };

  calcLeft(event) {
    let newLeft =
      (event.clientX - this.elem.getBoundingClientRect().left) /
      this.elem.offsetWidth;

    if (newLeft < 0) {
      newLeft = 0;
    }
    if (newLeft > 1) {
      newLeft = 1;
    }

    return newLeft;
  }

  onPointerUp = () => {
    document.removeEventListener("pointermove", this.onPointerMove);
    document.removeEventListener("pointerup", this.onPointerUp);

    this.elem.classList.remove("slider_dragging");

    this.thumb.style.left = `${(this.value / this.parts) * 100}%`;
    this.progress.style.width = `${(this.value / this.parts) * 100}%`;

    this.elem.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true,
      })
    );
  };
}
