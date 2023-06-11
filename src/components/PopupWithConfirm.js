import { Popup } from "./Popup.js";
//отвечает за открытие и закрытие попапа картинки
export class PopupWithConfirm extends Popup {
  constructor(popupImageSelector) {
    super(popupImageSelector);
    //this._submitHandler = submitHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._card.removeCard();
      this.close();
    });
  }

  open(card) {
    super.open();
    this._card = card;
    //this._cardId = cardId;
  }
}
