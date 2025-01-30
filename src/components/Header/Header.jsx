import { Link } from "react-router-dom";
import headerLogo from "../../assets/logo.svg";
import headerAvatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import { CurrentUserContext } from "../../utils/contexts/CurrentUserContext";
import React, { useState, useEffect } from "react";

function Header({ handleAddClick, weatherData, onSignUpClick, onLoginClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { currentUser } = React.useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [currentUser]);

  return (
    <div className="header">
      <Link to="/">
        <img className="header__logo" src={headerLogo} alt="Weather logo" />
      </Link>
      <p className="header__date-location">
        {currentDate}, {weatherData.city}{" "}
      </p>
      <ToggleSwitch />
      {isLoggedIn ? (
        <>
          <button
            className="header__add-clothes"
            type="button"
            onClick={handleAddClick}
          >
            {" "}
            + Add clothes
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__user">
              <p className="header__username"> Edward Paiva</p>
              <img src={headerAvatar} alt="avatar" className="header__avatar" />
            </div>
          </Link>
        </>
      ) : (
        <>
          <button className="modal__button" onClick={onSignUpClick}>
            Sign Up
          </button>
          <button className="modal__button" onClick={onLoginClick}>
            Log In
          </button>
        </>
      )}
    </div>
  );
}

export default Header;
