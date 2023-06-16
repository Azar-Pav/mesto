import { Popup } from "./Popup.js";
//отвечает за открытие и закрытие формы
export class PopupWithForm extends Popup {
  constructor(popupFormElement, submitHandler) {
    super(popupFormElement);
    this._submitHandler = submitHandler;
    this._formElement = this._popup.querySelector('.popup__edit-form');
    this._inputs = Array.from(this._popup.querySelectorAll('.popup__text-field'));
    this._submitButton = this._popup.querySelector('.popup__save-button');
    this._initialSubmitText = this._submitButton.textContent;
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
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  resetSubmitButtonText() {
    this._submitButton.textContent = this._initialSubmitText;
  }

  setSubmitButtonText(text) {
    if (text) {
      this._submitButton.textContent = text;
    } else {
      this.resetSubmitButtonText();
    }
  }
}
