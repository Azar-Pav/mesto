// Находим область профиля и форму в DOM
let sectionProfile = document.querySelector('.profile');
let popupElement = document.querySelector('.popup');
let formElement = popupElement.querySelector('.popup__edit-form');
// Находим кнопки редактирования в профиле и закрытия в форме
let buttonEdit = sectionProfile.querySelector('.profile__edit-button');
let buttonClose = popupElement.querySelector('.popup__close-button');
// Находим поля формы в DOM
let nameInput = popupElement.querySelector('.popup__text-field[name="name"]');
let aboutInput = popupElement.querySelector('.popup__text-field[name="about"]');
// Находим элементы, куда должны быть вставлены значения полей
let profileName = sectionProfile.querySelector('.profile__name');
let profileAbout = sectionProfile.querySelector('.profile__about');
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

