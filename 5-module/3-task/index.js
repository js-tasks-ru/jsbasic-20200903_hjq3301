function initCarousel() {
  const rightBtn = document.querySelector('.carousel__arrow_right');
  const leftBtn = document.querySelector('.carousel__arrow_left');
  const carousel = document.querySelector('.carousel__inner');
  let slidePositon = carousel.offsetWidth;
  let position = 0;

  rightBtn.addEventListener("click", function() {
    position -= slidePositon;
    movePositon();
    hideBtn();
  });

  leftBtn.addEventListener("click", function() {
    position += slidePositon;
    movePositon();
    hideBtn();
  });

  const movePositon = () => {
    console.log(position);
    carousel.style.transform = `translateX(${position}px)`;
  };

  const hideBtn = () => {
    if (position === 0) {
      leftBtn.style.display = 'none';
    } else {
      leftBtn.style.display = 'flex';
    }
    
    if (position === -2964) {
      rightBtn.style.display = 'none';
    } else {
      rightBtn.style.display = 'none';
    }
  };
  hideBtn();
}
