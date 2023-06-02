//отвечает за отрисовку элементов на странице
export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems() {
    this._items.forEach(item => {
      const itemElement = this._renderer(item);
      this.addItem(itemElement);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
//отвечает за открытие и закрытие попапа
export class Popup {
  constructor(popupSelector) {
    this._popupElement = popupSelector;

    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup__close-button')) {
        this.close();
      }
    });
    this._popupElement.addEventListener('mousedown', (evt) => {
      if (evt.target === this._popupElement) {
        this.close();
      }
    });
  }
}
//отвечает за открытие и закрытие попапа картинки
export class PopupWithImage extends Popup {
  constructor(popupImageSelector) {
    super(popupImageSelector);
    this._popupImage = this._popupElement.querySelector('.popup__image');
    this._popupCardtext = this._popupElement.querySelector('.popup__card-text');
  }

  open({ src, alt }) {
    this._popupImage.src = src;
    this._popupImage.alt = alt;
    this._popupCardtext.textContent = alt;
    super.open();
  }
}
//отвечает за открытие и закрытие формы
export class PopupWithForm extends Popup {
  constructor(popupFormSelector, submitHandler) {
    super(popupFormSelector);
    this._submitHandler = submitHandler;
    this._formElement = this._popupElement.querySelector('.popup__edit-form');
    this._inputs = Array.from(this._popupElement.querySelectorAll('.popup__text-field'));
  }

  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}

// отвечает за управление отображением информации о пользователе на странице
export class UserInfo {
  constructor(nameSelector, infoSelector) {
    this._nameElement = nameSelector;
    this._aboutElement = infoSelector;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent
    };
  }

  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
  }
}
