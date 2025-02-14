import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../utils/contexts/CurrentUserContext.js";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnit";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";

import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import {
  editUser, 
  removeCardLike, 
  addCardLike,
  deleteItems, 
  addItems,
  getItems
} from "../../utils/api";
import {
  registerUser,
  loginUser,
  verifyToken
} from "../../utils/auth.js";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ currentUser, setCurrentUser] = useState({});

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

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(currentUser === null);
    localStorage.clear();
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const toggleModal = () => {
    setActiveModal((prevModal) =>
      prevModal === "signup" ? "login" : "signup"
    );
  };

  function handleCardLike({ id, isLiked }) {
    console.log("Item ID:", id);
    const token = localStorage.getItem("jwt");
    return !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItem((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.item : item))
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItem((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.item : item))
            );
          })
          .catch((err) => console.log(err));
  }

  const navigate = useNavigate();

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
      addItems(name, imageUrl, weather)
      .then((values) => {
        setClothingItem([values, ...clothingItem]);
        closeActiveModal();
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteItem = (id) => {
     deleteItems(id)
      .then(() => {
        setClothingItem(clothingItem.filter((item) => item._id !== id));
        closeActiveModal();
      })
      .catch((error) => console.log(error));
  };

  const handleLogin = (values ) => {
        loginUser(values)
        .then((data) => {
          return verifyToken(data.token);
        })
        .then((currentUser) => {
          setCurrentUser(currentUser);
          setIsLoggedIn(true);
          closeActiveModal();
          navigate("/profile");
        })
        .catch((err) => console.error(err));
  };

  const handleRegistration = (values) => {
        registerUser(values)
        .then((res) => {
          console.log(res);
          closeActiveModal();
          handleLogin({ email: values.email, password: values.password });
        })
        .catch((err) => console.error(err));
  };

  const handleEdit = ({name, avatar, id, token}) => {
      editUser(name, avatar, id, token)
        .then((res) => {
          closeActiveModal();
          setCurrentUser(res);
        })
        .catch((err) => console.error(err));
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
    getItems()
      .then((data) => {
        setClothingItem(data.data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
        verifyToken(token)
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
              isLoggedIn={isLoggedIn}
              
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItem={clothingItem}
                    onCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                 <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    onClose={closeActiveModal}
                    OnEditClick={handleEditModal}
                    onCardClick={handleCardClick}
                    handleAddClick={handleAddClick}
                    clothingItem={clothingItem}
                    onLogoutClick={handleLogout}
                    isLoggedIn={isLoggedIn}
                    />
                    </ProtectedRoute>
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
            isOpen={activeModal === "signup"}
            onClose={closeActiveModal}
            handleRegistration={handleRegistration}
            onLoginClick={toggleModal}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            handleLogin={handleLogin}
            onSignUpClick={toggleModal}
          />
          <EditProfileModal
            isOpen={activeModal === "edit"}
            onClose={closeActiveModal}
            handleEdit={handleEdit}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
