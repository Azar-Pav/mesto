//КАРТИНКИ
const likeBlackImage = new URL('../images/elements-like-black.svg', import.meta.url);
const likeImage = new URL('../images/elements-like.svg', import.meta.url);
const trashImage = new URL('../images/elements-trash.svg', import.meta.url);
const logoImage = new URL('../images/header-logo.svg', import.meta.url);
const closeImage = new URL('../images/popup-close-button.svg', import.meta.url);
const addImage = new URL('../images/profile-add-button.svg', import.meta.url);
const editImage = new URL('../images/profile-edit-button.svg', import.meta.url);
const editAvaImage = new URL('../images/profile-edit-ava-btn.svg', import.meta.url);
const profileImage = new URL('../images/profile-avatar.jpg', import.meta.url);

export const webpackImages = [
  { name: 'Black Like Button', link: likeBlackImage },
  { name: 'Like Button', link: likeImage },
  { name: 'Trash Button', link: trashImage },
  { name: 'Logo', link: logoImage },
  { name: 'Close Button', link: closeImage },
  { name: 'Add Button', link: addImage },
  { name: 'Edit Button', link: editImage },
  { name: 'Edit Avatar Button', link: editAvaImage },
  { name: 'Avatar', link: profileImage },
];

export const validationConfig = {
  inputSelector: '.popup__text-field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__text-field_type_error',
  errorClass: 'popup__input-error',
  error: '-error',
};
// Находим область профиля  и карточек
const sectionProfile = document.querySelector('.profile');
export const cardsContainer = document.querySelector('.elements');
// Находим вспл.окна
export const popupEdit = document.querySelector('.popup_type-js_edit');
export const popupEditAvatar = document.querySelector('.popup_type-js_ava');
export const popupAdd = document.querySelector('.popup_type-js_add');
export const popupImage = document.querySelector('.popup_type-js_image');
export const popupConfirm = document.querySelector('.popup_type-js_confirm');
// Находим кнопки редактирования и добавлния в профиле и закрытия в форме
export const buttonEditAvatar = sectionProfile.querySelector('.profile__edit-avatar-btn');
export const buttonEdit = sectionProfile.querySelector('.profile__edit-button');
export const buttonAdd = sectionProfile.querySelector('.profile__add-button');
// Находим поля форм в DOM
export const nameInput = popupEdit.querySelector('.popup__text-field[name="name"]');
export const aboutInput = popupEdit.querySelector('.popup__text-field[name="about"]');
// Находим элементы, куда должны быть вставлены значения полей
export const profileAvatar = sectionProfile.querySelector('.profile__avatar');
export const profileName = sectionProfile.querySelector('.profile__name');
export const profileAbout = sectionProfile.querySelector('.profile__about');
//Находим шаблон карточки
export const cardTemplate = document.querySelector('#card').content;

export const userId = 'b93ef50c33df209627eb7141';
export const apiOptions = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: 'fbe3a106-0f82-4218-b4b6-3d8c23a11f98',
    'Content-Type': 'application/json'
  }
};
