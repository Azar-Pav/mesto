import './index.css';
//КОНСТАНТЫ
import {
  webpackImages,
  initialCards,
  validationConfig,
  elementContainer,
  popupEdit,
  popupAdd,
  popupImage,
  buttonEdit,
  buttonAdd,
  profileName,
  profileAbout,
  nameInput,
  aboutInput,
  cardTemplate
} from '../utils/constants.js';
//КОМПОНЕНТЫ/МОДУЛИ/КЛАССЫ
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';

const returnCard = (cardData) => {
  const newCard = new Card(cardData, cardTemplate, ({ src, alt }) => {popupWithImage.open({ src, alt })});
  const card = newCard.assembleCard();
  return card
};

const handleSubmitAddCard = (newCard) => {
  rendererCards.addItem(returnCard(newCard));
};

const handleSubmitUserInfo = (dataUserInfo) => {
  userInfo.setUserInfo(dataUserInfo);
};

const handlerAdd = () => {
    formAddValidation.reloadValidation();
    popupWithCardForm.open();
  }

const handlerEdit = () => {
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    aboutInput.value = userData.about;
    formProfileValidation.reloadValidation();
    popupWithUserForm.open();
  }

const rendererCards = new Section(
  { items: initialCards,
    renderer: returnCard
  }, elementContainer);

//Попапы
const popupWithImage = new PopupWithImage(popupImage);
const popupWithCardForm = new PopupWithForm(popupAdd, handleSubmitAddCard);
const popupWithUserForm = new PopupWithForm(popupEdit, handleSubmitUserInfo);
const userInfo = new UserInfo(profileName, profileAbout);
//Валидация
const formProfileValidation = new FormValidator(validationConfig, popupEdit);
const formAddValidation = new FormValidator(validationConfig, popupAdd);
//Грузим карточки
rendererCards.renderItems();
//Слушатели попапов
popupWithImage.setEventListeners();
popupWithCardForm.setEventListeners();
popupWithUserForm.setEventListeners();
//Включаем валидацию
formProfileValidation.enableValidation();
formAddValidation.enableValidation();
//Открываем формы
buttonAdd.addEventListener('click', handlerAdd);
buttonEdit.addEventListener('click', handlerEdit);



