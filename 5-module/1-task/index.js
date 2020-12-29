function hideSelf() {
  let button = document.querySelector('.hide-self-button');

  button.onclick = function() {
    this.hidden = true;
  };
}
