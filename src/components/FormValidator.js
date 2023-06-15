export class FormValidator {
  constructor(
    {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass,
      error
    },
    popupFormElement
  )
  {
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._error = error;
    this._form = popupFormElement;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
  };
  //Показываем ошибку
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}${this._error}`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };
  //Скрываем ошибку
  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}${this._error}`);
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
  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled', true);
    }
  };
  //Проверям корректность всех данных в форме
  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.checkValidity()
    });
  };
  //Добавляем обработчики событий инпутам и кнопке в форме
  enableValidation = () => {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };
  //Перепроверка валидности
  reloadValidation() {
    this._inputList.forEach((inputElement) => {
      this._checkInputValidity(inputElement);
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  };
}
