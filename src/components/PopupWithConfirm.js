import { Popup } from "./Popup.js";
//отвечает за открытие и закрытие попапа картинки
export class PopupWithConfirm extends Popup {
  constructor(popupImageSelector, submitHandler) {
    super(popupImageSelector);
    this._submitHandler = submitHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._card, this._cardId);
      this.close();
    });
  }

  open(card, cardId) {
    super.open();
    this._card = card;
    this._cardId = cardId;
  }
}
