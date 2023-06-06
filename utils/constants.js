export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const validationConfig = {
  formSelector: '.popup__edit-form',
  inputSelector: '.popup__text-field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__text-field_type_error',
  errorClass: 'popup__input-error',
  error: '-error',
};
// Находим область профиля  и карточек
const sectionProfile = document.querySelector('.profile');
export const elementContainer = document.querySelector('.elements');
// Находим вспл.окна
export const popupEdit = document.querySelector('.popup_type-js_edit');
export const popupAdd = document.querySelector('.popup_type-js_add');
export const popupImage = document.querySelector('.popup_type-js_image');
// Находим кнопки редактирования и добавлния в профиле и закрытия в форме
export const buttonEdit = sectionProfile.querySelector('.profile__edit-button');
export const buttonAdd = sectionProfile.querySelector('.profile__add-button');
// Находим поля форм в DOM
export const nameInput = popupEdit.querySelector('.popup__text-field[name="name"]');
export const aboutInput = popupEdit.querySelector('.popup__text-field[name="about"]');
// Находим элементы, куда должны быть вставлены значения полей
export const profileName = sectionProfile.querySelector('.profile__name');
export const profileAbout = sectionProfile.querySelector('.profile__about');
//Находим шаблон карточки
export const cardTemplate = document.querySelector('#card').content;
