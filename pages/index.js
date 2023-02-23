// Находим область профиля и форму в DOM
let sectionProfile = document.querySelector('.profile');
let formElement = document.querySelector('.popup');
// Находим кнопки редактирования в профиле и закрытия в форме
let buttonEdit = sectionProfile.querySelector('.profile__edit-button');
let buttonClose = formElement.querySelector('.popup__close-button');
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__name');
let aboutInput = formElement.querySelector('.popup__about');
// Находим элементы, куда должны быть вставлены значения полей
let profileName = sectionProfile.querySelector('.profile__name');
let profileAbout = sectionProfile.querySelector('.profile__about');
//текст profile__name и profile__about в форме
nameInput.setAttribute('value', profileName.textContent);
aboutInput.setAttribute('value', profileAbout.textContent);
//Открываем форму
function openForm() {
  formElement.classList.add('popup_opened');
}
//Закрываем форму
function closeForm() {
  formElement.classList.remove('popup__opened');
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

