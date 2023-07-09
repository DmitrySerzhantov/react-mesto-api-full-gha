export class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(this._url + 'cards', {
      headers: this._headers,
      credentials: 'include',
    }).then((res) => {
      return this._checkStatus(res);
    });
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  setInitialNewCard(data) {
    return fetch(this._url + 'cards', {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => {
      return this._checkStatus(res);
    });
  }

  getUserProfile() {
    return fetch(this._url + 'user/me', {
      headers: this._headers,
      credentials: 'include',
    }).then((res) => {
      return this._checkStatus(res);
    });
  }
  setUserProfile(data) {
    return fetch(this._url + 'user/me', {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => {
      return this._checkStatus(res);
    });
  }
  deleteCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    }).then((res) => {
      return this._checkStatus(res);
    });
  }

  likeCard(id) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
      credentials: 'include',
    }).then((res) => {
      return this._checkStatus(res);
    });
  }

  deleteLikeCard(id) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    }).then((res) => {
      return this._checkStatus(res);
    });
  }
  setUserAvatar(data) {
    return fetch(this._url + 'user/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => {
      return this._checkStatus(res);
    });
  }
}
const api = new Api({
  url: 'http://localhost:3000/',
  credentials: 'include',
  headers: {
    'content-type': 'application/json',
    authorization: 'fa3f79ad-41aa-4ce4-b408-a913152be61d',
  },
});
export default api;
