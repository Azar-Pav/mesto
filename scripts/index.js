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
// Находим кнопки закрытия в формах
const buttonCloseEdit = popupEdit.querySelector('.popup__close-button');
const buttonCloseAdd = popupAdd.querySelector('.popup__close-button');
const buttonCloseImage = popupImage.querySelector('.popup__close-button');
// Находим поля форм в DOM
const nameInput = popupEdit.querySelector('.popup__text-field[name="name"]');
const aboutInput = popupEdit.querySelector('.popup__text-field[name="about"]');
const namingInput = popupAdd.querySelector('.popup__text-field[name="naming"]');
const linkInput = popupAdd.querySelector('.popup__text-field[name="link"]');
// Находим элементы, куда должны быть вставлены значения полей
const profileName = sectionProfile.querySelector('.profile__name');
const profileAbout = sectionProfile.querySelector('.profile__about');
const imageOpen = popupImage.querySelector('.popup__image');
const textOpen = popupImage.querySelector('.popup__card-text');
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
  const cardTemplate = document.querySelector('#card').content;
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

//Открываем формы
function openPopup(popup) {
  popup.classList.add('popup_opened');
}
function openFormEdit() {
  openPopup(popupEdit);
  //текст profile__name и profile__about в поле ввода
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

//Закрываем формы
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Обработчики «отправки» формы
function handleFormSubmitEdit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получите значение полей aboutInput и nameInput из свойства value
  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup(evt);
}
function handleFormSubmitAdd (evt) {
  evt.preventDefault();
  const formObj = {};
  formObj.name = namingInput.value;
  formObj.link = linkInput.value;
  const formCard = assembleCard(formObj);
  elementContainer.prepend(formCard);
  closePopup(evt);
  namingInput.value = '';
  linkInput.value = '';
}

//Обработчики открытия и закрытия формы
buttonEdit.addEventListener('click', openFormEdit);
buttonAdd.addEventListener('click', open => openPopup(popupAdd));
buttonCloseEdit.addEventListener('click', close => closePopup(popupEdit));
buttonCloseAdd.addEventListener('click', close => closePopup(popupAdd));
buttonCloseImage.addEventListener('click', close => closePopup(popupImage));
// Прикрепляем обработчики к формам:
// он будет следить за событием “submit” - «отправка»
formElementProfile.addEventListener('submit', handleFormSubmitEdit);
formElementAdd.addEventListener('submit', handleFormSubmitAdd);

