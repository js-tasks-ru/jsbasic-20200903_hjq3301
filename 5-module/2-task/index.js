function toggleText() {
  let toggleButton = document.querySelector('.toggle-text-button');
  let textElement = document.getElementById('text');

  toggleButton.addEventListener('click', () => {
    let isTextElementHidden = textElement.hidden;
    textElement.hidden = !isTextElementHidden;
  });
}
