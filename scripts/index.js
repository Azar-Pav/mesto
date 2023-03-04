const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
// Находим область профиля и контейнер карточек
const elementContainer = document.querySelector('.elements');
const sectionProfile = document.querySelector('.profile');
// Находим вспл.окна
const popupEdit = document.querySelector('.popup_type-js_edit');
const popupImage = document.querySelector('.popup_type-js_image');
const popupAdd = document.querySelector('.popup_type-js_add');
// Находим формы в вспл.окнах
const formElement = popupEdit.querySelector('.popup__edit-form');
const formElementAdd = popupAdd.querySelector('.popup__edit-form');
// Находим кнопки редактирования и добавлния в профиле и закрытия в форме
const buttonEdit = sectionProfile.querySelector('.profile__edit-button');
const buttonAdd = sectionProfile.querySelector('.profile__add-button');
// Находим кнопки закрытия в формах
const buttonCloseEdit = popupEdit.querySelector('.popup__close-button');
const buttonCloseImage = popupImage.querySelector('.popup__close-button');
const buttonCloseAdd = popupAdd.querySelector('.popup__close-button');
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
function renderCard() {
  //Находим лайки, картинки, текст карточек, корзину
  const cardsImg = document.querySelectorAll('.elements__image');
  const cardsTxt = document.querySelectorAll('.elements__text');
  const cardsLike = document.querySelectorAll('.elements__like');
  const cardsDelete = document.querySelectorAll('.elements__delete');
  //Даём картинкам карточкек обработчики событий для открытия вспл. окна
  cardsImg.forEach(function (item, index) {
  item.addEventListener('click', function () {
    popupImage.classList.add('popup_opened');
    //Получаем ссылку на изображение
    const imgAttribute = item.getAttribute('src');
    //Получаем текст карточки, где выбрано изображение
    const cardText = cardsTxt[index].textContent;
    //Передаём в вспл.окно ссылку на изобр.
    imageOpen.setAttribute('src', imgAttribute);
    //Передаём в вспл.окно текст
    textOpen.textContent = cardText;
  });
});
//Добавляет обработчик события (удаление карточки) к корзине
cardsDelete.forEach(function (item) {
  item.addEventListener('click', evt => evt.target.closest('.elements__element').remove());
});
//Добавляет обработчик события (добавление класса при клике) к лайкам
cardsLike.forEach(function (item) {
  item.addEventListener('click', evt => evt.target.classList.toggle('elements__like_active'));
});
};
//Создаём функцию сборки карточки
function assembleCard(cardArray) {
  const cardTemplate = document.querySelector('#card').content;
  const cardClone = cardTemplate.querySelector('.elements__element').cloneNode(true);
  const cardAbout = cardClone.querySelector('.elements__text');
  const cardImage = cardClone.querySelector('.elements__image');
  cardAbout.textContent = cardArray.name;
  cardImage.setAttribute('src', cardArray.link);
  cardImage.setAttribute('alt', cardArray.name);
  return cardClone
}
//Добавляем начальные карточки
initialCards.forEach(function (item) {
  const card = assembleCard(item);
  elementContainer.prepend(card);
});
renderCard();

//Открываем формы
function openFormEdit() {
  popupEdit.classList.add('popup_opened');
  //текст profile__name и profile__about в поле ввода
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}
function openFormAdd() {
  popupAdd.classList.add('popup_opened');
}

//Закрываем формы
function closeFormEdit() {
  popupEdit.classList.remove('popup_opened');
}
function closeFormAdd() {
  popupAdd.classList.remove('popup_opened');
}
function closeImage() {
  popupImage.classList.remove('popup_opened');
}

// Обработчики «отправки» формы
function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получите значение полей aboutInput и nameInput из свойства value
  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closeFormEdit();
}
function handleFormSubmitAdd (evt) {
  evt.preventDefault();
  const formArr = [ {
    name: '',
    link: ''
  } ];
  formArr.name = namingInput.value;
  formArr.link = linkInput.value;
  const formCard = assembleCard(formArr);
  elementContainer.prepend(formCard);
  renderCard();
  closeFormAdd();
}

//Обработчики открытия и закрытия формы
buttonEdit.addEventListener('click', openFormEdit);
buttonAdd.addEventListener('click', openFormAdd);
buttonCloseEdit.addEventListener('click', closeFormEdit);
buttonCloseImage.addEventListener('click', closeImage);
buttonCloseAdd.addEventListener('click', closeFormAdd);
// Прикрепляем обработчики к формам:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
formElementAdd.addEventListener('submit', handleFormSubmitAdd);

