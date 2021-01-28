# Учебный проект: Корзина, часть 2

"Корзина" - компонент интерфейса онлайн магазина или ресторана, в который пользователи добавляют товары для заказа.

В прошлой задаче вы реализовали основу корзины, в этом мы ее закончим.

В этой задаче у вас уже есть файл `index.js`, в котором находится класс `Cart`, описывающий этот компонент. Перед началом работы, скопируйте реализацию методов `addProduct`, `updateProductCount`, `isEmpty`, `getTotalCount`, `getTotalPrice` в класс `Cart` из предыдущей задачи.

Также в этой части будет использоваться компонент "Модальное окно", который вы должны были создать ранее. 

Хранение товаров товаров в корзине мы полностью переиспользуем из первой части.

## Методы, которые уже готовы

В этой задаче уже готов ряд простых методов, которые генерируют вёрстку, чтобы вы сосредоточились на JavaScript. Далее их описание.

### Метод renderProduct(product, count)

В качестве аргумента принимает `product` - объект товара, `count` - количество единиц этого товара. 

Возвращает верстку этого товара, для показа в корзине:

```js
// createElement - вспомогательная функция для создание элемента

renderProduct(product, count) {
    return createElement(`
  <div class="cart-product" data-product-id="${
    product.id
  }">
    <div class="cart-product__img">
      <img src="/assets/images/products/${product.image}" alt="product">
    </div>
    <div class="cart-product__info">
      <div class="cart-product__title">${escapeHtml(product.name)}</div>
      <div class="cart-product__price-wrap">
        <div class="cart-counter">
          <button type="button" class="cart-counter__button cart-counter__button_minus">
            <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
          </button>
          <span class="cart-counter__count">${count}</span>
          <button type="button" class="cart-counter__button cart-counter__button_plus">
            <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
          </button>
        </div>
        <div class="cart-product__price">€${product.price.toFixed(2)}</div>
      </div>
    </div>
  </div>`);
  }
```

Результат работы этого метода можно увидеть на картинке ниже:

<img width="100%" alt="Карточка товара в корзине" src="https://i.imgur.com/QXoif3I.png">

Обратите внимание, в этой вёрстке рядом с картинкой товара есть кнопки по уменьшению и увеличению его количества с классами `cart-counter__button_minus` и `cart-counter__button_plus`. 

Нужно будет сделать так, чтобы по нажатию на них изменялось количество единиц товара в корзине, об этом дальше.

### Метод renderOrderForm()

Этот метод возвращает форму для ввода данных пользователя в момент оформления заказа. 

```js
// createElement - вспомогательная функция для создание элемента

renderOrderForm() {
  return createElement(`<form class="cart-form">
    <h5 class="cart-form__title">Delivery</h5>
    <div class="cart-form__group cart-form__group_row">
      <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
      <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
      <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
    </div>
    <div class="cart-form__group">
      <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
    </div>
    <div class="cart-buttons">
      <div class="cart-buttons__buttons btn-group">
        <div class="cart-buttons__info">
          <span class="cart-buttons__info-text">total</span>
          <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
        </div>
        <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
      </div>
    </div>
  </form>`);
}
```
Результат работы этого метода можно увидеть на картинке ниже:

<img width="100%" alt="Форма заказа в корзине" src="https://i.imgur.com/s07fKN4.png">

### Метод addEventListeners()

Добавляет обработчик на открытие модального окна.

```js
addEventListeners() {
  this.cartIcon.elem.onclick = () => this.renderModal();
}
```

Метод `renderModal` реализуете вы.

## Методы, которые нужно реализовать

### Метод renderModal()

Этот метод вызывается, когда пользователь кликает по иконке корзины. Он отвечает за открытие модального окна с корзиной.

Перед реализацией рекомендуется освежить в памяти методы модального окна, которые мы реализовали ранее.

**Требования к реализации метода:**

