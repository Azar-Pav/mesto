import { Popup } from "./Popup.js";
//отвечает за открытие и закрытие попапа картинки
export class PopupWithImage extends Popup {
  constructor(popupImageElement) {
    super(popupImageElement);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupCardtext = this._popup.querySelector('.popup__card-text');
  }

  open({ src, alt }) {
    this._popupImage.src = src;
    this._popupImage.alt = alt;
    this._popupCardtext.textContent = alt;
    super.open();
  }
}
