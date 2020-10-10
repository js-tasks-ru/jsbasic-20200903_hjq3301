describe('5-module-3-task', () => {
  let carouselWrapper;
  let carouselInner;
  let carouselArrowRight;
  let carouselArrowLeft;

  let clickEvent;

  beforeEach(() => {
    carouselWrapper = document.createElement('div');
    carouselWrapper.setAttribute('data-carousel-holder', '');
    carouselWrapper.classList.add('container');
    carouselWrapper.innerHTML = `
      <div class="carousel">
          <div class="carousel__arrow carousel__arrow_right">
              <img src="/assets/images/icons/angle-icon.svg" alt="icon">
          </div>
          <div class="carousel__arrow carousel__arrow_left">
              <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
          </div>

          <div class="carousel__inner">
              <div class="carousel__slide" data-id="penang-shrimp">
                  <img src="/assets/images/carousel/penang_shrimp.png" class="carousel__img" alt="slide">
                  <div class="carousel__caption">
                      <span class="carousel__price">€16.00</span>
                      <div class="carousel__title">Penang shrimp</div>
                      <button type="button" class="carousel__button">
                          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                      </button>
                  </div>
              </div>

              <div class="carousel__slide" data-id="chicken-cashew">
                  <img src="/assets/images/carousel/chicken_cashew.png" class="carousel__img" alt="slide">
                  <div class="carousel__caption">
                      <span class="carousel__price">€14.00</span>
                      <div class="carousel__title">Chicken cashew</div>
                      <button type="button" class="carousel__button">
                          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                      </button>
                  </div>
              </div>

              <div class="carousel__slide" data-id="red-curry-veggies">
                  <img src="/assets/images/carousel/red_curry_vega.png" class="carousel__img" alt="slide">
                  <div class="carousel__caption">
                      <span class="carousel__price">€12.50</span>
                      <div class="carousel__title">Red curry veggies</div>
                      <button type="button" class="carousel__button">
                          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                      </button>
                  </div>
              </div>

              <div class="carousel__slide" data-id="chicken-springrolls">
                  <img src="/assets/images/carousel/chicken_loempias.png" class="carousel__img" alt="slide">
                  <div class="carousel__caption">
                      <span class="carousel__price">€6.50</span>
                      <div class="carousel__title">Chicken springrolls</div>
                      <button type="button" class="carousel__button">
                          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                      </button>
                  </div>
                </div>
            </div>
        </div>
    `;

    document.body.append(carouselWrapper);

    carouselInner = carouselWrapper.querySelector('.carousel__inner');
    carouselInner.style.width = '500px';

    carouselArrowRight = carouselWrapper.querySelector('.carousel__arrow_right');
    carouselArrowLeft = carouselWrapper.querySelector('.carousel__arrow_left');

    clickEvent = new MouseEvent('click', { bubbles: true });

    initCarousel();
  });

  afterEach(() => {
    carouselWrapper.remove(carouselWrapper);
  });


  describe('переключение вперёд', () => {
    it('при клике по кнопке "вперёд", должна переключать на один слайд вперёд', () => {
      carouselArrowRight.dispatchEvent(clickEvent);

      expect(carouselInner.style.transform).toBe("translateX(-500px)");
    });
  });

  describe('переключение назад', () => {
    beforeEach(() => {
      carouselArrowRight.dispatchEvent(clickEvent);
      carouselArrowRight.dispatchEvent(clickEvent);
      carouselArrowRight.dispatchEvent(clickEvent);
    });

    it('при клике по кнопке "назад", должна переключать на один слайд назад', () => {
      carouselArrowLeft.dispatchEvent(clickEvent);

      expect(carouselInner.style.transform).toBe('translateX(-1000px)');
    });
  });

  describe('скрытие стрелок переключения', () => {
    it('должна по умолчанию скрыть стрелку переключения назад', () => {
      expect(carouselArrowLeft.style.display).toBe('none');
    });

    it('при достижении четвёртого слайда, должна скрыть стрелку переключения вперёд', () => {
      carouselArrowRight.dispatchEvent(clickEvent);
      carouselArrowRight.dispatchEvent(clickEvent);
      carouselArrowRight.dispatchEvent(clickEvent);

      expect(carouselArrowRight.style.display).toBe('none');
    });
  });

});