1. Создает новое модальное окно на основе компонента `Modal`.
2. Добавляет заголовок `"Your order"` в созданное модальное окно.
3. Создает верстку корзины с корневым элементом `div` по принципу:
```html
<div>
  < Карточка товара 1 /> <!-- результат вызова метода renderProduct -->
  < Карточка товара 2 /> <!-- результат вызова метода renderProduct -->
  <!-- ... остальные карточки товаров -->

  < Форма заказа /> <!-- результат вызова метода renderOrderForm -->
</div>  
```
4. Вставляет эту верстку в тело модального окна. 
5. Добавляет необходимые обработчики (или один обработчик), чтобы при кликах на кнопках +/- увеличивать/уменьшать количество товаров.

Для добавления или удаления товара нужно:

- Определить по элементу +/-, какой это товар (в верстке для этого есть `data-product-id` с уникальным идентификтором товара)
- Использовать уже существующий метод `updateProductCount`, чтобы обновить `cartItems`.
   - Он вызовет уже существующий метод `onProductUpdate`, который нужно дописать, чтобы он обновлял отображение товара в модальном окне.

6. Добавляет необходимый обработчик, чтобы при событии `submit` на элементе формы с классом `cart-form`, вызывался метод `onSubmit` данного компонента. При этом при вызове этого метода, ему нужно будет не забыть передать в качестве аргумента объект события:

```js
// event - объект события "submit"
this.onSubmit(event);
```
Метод `onSubmit` вы реализуете сами, требования чуть ниже.

### Метод onProductUpdate(cartItem)

Допишите метод `onProductUpdate`, чтобы он обновлял верстку при изменении количества товара `cartItem`.

Первым делом этот метод обновляет иконку корзины, вызывая метод `update`. Этот вызов уже есть в коде.

Обновлять верстку нужно только том случае, если модальное окно с корзиной открыто. Определить это можно по наличию класса `is-modal-open` на элементе `body`. 

Для обновления верстки (с учетом использования метода `renderProduct`) подойдут CSS-селекторы:

```js
let productId = "laab-kai-chicken-salad"; // Уникальный идентификатора товара (для примера)
let modalBody = корневой элемент тела модального окна, который мы получили, вызвав метод renderModal

// Элемент, который хранит количество товаров с таким productId в корзине
let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`); 

// Элемент с общей стоимостью всех единиц этого товара
let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`); 

// Элемент с суммарной стоимостью всех товаров
let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`); 
```

Изменение этих данных:
```js
productCount.innerHTML = новое количество единиц товара

productPrice.innerHTML = `€${новая стоимость товаров такого вида с округлением до 2го знака после запятой}`;

infoPrice.innerHTML = `€${новая общая стоимость корзины (по всем товарам) с округлением до 2го знака}`;
```

Если в корзине не осталось ни одного товара, например, был один такой товар в единственном экземпляре, и мы уменьшили его количество на единицу, то ничего обновлять не надо, нужно просто закрыть модальное окно.

### onSubmit(event)

Этот метод отправляет данные пользователя для размещения заказа. Он должен вызываться при попытке отправить форму.

**Требования к реализации метода:**

1. Предотвратить перезагрузку страницу после сабмита формы.
2. Добавить класс `is-loading` кнопке с атрибутом `type="submit"`.
3. Сделать запрос на сервер с помощью `fetch` и методом `POST` на адрес - `https://httpbin.org/post`. Данные для отправки нужно сформировать из формы с классом `cart-form` с помощью конструктора `FormData`. Подробнее об этом можно прочитать в статье - [FormData](https://learn.javascript.ru/formdata).

**Если отправка данных была успешной:**

1. Заменить заголовок модального окна на `'Success!'`.
2. Удалить все товары из массива в свойстве `cartItems`.
3. Заменить содержимое тела модального окна на верстку:

```html
<div class="modal__body-inner">
  <p>
    Order successful! Your order is being cooked :) <br>
    We’ll notify you about delivery time shortly.<br>
    <img src="/assets/images/delivery.gif">
  </p>
</div>
`;
```
