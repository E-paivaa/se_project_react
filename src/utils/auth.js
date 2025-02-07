
const baseUrl = "http://localhost:3001";
import { request } from "./api";

function addToStorage(res) {
    localStorage.setItem("jwt", res.token);
    return res.token;
}

const registerUser = (userData) => {
    return request(`${baseUrl}/signup/`, {
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
    })
}

const loginUser = (userData) => {
    const token = localStorage.getItem("jwt");
    return request(`${baseUrl}/signin/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
          },
        body: JSON.stringify({
            email: userData.email,
            password: userData.password,
        }),
    })
}

const verifyToken = (token) => {
    return request(`${baseUrl}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })    
 }


export {
    registerUser,
    loginUser,
    verifyToken
};