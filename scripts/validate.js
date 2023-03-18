//Показываем ошибку
const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass, error}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}${error}`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};
//Скрываем ошибку
const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass , error}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}${error}`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};
//Определяем отображение ошибки
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);

  } else {
    hideInputError(formElement, inputElement, config);
  }
};
//Переключаем состояние кнопки
const toggleButtonState = (inputList, buttonElement, {inactiveButtonClass}) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled', true);
  }
};
//Проверям корректность всех данных в форме
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.checkValidity()
  });
};
//Добавляем обработчики событий инпутам и кнопке в форме
const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...config}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};
//Добавляем всем формам обработчики событий
const enableValidation = ({formSelector, fieldsetSelector, ...config}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
    });
  };

const validationConfig = {
  formSelector: '.popup__edit-form',
  inputSelector: '.popup__text-field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__text-field_type_error',
  errorClass: 'popup__input-error',
  error: '-error',
};

enableValidation(validationConfig);
