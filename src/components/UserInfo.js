// отвечает за управление отображением информации о пользователе на странице
export class UserInfo {
  constructor(nameSelector, infoSelector, avatarSelector) {
    this._avatarElement = avatarSelector;
    this._nameElement = nameSelector;
    this._aboutElement = infoSelector;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._avatarElement.src = avatar;
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
  }

  setUserAvatar({ avatar }) {
    this._avatarElement.src = avatar;
  }
}
