import './index.css';
//КОНСТАНТЫ
import {
  webpackImages,
  initialCards,
  validationConfig,
  elementContainer,
  popupEdit,
  popupEditAvatar,
  popupAdd,
  popupImage,
  popupConfirm,
  buttonEditAvatar,
  buttonEdit,
  buttonAdd,
  profileAvatar,
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

const initialDataFromServer = () => {
  Promise.all([api.getInitialCards(), api.getUser()])
    .then((data) => {
      rendererCards.renderItems(data[0], data[1]._id);
      userInfo.setUserInfo(data[1]);
      userInfo.setUserAvatar(data[1]);
    })
    .catch((err) => {
      console.error(err);
    })
}

const handleDeleteCard = (card, cardId) => {
  api.deleteCard(cardId)
    .then((res) => {
      card.removeCard()
    })
    .catch((err) => {
      console.log(err);
    })
}

const handleLikeCard = (like, likeCount, card, cardId) => {
  if (!like.classList.contains('elements__like_active')) {
    api.putLike(cardId)
    .then((res) => {
      card.toggleLike();
      likeCount.textContent = res.likes.length;
    })
    .catch((err) => {
      console.error(err);
    })
  } else {
    api.deleteLike(cardId)
    .then((res) => {
      card.toggleLike();
      likeCount.textContent = res.likes.length;
    })
    .catch((err) => {
      console.error(err);
    })
  }
}

const returnCard = (cardData, userId) => {
  const newCard = new Card(
    cardData,
    cardTemplate,
    userId,
    ({ src, alt }) => {popupWithImage.open({ src, alt })},
    (card, cardId) => {popupWithConfirm.open(card, cardId)},
    handleLikeCard
  );
  const card = newCard.assembleCard();
  return card
};

const handleSubmitAddCard = (newCard) => {
  api.sendCard(newCard)
    .then((res) => {
      rendererCards.addItem(returnCard(newCard));
    })
    .catch((err) => {
      console.error(err);
    })
};

const handleSubmitUserInfo = (dataUserInfo) => {
  api.patchUser(dataUserInfo)
    .then((res) => {
      userInfo.setUserInfo(dataUserInfo);
    })
    .catch((err) => {
      console.error(err);
    })
};

const handleSubmitUserAvatar = (dataUserInfo) => {
  api.patchUserAvatar(dataUserInfo)
    .then((res) => {
      userInfo.setUserAvatar(dataUserInfo);
    })
    .catch((err) => {
      console.error(err);
    })
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

const handlerEditAvatar = () => {
  formAvatarValidation.reloadValidation();
  popupWithUserAvaForm.open();
}

const api = new Api(apiOptions);
const rendererCards = new Section(
  {
    renderer: returnCard
  }, elementContainer);

//Попапы
const popupWithConfirm = new PopupWithConfirm(popupConfirm, handleDeleteCard);
const popupWithImage = new PopupWithImage(popupImage);
const popupWithCardForm = new PopupWithForm(popupAdd, handleSubmitAddCard);
const popupWithUserForm = new PopupWithForm(popupEdit, handleSubmitUserInfo);
const popupWithUserAvaForm = new PopupWithForm(popupEditAvatar, handleSubmitUserAvatar);
const userInfo = new UserInfo(profileName, profileAbout, profileAvatar);
//Валидация
const formAvatarValidation = new FormValidator(validationConfig, popupEditAvatar);
const formProfileValidation = new FormValidator(validationConfig, popupEdit);
const formAddValidation = new FormValidator(validationConfig, popupAdd);
//Грузим карточки
initialDataFromServer();
//Слушатели попапов
popupWithConfirm.setEventListeners();
popupWithImage.setEventListeners();
popupWithCardForm.setEventListeners();
popupWithUserForm.setEventListeners();
popupWithUserAvaForm.setEventListeners();
//Включаем валидацию
formAvatarValidation.enableValidation();
formProfileValidation.enableValidation();
formAddValidation.enableValidation();
//Открываем формы
buttonEditAvatar.addEventListener('click', handlerEditAvatar);
buttonEdit.addEventListener('click', handlerEdit);
buttonAdd.addEventListener('click', handlerAdd);



