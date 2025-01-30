
class Auth {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
}

_checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
}

_addToStorage(res) {
    localStorage.setItem("jwt", res.token);
    return res.token;
}

registerUser({ name, avatar, email, password }) {
    return fetch(this.baseUrl + "/signup/", {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
            name,
            avatar,
            email,
            password
            }),
    }).then(this._checkResponse);
}

loginUser({ email, password }) {
    return fetch(this.baseUrl + "/signin/", {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
            email,
            password
        }),
    })
    .then(this._checkResponse)
    .then(this._addToStorage);
}

verifyToken(token) {
    return fetch(this.baseUrl + "/signout/", {
        method: "POST",
        headers: {
            ...this._headers,
            Authorization: `Bearer ${token}`
        },
    }).then(this._checkResponse);    
 }
}

export default Auth;