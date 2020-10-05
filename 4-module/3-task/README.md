# Функция highlight

Напишите функцию `highlight`, которая внесёт изменения в таблицу.

В качестве аргумента функция принимает элемент таблицы (тег `table`) c вот такой структурой:
```html
<table class="js-teachers">
  <thead>
    <tr>
      <td>Name</td>
      <td>Age</td>
      <td>Gender</td>
      <td>Status</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Ilia</td>
      <td>30</td>
      <td>m</td>
      <td data-available="true">Free</td>
    </tr>
    <tr>
      <td>Tim</td>
      <td>39</td>
      <td>m</td>
      <td data-available="false">On duty</td>
    </tr>

    <!-- Строк в таблице может быть больше-->
  </tbody>
</table>
```

Полную таблицу и пример использования можно посмотреть в файле `index.html`.

Функция `highlight` для каждой строки `tr` таблицы должна сделать следующее:
- Проставить класс `available/unavailable` в зависимости от значения атрибута `data-available` у ячейки `Status`. Если её значение `true` - класс `available`, если её значение `false` - класс `unavailable`.
- Проставить атрибут `hidden`, если атрибута `data-available` нет вообще.
- Проставить класс `male/female` в зависимости от содержимого ячейки `Gender`. Если её значение `m` - класс `male`, Если её значение `f` - класс `female`.
- Добавить inline-стиль `style="text-decoration: line-through"`, если значение ячейки `Age` меньше 18.

```js
/**
 * Метод устанавливает необходимые по условию атрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
}
```
