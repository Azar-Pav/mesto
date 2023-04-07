export class Card {
  constructor (cardData, cardTemplate, openImage) {
    this._cardTemplate = cardTemplate;
    this._cardName = cardData.name;
    this._cardLink = cardData.link;
    this._openImage = openImage;
  };

  //Создаём функцию слушателей карточек
  _setCardListeners() {
    //Находим лайки, картинки, текст карточек, корзину
    this._cardImg = this._cardClone.querySelector('.elements__image');
    this._cardLike = this._cardClone.querySelector('.elements__like');
    this._cardsDelete = this._cardClone.querySelector('.elements__delete');
    //Даём картинкам карточкек обработчики событий для открытия вспл. окна
    this._cardImg.addEventListener('click', () => this._openImage(this._cardClone));

    //Добавляет обработчик события (удаление карточки) к корзине
    this._cardsDelete.addEventListener('click', () => this.removeCard());

    //Добавляет обработчик события (переключение класса при клике) к лайкам
    this._cardLike.addEventListener('click', () => this.toggleLike());
  };
  //Переключение класса к лайкам
  toggleLike() {
    this._cardLike.classList.toggle('elements__like_active');
  };
  //удаление карточки
  removeCard() {
    this._cardClone.remove();
    this._cardClone = null;
  };

  _getTemplate() {
    this._cardClone =  this._cardTemplate.querySelector('.elements__element').cloneNode(true);
  };
 //Создаём функцию сборки карточки
 assembleCard() {
  //this._cardClone = this._cardTemplate.querySelector('.elements__element').cloneNode(true);
  this._getTemplate();
   const cardAbout = this._cardClone.querySelector('.elements__text');
   const cardImage = this._cardClone.querySelector('.elements__image');
   cardAbout.textContent = this._cardName;
   cardImage.setAttribute('src', this._cardLink);
   cardImage.setAttribute('alt', this._cardName);
   this._setCardListeners(this._cardClone);
   return this._cardClone
 };

}
