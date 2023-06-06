import { Popup } from "./Popup.js";
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
