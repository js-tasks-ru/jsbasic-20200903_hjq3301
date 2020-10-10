function hideSelf() {
  const btn = document.querySelector('.hide-self-button')
  btn.addEventListener("click", () => btn.setAttribute("hidden", "true"));
}