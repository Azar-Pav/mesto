// Находим область профиля и контейнер карточек
const elementContainer = document.querySelector('.elements');
const sectionProfile = document.querySelector('.profile');
// Находим вспл.окна
const popupEdit = document.querySelector('.popup_type-js_edit');
const popupImage = document.querySelector('.popup_type-js_image');
const popupAdd = document.querySelector('.popup_type-js_add');
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
const imageOpen = popupImage.querySelector('.popup__image');
const textOpen = popupImage.querySelector('.popup__card-text');
//Находим шаблон карточки
 const cardTemplate = document.querySelector('#card').content;
//Находим окна и кнопки закрытия
const popups = document.querySelectorAll('.popup');
const buttonsClose = document.querySelectorAll('.popup__close-button');
//Создаём функцию слушателей карточек
function setCardListeners(item) {
  //Находим лайки, картинки, текст карточек, корзину
  const cardsImg = item.querySelector('.elements__image');
  const cardsTxt = item.querySelector('.elements__text');
  const cardsLike = item.querySelector('.elements__like');
  const cardsDelete = item.querySelector('.elements__delete');
  //Даём картинкам карточкек обработчики событий для открытия вспл. окна
  cardsImg.addEventListener('click', function () {
    openPopup(popupImage);
    //Получаем ссылку на изображение
    const imgAttribute = cardsImg.getAttribute('src');
    //Получаем текст карточки, где выбрано изображение
    const cardText = cardsTxt.textContent;
    //Передаём в вспл.окно ссылку и alt на изобр.
    imageOpen.setAttribute('src', imgAttribute);
    imageOpen.setAttribute('alt', cardText);
    //Передаём в вспл.окно текст
    textOpen.textContent = cardText;
  });

  //Добавляет обработчик события (удаление карточки) к корзине
  cardsDelete.addEventListener('click', evt => evt.target.closest('.elements__element').remove());

  //Добавляет обработчик события (добавление класса при клике) к лайкам
  cardsLike.addEventListener('click', evt => evt.target.classList.toggle('elements__like_active'));
};
//Создаём функцию сборки карточки
function assembleCard(cardData) {
  const cardClone = cardTemplate.querySelector('.elements__element').cloneNode(true);
  const cardAbout = cardClone.querySelector('.elements__text');
  const cardImage = cardClone.querySelector('.elements__image');
  cardAbout.textContent = cardData.name;
  cardImage.setAttribute('src', cardData.link);
  cardImage.setAttribute('alt', cardData.name);
  setCardListeners(cardClone);
  return cardClone
}
//Добавляем начальные карточки
initialCards.forEach(function (item) {
  const card = assembleCard(item);
  elementContainer.prepend(card);
});
//Перепроверка валидности
function reloadValidation(popup, {formSelector, inputSelector, submitButtonSelector, ...config}) {
  const formElement = popup.querySelector(formSelector);
  const buttonElement = formElement.querySelector(submitButtonSelector);
  const inputSelectors = formElement.querySelectorAll(inputSelector);
  const inputList = Array.from(inputSelectors);
  inputList.forEach((inputElement) => {
    checkInputValidity(formElement, inputElement, config);
    hideInputError(formElement, inputElement, config);
  });
  toggleButtonState(inputList, buttonElement, config)
};
//Закрываем формы
function closePopup() {
  const popupOpened = document.querySelector('.popup_opened');
  popupOpened.classList.remove('popup_opened');
  removeCloseEvents();
}
//Закрытие на esc
function keyPopClose(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  };
};
//Закрытие по нажатию на оверлей вспл.окна
function mousePopClose(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup();
  };
};
//Установка слушателей закрытия вспл. окна
function setCloseEvents() {
  document.addEventListener('keydown', keyPopClose);
  popups.forEach((element) => {
    element.addEventListener('mousedown', mousePopClose);
  });
  buttonsClose.forEach((element) => {
    element.addEventListener('click', closePopup);
  });
};
//Удаление слушателей закрытия вспл. окна
function removeCloseEvents() {
  document.removeEventListener('keydown', keyPopClose);
  popups.forEach((element) => {
    element.removeEventListener('mousedown', mousePopClose);
  });
  buttonsClose.forEach((element) => {
    element.removeEventListener('click', closePopup);
  });
};

//Открываем формы
function openPopup(popup) {
  const form = popup.querySelector('.popup__edit-form');
  if (form) {
    form.reset();
    reloadValidation(popup, validationConfig);
  };
  popup.classList.add('popup_opened');
  setCloseEvents();
};

function openFormEdit() {
  openPopup(popupEdit);
  //текст profile__name и profile__about в поле ввода
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  reloadValidation(popupEdit, validationConfig);
};

// Обработчики «отправки» формы
function handleFormSubmitEdit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получите значение полей aboutInput и nameInput из свойства value
  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup();
};

function handleFormSubmitAdd (evt) {
  evt.preventDefault();
  const cardData = {};
  cardData.name = namedInput.value;
  cardData.link = linkInput.value;
  const formCard = assembleCard(cardData);
  elementContainer.prepend(formCard);
  closePopup();
};

//Открываем формы
buttonEdit.addEventListener('click', openFormEdit);
buttonAdd.addEventListener('click', open => openPopup(popupAdd));
// Прикрепляем обработчики к формам:
// он будет следить за событием “submit” - «отправка»
formElementProfile.addEventListener('submit', handleFormSubmitEdit);
formElementAdd.addEventListener('submit', handleFormSubmitAdd);

