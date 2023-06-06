// отвечает за управление отображением информации о пользователе на странице
export class UserInfo {
  constructor(nameSelector, infoSelector) {
    this._nameElement = nameSelector;
    this._aboutElement = infoSelector;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent
    };
  }

  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
  }
}
