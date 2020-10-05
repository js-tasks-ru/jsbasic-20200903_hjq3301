# Функция makeFriendsList(friends)

Необходимо реализовать функцию `makeFriendsList`, которая преобразует переданный массив друзей в стандартный HTML список (`ul, li`).

Массив с друзьями имеет следующий формат:
```js
let friends = [
    {
        firstName: 'Artsiom',
        lastName: 'Mezin'
    },
    {
        firstName: 'Ilia',
        lastName: 'Kantor'
    },
    {
        firstName: 'Christopher',
        lastName: 'Michael'
    }
];
```
Функция должна вернуть DOM элемент `ul`, внутри которого будет список друзей:

```html
<ul>
   <li>Artsiom Mezin</li>
   <li>Ilia Kantor</li>
   <li>Christopher Michael</li>
</ul>
```

Обращаю ваше внимание, что функция должна вернуть именно **DOM элемент**, а не строку с вёрсткой. При этом добавлять элементы списка внутрь `ul`, вы можете используя свойство `innerHTML` или любой другой способ.



