const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

const getItems = () => {
  return request(`${baseUrl}/items`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
};

const addItems = ( name, imageUrl, weather, token ) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  })
};

const deleteItems = (_id) => {
  const token = localStorage.getItem("jwt");
  return request(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
};

const addCardLike = (id, token) => {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
};

const removeCardLike = (id, token) => {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
};

const editUser = (name, imageUrl, token) => {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
      body: JSON.stringify({
        name,
        avatar: imageUrl,
      }),
  })
};

export {
  baseUrl,
  checkResponse,
  request,
  editUser, 
  removeCardLike, 
  addCardLike,
  deleteItems, 
  addItems,
  getItems
};


