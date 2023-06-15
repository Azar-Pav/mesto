export class Card {
  constructor (
    { name, link, _id, likes, owner },
    cardTemplate,
    userId,
    handleImageClick,
    handleDeleteClick,
    likeCard
    )
    {
    this._cardTemplate = cardTemplate;
    this._cardName = name;
    this._cardLink = link;
    if (likes) {
      this._cardLikes = likes.length;
      this._cardLikers = likes;
    }
    if (_id) {
      this._cardId = _id
    }
    this._userId = userId;
    if (owner) {
      this._ownerId = owner._id;
    }
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._likeCard = likeCard;
  };

  //Создаём функцию слушателей карточек
  _setCardListeners() {
    //Находим лайки, корзину
    this._cardLike = this._cardClone.querySelector('.elements__like');
    this._cardsDelete = this._cardClone.querySelector('.elements__delete');
    //Даём картинкам карточкек обработчики событий для открытия вспл. окна
    this._cardImg.addEventListener('click', () => this._handleImageClick(
      {
        src: this._cardLink,
        alt: this._cardName
      })
    );

    //Добавляет обработчик события (удаление карточки) к корзине
    this._cardsDelete.addEventListener('click', () => this._handleDeleteClick(this, this._cardId));

    //Добавляет обработчик события (переключение класса при клике) к лайкам
    this._cardLike.addEventListener('click', () => this._likeCard(
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

  isLiked() {
    return this._cardLike.classList.contains('elements__like_active')
  }

  setLikesCount(number) {
    this._likeCounter.textContent = number;
  }

  _getTemplate() {
    this._cardClone =  this._cardTemplate.querySelector('.elements__element').cloneNode(true);
  };

  _checkIsLikedByUser() {
    if (this._cardLikers) {
      this._cardLikers.forEach( (liker) => {
        if (liker._id === this._userId) {
          this.toggleLike();
        }
      })
    }
  }
  _checkTrashVisibility() {
    if (this._ownerId !== this._userId) {
      this._cardsDelete = this._cardClone.querySelector('.elements__delete');
      this._cardsDelete.remove();
    }
  }
  //Создаём функцию сборки карточки
  assembleCard() {
    this._getTemplate();
    const cardAbout = this._cardClone.querySelector('.elements__text');
    this._cardImg = this._cardClone.querySelector('.elements__image');
    this._likeCounter = this._cardClone.querySelector('.elements__like-counter');
    cardAbout.textContent = this._cardName;
    this._cardImg.src = this._cardLink;
    this._cardImg.alt = this._cardName;
    this._likeCounter.textContent = this._cardLikes;
    this._setCardListeners();
    this._checkTrashVisibility();
    this._checkIsLikedByUser();
    return this._cardClone
  };
}
