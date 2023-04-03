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
function openPopup(popup) {
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
  const formCard = assembleCard(cardData);
  elementContainer.prepend(formCard);
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

const validationConfig = {
  formSelector: '.popup__edit-form',
  inputSelector: '.popup__text-field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__text-field_type_error',
  errorClass: 'popup__input-error',
  error: '-error',
};

const formProfileValidation = new FormValidator(validationConfig, popupEdit);
formProfileValidation.setEventListeners();
const formAddValidation = new FormValidator(validationConfig, popupAdd);
formAddValidation.setEventListeners();

