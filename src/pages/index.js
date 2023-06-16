import './index.css';
//КОНСТАНТЫ
import {
  webpackImages,
  validationConfig,
  cardsContainer,
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

let userId;

const getInitialDataFromServer = () => {
  Promise.all([ api.getInitialCards(), api.getUser() ])
    .then(([ cardsData, userData ]) => {
      userId = userData._id;
      cardsSection.renderItemsAppend(cardsData);
      userInfo.setUserInfo(userData);
    })
    .catch((err) => {
      console.error(err);
    })
}

const createCard = (cardData) => {
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

const handleLikeCard = (card, cardId) => {
  if (!card.isLiked()) {
    api.putLike(cardId)
    .then((res) => {
      card.toggleLike();
      card.setLikesCount(res.likes.length);
    })
    .catch((err) => {
      console.error(err);
    })
  } else {
    api.deleteLike(cardId)
    .then((res) => {
      card.toggleLike();
      card.setLikesCount(res.likes.length);
    })
    .catch((err) => {
      console.error(err);
    })
  }
}

const handleDeleteCard = (card, cardId) => {
  popupWithConfirm.setSubmitButtonText('Удаление...');
  api.deleteCard(cardId)
  .then((res) => {
    card.removeCard()
    popupWithConfirm.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupWithConfirm.setSubmitButtonText();
  });
}

const handleSubmitAddCard = (newCard) => {
  popupWithCardForm.setSubmitButtonText('Добавление...');
  api.sendCard(newCard)
  .then((res) => {
    cardsSection.prependItem(createCard(res));
    popupWithCardForm.close();
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    popupWithCardForm.setSubmitButtonText();
  });
};

const handleSubmitUserInfo = (dataUserInfo) => {
  popupWithUserForm.setSubmitButtonText('Сохранение...');
  api.patchUser(dataUserInfo)
  .then((res) => {
    userInfo.setUserInfo(dataUserInfo);
    popupWithUserForm.close();
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    popupWithUserForm.setSubmitButtonText();
  });
};

const handleSubmitUserAvatar = (dataUserInfo) => {
  popupWithUserAvaForm.setSubmitButtonText('Сохранение...');
  api.patchUserAvatar(dataUserInfo)
  .then((res) => {
    userInfo.setUserInfo(dataUserInfo);
    popupWithUserAvaForm.close();
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    popupWithUserAvaForm.setSubmitButtonText();
  });
};

const openPopupAdd = () => {
  formAddValidation.reloadValidation();
  popupWithCardForm.open();
}

const openPopupEdit = () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  aboutInput.value = userData.about;
  formProfileValidation.reloadValidation();
  popupWithUserForm.open();
}

const openPopupEditAvatar = () => {
  formAvatarValidation.reloadValidation();
  popupWithUserAvaForm.open();
}

const api = new Api(apiOptions);
const cardsSection = new Section(
  {
    renderer: (item) => {
      cardsSection.appendItem(createCard(item))
    }
  },
  cardsContainer);

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
getInitialDataFromServer();
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
buttonEditAvatar.addEventListener('click', openPopupEditAvatar);
buttonEdit.addEventListener('click', openPopupEdit);
buttonAdd.addEventListener('click', openPopupAdd);



