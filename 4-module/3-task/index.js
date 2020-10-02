/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
  let elements = table.querySelectorAll('td');

  elements.forEach(function(item) {
    if(item.dataset.available === "true"){
        item.parentElement.classList.add('available')
    } else if (item.dataset.available === "false") {
        item.parentElement.classList.add('unavailable')
    } else {
        item.parentNode.setAttribute('hidden', 'true');
        if (item.innerHTML === "m") {
            item.parentElement.classList.add('male')
        } else if (item.innerHTML === "f") {
            item.parentElement.classList.add('female')
        }
        if (item.innerHTML < 18) {
            item.parentElement.style.textDecoration = "line-through"
        } else {
        }
    }
  });

  return elements
};
