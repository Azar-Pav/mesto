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
  popupConfirm,
  buttonEdit,
  buttonAdd,
  profileName,
  profileAbout,
  nameInput,
  aboutInput,
  cardTemplate,
  apiOptions
} from '../utils/constants.js';
//КОМПОНЕНТЫ/МОДУЛИ/КЛАССЫ
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api';

let userId;

const initialDataFromServer = () => {
  Promise.all([api.getInitialCards(), api.getUser()])
    .then((data) => {
      rendererCards.renderItems(data[0], data[1]._id);
      userInfo.setUserInfo(data[1]);
      //userId = data[1]._id;
      //console.log(userId);
    })
    .catch((err) => {
      console.error(err);
    })
}

const returnCard = (cardData, userId) => {
  const newCard = new Card(
    cardData,
    cardTemplate,
    userId,
    ({ src, alt }) => {popupWithImage.open({ src, alt })},
    (card) => {popupWithConfirm.open(card)}
    );
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

const api = new Api(apiOptions);
const rendererCards = new Section(
  {
    renderer: returnCard
  }, elementContainer);

//Попапы
const popupWithConfirm = new PopupWithConfirm(popupConfirm);
const popupWithImage = new PopupWithImage(popupImage);
const popupWithCardForm = new PopupWithForm(popupAdd, handleSubmitAddCard);
const popupWithUserForm = new PopupWithForm(popupEdit, handleSubmitUserInfo);
const userInfo = new UserInfo(profileName, profileAbout);
//Валидация
const formProfileValidation = new FormValidator(validationConfig, popupEdit);
const formAddValidation = new FormValidator(validationConfig, popupAdd);
//Грузим карточки
initialDataFromServer();
//Слушатели попапов
popupWithConfirm.setEventListeners();
popupWithImage.setEventListeners();
popupWithCardForm.setEventListeners();
popupWithUserForm.setEventListeners();
//Включаем валидацию
formProfileValidation.enableValidation();
formAddValidation.enableValidation();
//Открываем формы
buttonAdd.addEventListener('click', handlerAdd);
buttonEdit.addEventListener('click', handlerEdit);



