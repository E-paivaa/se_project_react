class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
  }

  getItems() {
    return fetch(this.baseUrl + "/items", {
      method: "GET",
    }).then(this._checkResponse);
  }

  addItems({ name, link, weather }) {
    const token = localStorage.getItem("jwt");
    return fetch(this.baseUrl + "/items", {
      method: "POST",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        link,
        weather,
      }),
    }).then(this._checkResponse);
  }

  deleteItems(id) {
    const token = localStorage.getItem("jwt");
    return fetch(this.baseUrl + "/items/" + id, {
      method: "DELETE",
      headers:{ 
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  addCardLike(id, token) {
    return fetch(this.baseUrl + "/items/" + id + "/likes", {
      method: "PUT",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
        },
    }).then(this._checkResponse);
  }

  removeCardLike(id, token) {
    return fetch(this.baseUrl + "/items/" + id + "/likes", {
      method: "DELETE",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
        },
    }).then(this._checkResponse);
  }

  editUser(token, name, avatar) {
    return fetch(this.baseUrl + "/users/me", {
      method: "PATCH",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          avatar,
        }),
    }).then(this._checkResponse);
  }
}

export default Api;