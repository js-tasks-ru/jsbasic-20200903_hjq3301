export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.parts = this.steps - 1;
    this.elem = this.render();
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
    const thumb = this.elem.querySelector(".slider__thumb");
    const progress = this.elem.querySelector(".slider__progress");
    const sliderValue = this.elem.querySelector(".slider__value");
    const procentStep = 100 / this.parts;

    this.elem.addEventListener("click", (event) => {
      const boundingClient = this.elem.getBoundingClientRect().left;

      let leftPercents =
        ((event.clientX - boundingClient) / this.elem.offsetWidth) * this.parts;
      leftPercents = (+leftPercents.toFixed(0) / this.parts) * 100;

      this.value = leftPercents / procentStep;

      sliderValue.innerHTML = this.value;

      if (this.elem.querySelector(".slider__step-active")) {
        this.elem
          .querySelector(".slider__step-active")
          .classList.remove("slider__step-active");
      }

      this.sliderStep.children[this.value].classList.add("slider__step-active");

      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;

      let customEvent = new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true,
      });
      this.elem.dispatchEvent(customEvent);
    });
  }
}
