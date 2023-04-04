import {initialCards, validationConfig} from './indexData.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

// Находим область профиля
const sectionProfile = document.querySelector('.profile');
// Находим вспл.окна
const popupEdit = document.querySelector('.popup_type-js_edit');
const popupAdd = document.querySelector('.popup_type-js_add');
export const popupImage = document.querySelector('.popup_type-js_image');
// Находим формы в вспл.окнах
const formElementProfile = popupEdit.querySelector('.popup__edit-form');
const formElementAdd = popupAdd.querySelector('.popup__edit-form');
// Находим кнопки редактирования и добавлния в профиле и закрытия в форме
const buttonEdit = sectionProfile.querySelector('.profile__edit-button');
const buttonAdd = sectionProfile.querySelector('.profile__add-button');
// Находим поля форм в DOM
const nameInput = popupEdit.querySelector('.popup__text-field[name="name"]');
const aboutInput = popupEdit.querySelector('.popup__text-field[name="about"]');
const namedInput = popupAdd.querySelector('.popup__text-field[name="named"]');
const linkInput = popupAdd.querySelector('.popup__text-field[name="link"]');
// Находим элементы, куда должны быть вставлены значения полей
const profileName = sectionProfile.querySelector('.profile__name');
const profileAbout = sectionProfile.querySelector('.profile__about');
export const imageOpen = popupImage.querySelector('.popup__image');
export const textOpen = popupImage.querySelector('.popup__card-text');
//Находим шаблон карточки
 const cardTemplate = document.querySelector('#card').content;
//Находим окна и кнопки закрытия
const popups = document.querySelectorAll('.popup');
const buttonsClose = document.querySelectorAll('.popup__close-button');

const formProfileValidation = new FormValidator(validationConfig, popupEdit);
formProfileValidation.enableValidation();
const formAddValidation = new FormValidator(validationConfig, popupAdd);
formAddValidation.enableValidation();
const loadCards = new Card(initialCards, cardTemplate);
loadCards.addCards();
//Закрываем формы
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  removeCloseByEsc();
}
//Закрытие на esc
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  };
};
//Установка слушателя закрытия на esc
function addCloseByEsc() {
  document.addEventListener('keydown', closeByEsc);
};
//Удаление слушателя закрытия на esc
function removeCloseByEsc() {
  document.removeEventListener('keydown', closeByEsc);
};
//Закрытие по нажатию на оверлей вспл.окна
function closeByOverlayClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  };
};

//Открываем формы
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  addCloseByEsc();
};

function openFormEdit() {
  //текст profile__name и profile__about в поле ввода
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  formProfileValidation.reloadValidation();
  openPopup(popupEdit);
};

function openFormAdd() {
  formElementAdd.reset();
  formAddValidation.reloadValidation();
  openPopup(popupAdd);
};

// Обработчики «отправки» формы
function handleFormSubmitEdit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получите значение полей aboutInput и nameInput из свойства value
  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup(popupEdit);
};

function handleFormSubmitAdd (evt) {
  evt.preventDefault();
  const cardData = {};
  cardData.name = namedInput.value;
  cardData.link = linkInput.value;
  const createCard = new Card(cardData, cardTemplate);
  createCard.addCards();
  formElementAdd.reset();
  closePopup(popupAdd);
};

//Открываем формы
buttonEdit.addEventListener('click', openFormEdit);
buttonAdd.addEventListener('click', openFormAdd);
// Прикрепляем обработчики к формам:
// он будет следить за событием “submit” - «отправка»
formElementProfile.addEventListener('submit', handleFormSubmitEdit);
formElementAdd.addEventListener('submit', handleFormSubmitAdd);
//Обрабочики закрытия по нажатию на оверлей вспл.окна
popups.forEach((element) => {
  element.addEventListener('mousedown', closeByOverlayClick);
});
//Обработчики закрытия кнопки закрытия вспл.окна
buttonsClose.forEach((element) => {
  element.addEventListener('click', close => closePopup(document.querySelector('.popup_opened')));
});




