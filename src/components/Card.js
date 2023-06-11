export class Card {
  constructor (
    { name, link, _id, likes, owner },
    cardTemplate,
    userId,
    openImage,
    openConfirm,
    likeCard) {
    this._cardTemplate = cardTemplate;
    this._cardName = name;
    this._cardLink = link;
    this._cardLikes = likes.length;
    this._cardLikers = likes;
    if (_id) {
      this._cardId = _id
    }
    this._userId = userId;
    if (owner) {
      this._ownerId = owner._id;
    }
    this._openImage = openImage;
    this._openConfirm = openConfirm;
    this._likeCard = likeCard;
  };

  //Создаём функцию слушателей карточек
  _setCardListeners() {
    //Находим лайки, картинки, текст карточек, корзину
    this._cardImg = this._cardClone.querySelector('.elements__image');
    this._cardLike = this._cardClone.querySelector('.elements__like');
    this._likeCounter = this._cardClone.querySelector('.elements__like-counter');
    this._cardsDelete = this._cardClone.querySelector('.elements__delete');
    //Даём картинкам карточкек обработчики событий для открытия вспл. окна
    this._cardImg.addEventListener('click', () => this._openImage(
      {
        src: this._cardLink,
        alt: this._cardName
      })
    );

    //Добавляет обработчик события (удаление карточки) к корзине
    this._cardsDelete.addEventListener('click', () => this._openConfirm(this, this._cardId));

    //Добавляет обработчик события (переключение класса при клике) к лайкам
    this._cardLike.addEventListener('click', () => this._likeCard(
        this._cardLike,
        this._likeCounter,
        this,
        this._cardId
      ));
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
   this._getTemplate();
   const cardAbout = this._cardClone.querySelector('.elements__text');
   const cardImage = this._cardClone.querySelector('.elements__image');
   const likeCounter = this._cardClone.querySelector('.elements__like-counter');
   cardAbout.textContent = this._cardName;
   cardImage.setAttribute('src', this._cardLink);
   cardImage.setAttribute('alt', this._cardName);
   likeCounter.textContent = this._cardLikes;
   this._setCardListeners(this._cardClone);
   this._hiddenTrash();
   this._visibleLike()
   return this._cardClone
 };

 _visibleLike() {
  this._cardLikers.forEach( (liker) => {
    if (liker._id === this._userId) {
      this.toggleLike();
    }
  })
}
 _hiddenTrash() {
   if (this._ownerId != this._userId) {
    this._cardsDelete = this._cardClone.querySelector('.elements__delete');
    this._cardsDelete.remove();
  }
 }
}
