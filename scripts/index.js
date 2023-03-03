// Находим область профиля и форму в DOM
const sectionProfile = document.querySelector('.profile');

const popupEdit = document.querySelector('.popup_type-js_edit');
const popupImage = document.querySelector('.popup_type-js_image');
//const popupAdd = document.querySelector('.popup_type-js_add');

const formElement = popupEdit.querySelector('.popup__edit-form');
//const formElementAdd = popupAdd.querySelector('.popup__edit-form');
// Находим кнопки редактирования в профиле и закрытия в форме
const buttonEdit = sectionProfile.querySelector('.profile__edit-button');
const buttonCloseEdit = popupEdit.querySelector('.popup__close-button');
const buttonCloseImage = popupImage.querySelector('.popup__close-button');
//const buttonCloseAdd = popupEdit.querySelector('.popup__close-button');
// Находим поля формы в DOM
const nameInput = popupEdit.querySelector('.popup__text-field[name="name"]');
const aboutInput = popupEdit.querySelector('.popup__text-field[name="about"]');
// Находим элементы, куда должны быть вставлены значения полей
const profileName = sectionProfile.querySelector('.profile__name');
const profileAbout = sectionProfile.querySelector('.profile__about');
const cards = document.querySelectorAll('.elements .elements__element')
//Находим лайки
const cardsLike = document.querySelectorAll('.elements .elements__like');
//Находим картинки
const cardsImg = document.querySelectorAll('.elements .elements__image');
const cardsTxt = document.querySelectorAll('.elements .elements__text');
const imageOpen = popupImage.querySelector('.popup__image');
const textOpen = popupImage.querySelector('.popup__card-text');
//Открываем формы
function openFormEdit() {
  popupEdit.classList.add('popup_opened');
  //текст profile__name и profile__about в поле ввода
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}


//Закрываем формы
function closeFormEdit() {
  popupEdit.classList.remove('popup_opened');
}

function closeImage() {
  popupImage.classList.remove('popup_opened');
}

// Обработчик «отправки» формы
function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получите значение полей aboutInput и nameInput из свойства value
  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closeFormEdit();
}
//Обработчики открытия и закрытия формы
buttonEdit.addEventListener('click', openFormEdit);

cardsImg.forEach(function (item, index) {
  item.addEventListener('click', function () {
    popupImage.classList.add('popup_opened');

    const imgAttribute = item.getAttribute('src');

    const cardText = cardsTxt[index].textContent;

    imageOpen.setAttribute('src', imgAttribute);

    textOpen.textContent = cardText;
  });
});

buttonCloseEdit.addEventListener('click', closeFormEdit);
buttonCloseImage.addEventListener('click', closeImage);
//buttonCloseEdit.addEventListener('click', closeFormEdit);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
//Добавляет обработчик события (добавление класса при клике) к лайкам
cardsLike.forEach(function (item) {
  item.addEventListener('click', evt => evt.target.classList.toggle('elements__like_active'));
});

