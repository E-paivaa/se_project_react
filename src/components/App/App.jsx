import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnit";
import AddItemModal from "../AddItemModal/AddItemModal";
// import { ClothingItems } from "../../utils/constants";
import Profile from "../Profile/Profile";
import Api from "../../utils/api";
import { CurrentUserContext } from "../../utils/contexts/CurrentUserContext.js";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import Auth from "../../utils/auth.js";

const auth = new Auth({
  baseUrl: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

const api = new Api({
  baseUrl: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    city: "",
    temp: { F: 333, C: 333 },
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItem, setClothingItem] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [ setCurrentUser] = useState("");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = (e) => {
    e.preventDefault();
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleRegisterModal = () => {
    setActiveModal("signup");
  };

  const handleLoginModal = () => {
    setActiveModal("login");
  };

  const handleEditModal = () => {
    setActiveModal("edit");
  };

  const toggleModal = () => {
    setActiveModal((prevModal) =>
      prevModal === "signup" ? "login" : "signup"
    );
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    api
      .addItems(name, imageUrl, weather)
      .then((values) => {
        setClothingItem([values, ...clothingItem]);
        closeActiveModal();
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteItem = (id) => {
    api
      .deleteItems(id)
      .then(() => {
        setClothingItem(clothingItem.filter((item) => item._id !== id));
        closeActiveModal();
      })
      .catch((error) => console.log(error));
  };

  const handleRegistration = ({ name, avatar, email, password }) => {
    if (name && avatar && email && password) {
      auth
        .registerUser({ name, avatar, email, password })
        .then((res) => {
          console.log(res);
          closeActiveModal();
        })
        .catch((err) => console.error(err));
    }
  };

  const handleLogin = ({ email, password }) => {
    if (email && password) {
      auth
        .loginUser({ email, password })
        .then((token) => {
          return auth.verifyToken(token);
        })
        .then((currentUser) => {
          setCurrentUser(currentUser);
          closeActiveModal();
          setIsLoggedIn(true);
        })
        .catch((err) => console.error(err));
    }
  };

  const handleEdit = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    if (name && avatar) {
      api
        .editUser(token, name, avatar)
        .then((res) => {
          closeActiveModal();
          setCurrentUser(res);
        })
        .catch((err) => console.error(err));
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(currentUser === null);
    localStorage.removeItem("jwt");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    api
      .getItems()
      .then((data) => {n
        setClothingItem(data.data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .verifyToken(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              onSignUpClick={handleRegisterModal}
              onLoginClick={handleLoginModal}
              
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItem={clothingItem}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  isLoggedIn ?
                  (
                  <Profile
                    onClose={closeActiveModal}
                    OnEditClick={handleEditModal}
                    onCardClick={handleCardClick}
                    handleAddClick={handleAddClick}
                    clothingItem={clothingItem}
                    onLogoutClick={handleLogout}
                    value={currentUser}
                    />) : <Navigate to="/" />
                }
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          />
          <ItemModal
            item={selectedCard}
            onClose={closeActiveModal}
            isOpen={activeModal === "preview"}
            handleDeleteItem={handleDeleteItem}
          />
          <RegisterModal
            activeModal={activeModal}
            onClose={closeActiveModal}
            handleRegistration={handleRegistration}
            // handleLogin={handleLogin}
            onCreateModal={handleRegisterModal}
            onLoginClick={toggleModal}
          />
          <LoginModal
            activeModal={activeModal}
            onClose={closeActiveModal}
            handleLogin={handleLogin}
            onCreateModal={handleLoginModal}
            onSignUpClick={toggleModal}
          />
          <EditProfileModal
            activeModal={activeModal}
            onClose={closeActiveModal}
            handleEdit={handleEdit}
            onSubmit={handleEdit}
            onCreateModal={handleEditModal}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
