function initCarousel() {
  const right = document.querySelector('.carousel__arrow_right');
  const left = document.querySelector('.carousel__arrow_left');
  const carousel = document.querySelector('.carousel__inner')
  let computedStyle = getComputedStyle(carousel)
  position = 0;
  left.style.display = 'none';

  

  right.addEventListener( "click" , function() {
      left.style.display = 'flex';
      carousel.style.transform = 'translateX(-988px)'
      });


  left.addEventListener( "click" , function() {
    carousel.style.transform = 'translateX(0)'
    left.style.display = 'none';
    console.log(computedStyle.transform);
  });

}
