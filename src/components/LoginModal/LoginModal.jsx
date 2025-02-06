import "./LoginModal.css";
import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({
    isOpen,
    onClose,
    onSignUpClick,
    handleLogin
}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   
    const handlePasswordChange = (e) => {
        console.log(e.target.value);
        setPassword(e.target.value);
    };
    const handleEmailChange = (e) => {
        console.log(e.target.value);
        setEmail(e.target.value);
    };
 
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        handleLogin(email, password);
    };

    useEffect(() => {
        if (isOpen) {
          setEmail("");
          setPassword("");
        }
      }, [isOpen]);

    return (
        <ModalWithForm
        title="Log in"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleLoginSubmit}
        >
            <div className="modal__text-deco">
            <label>
                Email 
                <input
                type="email"
                name="email"
                minLength="1"
                maxLength="30"
                placeholder="Email"
                required
                value={email}
                onChange={handleEmailChange}
                className="modal__input"
                />
            </label>
            <label>
                Password 
                <input
                type="password"
                name="password"
                minLength="1"
                placeholder="Password"
                required
                value={password}
                onChange={handlePasswordChange}
                className="modal__input"
                />
            </label>
            <div className="modal__button-div">
            <button type="submit" className="modal__button-login">
                {" "}
                 Log In
            </button>

            or
            
            <button type="button" className="modal__button-signup" onClick={onSignUpClick}>
                Sign Up
                {" "}
            </button>
            </div>
            </div>
        </ModalWithForm>
    );
};

export default LoginModal;