import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.render();
  }

  render () {
    this.elem = document.createElement('div');
    this.elem.classList.add('carousel');
    this.controls = `<div class="carousel__arrow carousel__arrow_right">
      <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="../../assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>`;
    
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('carousel__inner');

    for (let slide of this.slides) {
      const addToCart = function (event) {
        const addByClick = new CustomEvent("product-add", {
          detail: slide.id, 
          bubbles: true
        });
        event.currentTarget.dispatchEvent(addByClick);
      };

      const slideContainer = document.createElement('div');
      slideContainer.classList.add('carousel__slide');
      slideContainer.setAttribute('data-id', slide.id);

      const slideTemplate = `<img src="../../assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${slide.price.toFixed(2)}</span>
        <div class="carousel__title">${slide.name}</div>
        <button type="button" class="carousel__button ${slide.id}">
          <img src="../../assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>`;
      slideContainer.insertAdjacentHTML('beforeend', slideTemplate);
      slideContainer.querySelector('.carousel__button').addEventListener('click', addToCart);
      this.wrapper.append(slideContainer);
    }

    this.elem.insertAdjacentHTML('beforeend', this.controls);
    this.elem.append(this.wrapper);

    this.initCarousel();
  }

  initCarousel() {
    const carousel = this.elem;
    const wrapper = carousel.querySelector('.carousel__inner');
    const slideEls = [].slice.call(carousel.querySelectorAll('.carousel__slide'));
    const arrows = carousel.querySelectorAll('.carousel__arrow');
    const arrowPrev = carousel.querySelector('.carousel__arrow_left');
    const arrowNext = carousel.querySelector('.carousel__arrow_right');
    let step;
    let shift = 0;
    let currentSlide = 0;
    let reachedEnd = false;
    let reachedStart = true;

    arrowPrev.style.display = 'none';

    for (let i = 0; i < arrows.length; i++) {
      arrows[i].addEventListener('click', function(e) {
        if (e.currentTarget === arrowNext && reachedEnd === false) {
          currentSlide++;
        } else if (e.currentTarget === arrowPrev && reachedStart === false) {
          currentSlide--;
        }

        step = slideEls[0].offsetWidth;

        shift = -currentSlide * step;

        if (shift === 0) {
          reachedStart = true;
          arrowPrev.style.display = 'none';
        } else {
          reachedStart = false;
          arrowPrev.style.display = '';
        }

        if (shift === 0 - (slideEls.length - 1) * step && shift !== 0) {
          reachedEnd = true;
          arrowNext.style.display = 'none';
        } else {
          reachedEnd = false;
          arrowNext.style.display = '';
        }
        wrapper.style.transform = `translateX(${shift}px)`;
      });
    }
    window.addEventListener('resize', function () {
      step = carousel.offsetWidth;
      shift = -currentSlide * step;
      wrapper.style.transform = `translateX(${shift}px)`;
    });
  }
}