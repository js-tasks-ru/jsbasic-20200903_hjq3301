/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
  let ul = document.createElement('ul');
  ul.innerHTML = friends.map(item => 
    `<li>${item.firstName} ${item.lastName}</li>`)
    .join('');
  return ul;
};


