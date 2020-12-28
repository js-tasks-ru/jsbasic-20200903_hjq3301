function initCarousel() {
  const carousel = document.querySelector('.carousel');
  const wrapper = carousel.querySelector('.carousel__inner');
  const slides = [].slice.call(carousel.querySelectorAll('.carousel__slide'));
  const arrows = carousel.querySelectorAll('.carousel__arrow');
  const arrowPrev = carousel.querySelector('.carousel__arrow_left');
  const arrowNext = carousel.querySelector('.carousel__arrow_right');
  let step = slides[0].offsetWidth;
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

      shift = -currentSlide * step;

      if (shift === 0) {
        reachedStart = true;
        arrowPrev.style.display = 'none';
      } else {
        reachedStart = false;
        arrowPrev.style.display = '';
      }

      if (shift === 0 - (slides.length - 1) * step && shift !== 0) {
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
