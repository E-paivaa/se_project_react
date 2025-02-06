
const baseUrl = "http://localhost:3001";
import { checkResponse } from "./api";

function addToStorage(res) {
    localStorage.setItem("jwt", res.token);
    return res.token;
}

function registerUser(userData) {
    return fetch(`${baseUrl}/signup/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
            name:userData.name,
            avatar:userData.avatar,
            email:userData.email,
            password:userData.password,
            }),
    }).then(checkResponse);
}

function loginUser(userData) {
    return fetch(`${baseUrl}/signin/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
            email: userData.email,
            password: userData.password,
        }),
    })
    .then(checkResponse)
    .then(addToStorage);
}

function verifyToken(token) {
    return fetch(`${baseUrl}/signout/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    }).then(checkResponse);    
 }


export {
    registerUser,
    loginUser,
    verifyToken
};