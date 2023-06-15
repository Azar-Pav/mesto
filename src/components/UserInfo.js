// отвечает за управление отображением информации о пользователе на странице
export class UserInfo {
  constructor(nameElement, infoElement, avatarElement) {
    this._avatar = avatarElement;
    this._name = nameElement;
    this._about = infoElement;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src
    };
  }

  setUserInfo({ name, about, avatar }) {
    if (avatar) {
      this._avatar.src = avatar;
    }
    if (name) {
      this._name.textContent = name;
    }
    if (about) {
      this._about.textContent = about;
    }
  }

}
