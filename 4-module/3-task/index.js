/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
  let elements = table.querySelectorAll('td');

  elements.forEach(function(item) {
    if(item.dataset.available === "true"){
        item.classList.add('available')
    } else if (item.dataset.available === "false") {
        item.classList.add('unavailable')
    } else {
        table.rows[4].cells[3].setAttribute('hidden', 'true');
        // Ну понятно что тут ошибка, но не понимаю как сделать.
        if (item.innerHTML === "m") {
            item.classList.add('male')
        } else if (item.innerHTML === "f") {
            item.classList.add('female')
        }
        if (item.innerHTML < 18) {
            item.style.textDecoration = "line-through"
        } else {
        }
    }
  });

  return elements
};
