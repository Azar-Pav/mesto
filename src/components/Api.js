
//отвечает за взаимодействие с сервером
export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _resulting(res) {
    if (res.ok) {
      return res.json()
    } else {

      return Promise.reject(`Ошибка: ${res.status}`)
    }
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then((res) => {
        return this._resulting(res)
      });
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then((res) => {
        return this._resulting(res)
      });
  }

  patchUser({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, about })
    })
      .then((res) => {
        return this._resulting(res)
      });
  }

  patchUserAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar })
    })
      .then((res) => {
        return this._resulting(res)
      });
  }

  sendCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link })
    })
      .then((res) => {
        return this._resulting(res)
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => {
        return this._resulting(res)
      });
  }

  getLikes(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: this._headers
    })
      .then((res) => {
        return this._resulting(res)
      });
  }

  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then((res) => {
        return this._resulting(res)
      });
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => {
        return this._resulting(res)
      });
  }
  /*
  GET https://nomoreparties.co/v1/cohort-68/users/me
  {
  "name": "Jacques Cousteau",
  "about": "Sailor, researcher",
  "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
  "_id": "e20537ed11237f86bbb20ccb",
  "cohort": "cohort0"
}

GET ${this._baseUrl}/cards
[
  {
    "likes": [],
    "_id": "5d1f0611d321eb4bdcd707dd",
    "name": "Байкал",
    "link": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    "owner": {
      "name": "Jacques Cousteau",
      "about": "Sailor, researcher",
      "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
      "_id": "ef5f7423f7f5e22bef4ad607",
      "cohort": "local"
    },
    "createdAt": "2019-07-05T08:10:57.741Z"
  },
  {
    "likes": [],
    "_id": "5d1f064ed321eb4bdcd707de",
    "name": "Архыз",
    "link": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    "owner": {
      "name": "Jacques Cousteau",
      "about": "Sailor, researcher",
      "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
      "_id": "ef5f7423f7f5e22bef4ad607",
      "cohort": "local"
    },
    "createdAt": "2019-07-05T08:11:58.324Z"
  }
]
*/
}


