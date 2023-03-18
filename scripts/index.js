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
//Создаём функцию открытия изображения карточки
function addOpenImage(evt) {
  openPopup(popupImage);
  //Получаем ссылку на изображение
  const imgAttribute = evt.target.closest('.elements__image').getAttribute('src');
  //Получаем текст карточки, где выбрано изображение
  const cardText = evt.target.closest('.elements__element').querySelector('.elements__text').textContent;
  //Передаём в вспл.окно ссылку и alt на изобр.
  imageOpen.setAttribute('src', imgAttribute);
  imageOpen.setAttribute('alt', cardText);
  //Передаём в вспл.окно текст
  textOpen.textContent = cardText;
}
//Создаём функцию сборки карточки
function assembleCard(cardData) {
  const cardTemplate = document.querySelector('#card').content;
  const cardClone = cardTemplate.querySelector('.elements__element').cloneNode(true);
  const cardAbout = cardClone.querySelector('.elements__text');
  const cardImage = cardClone.querySelector('.elements__image');
  cardAbout.textContent = cardData.name;
  cardImage.setAttribute('src', cardData.link);
  cardImage.setAttribute('alt', cardData.name);
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
  enableValidation(validationConfig);
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
  closePopup(popupEdit);
  enableValidation(validationConfig);
}
function handleFormSubmitAdd (evt) {
  evt.preventDefault();
  const formObj = {};
  formObj.name = namedInput.value;
  formObj.link = linkInput.value;
  const formCard = assembleCard(formObj);
  elementContainer.prepend(formCard);
  closePopup(popupAdd);
  namedInput.value = '';
  linkInput.value = '';
  enableValidation(validationConfig);
}

//Делегируем обработчики событий открытия и закрытия формы
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  };
});
document.addEventListener('mousedown', (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target.closest('.popup_opened'));
  }
});
document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup__close-button')) {
    closePopup(evt.target.closest('.popup_opened'));
  }

  if (evt.target.classList.contains('profile__edit-button')) {
    openFormEdit();
  };

  if (evt.target.classList.contains('profile__add-button')) {
    openPopup(popupAdd);
  };
});

// Прикрепляем обработчики к формам:
// он будет следить за событием “submit” - «отправка»
formElementProfile.addEventListener('submit', handleFormSubmitEdit);
formElementAdd.addEventListener('submit', handleFormSubmitAdd);
//Делегируем обработчики событий карточек контейнеру карточек
elementContainer.addEventListener('click', (evt) => {
  //Даём картинкам карточкек функцию для открытия вспл. окна
  if (evt.target.classList.contains('elements__image')) {
    addOpenImage(evt);
  }
  //Добавляет удаление карточки к корзине
  if (evt.target.classList.contains('elements__delete')) {
    evt.target.closest('.elements__element').remove()
  };
  //Переключение класса при клике к лайкам
  if (evt.target.classList.contains('elements__like')) {
    evt.target.classList.toggle('elements__like_active')
  };
});
