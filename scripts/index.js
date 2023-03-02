// Находим область профиля и форму в DOM
const sectionProfile = document.querySelector('.profile');
const popupElement = document.querySelector('.popup');
const formElement = popupElement.querySelector('.popup__edit-form');
// Находим кнопки редактирования в профиле и закрытия в форме
const buttonEdit = sectionProfile.querySelector('.profile__edit-button');
const buttonClose = popupElement.querySelector('.popup__close-button');
// Находим поля формы в DOM
const nameInput = popupElement.querySelector('.popup__text-field[name="name"]');
const aboutInput = popupElement.querySelector('.popup__text-field[name="about"]');
// Находим элементы, куда должны быть вставлены значения полей
const profileName = sectionProfile.querySelector('.profile__name');
const profileAbout = sectionProfile.querySelector('.profile__about');
//Находим лайки
const cardsLike = document.querySelectorAll('.elements .elements__like');
//Находим картинки
const cardsImg = document.querySelectorAll('.elements .elements__image');

//Открываем форму
function openForm() {
  popupElement.classList.add('popup_opened');
  //текст profile__name и profile__about в поле ввода
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}
//Закрываем форму
function closeForm() {
  popupElement.classList.remove('popup_opened');
}
// Обработчик «отправки» формы
function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получите значение полей aboutInput и nameInput из свойства value
  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closeForm();
}
//Обработчики открытия и закрытия формы
buttonEdit.addEventListener('click', openForm);
buttonClose.addEventListener('click', closeForm);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
//Добавляет обработчик событий к лайкам
cardsLike.forEach(function (item) {
  item.addEventListener('click', evt => evt.target.classList.toggle('elements__like_active'));
});

