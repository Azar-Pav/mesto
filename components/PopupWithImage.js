import { Popup } from "./Popup.js";
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
