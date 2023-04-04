export class FormValidator {
  constructor(config, popupFormSelector) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._error = config.error;
    this._formElement = popupFormSelector;
  };
  //Показываем ошибку
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}${this._error}`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };
  //Скрываем ошибку
  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}${this._error}`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };
  //Определяем отображение ошибки
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);

    } else {
      this._hideInputError(inputElement);
    }
  };
  //Переключаем состояние кнопки
  _toggleButtonState = (inputList) => {
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled', true);
    }
  };
  //Проверям корректность всех данных в форме
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.checkValidity()
    });
  };
  //Добавляем обработчики событий инпутам и кнопке в форме
  enableValidation = () => {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList);
      });
    });
  };
  //Перепроверка валидности
  reloadValidation() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    inputList.forEach((inputElement) => {
      this._checkInputValidity(inputElement);
      this._hideInputError(inputElement);
    });
    this._toggleButtonState(inputList);
  };
}
