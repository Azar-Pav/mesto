import { Popup } from "./Popup.js";
//отвечает за открытие и закрытие попапа картинки
export class PopupWithConfirm extends Popup {
  constructor(popupConfirmElement, submitHandler) {
    super(popupConfirmElement);
    this._submitHandler = submitHandler;
    this._submitButton = this._popup.querySelector('.popup__save-button');
    this._initialSubmitText = this._submitButton.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._card, this._cardId);
    });
  }

  open(card, cardId) {
    super.open();
    this._card = card;
    this._cardId = cardId;
  }

  setSubmitButtonText(text) {
    if (text) {
      this._submitButton.textContent = text;
    } else {
      this._submitButton.textContent = this._initialSubmitText;
    }
  }
}
