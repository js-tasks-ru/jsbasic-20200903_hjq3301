import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.elem = createElement(`
    <div class="container">
    <!--Корневой элемент Modal-->
    <div class="modal">
      <!--Прозрачная подложка перекрывающая интерфейс-->
      <div class="modal__overlay"></div>
  
      <div class="modal__inner">
        <div class="modal__header">
          <!--Кнопка закрытия модального окна-->
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
  
          <h3 class="modal__title">
            Вот сюда нужно добавлять заголовок
          </h3>
        </div>
  
        <div class="modal__body">
          A сюда нужно добавлять содержимое тела модального окна
        </div>
      </div>
  
    </div>
  </div>
  `);

    this.body = document.querySelector("body");
    this.body.append(this.elem);
    this.title = document.querySelector(".modal__title");
    this.modalBody = document.querySelector(".modal__body");

    this.eventHandlers();
  }

  eventHandlers() {
    addEventListener("click", event => {
      if (event.target.closest(".modal__close")) {
        this.close();
      }
    });

    addEventListener("keydown", event => {
      if (event.code === "Escape") {
        this.close();
      }
    });
  }

  open() {
    this.body.classList.add("is-modal-open");
  }

  setTitle(title) {
    this.title.innerHTML = title;
  }

  setBody(modalBody) {
    this.modalBody.innerHTML = "";
    this.modalBody.append(modalBody);
  }

  close() {
    this.body.classList.remove("is-modal-open");
    this.elem.remove();
  }
}
