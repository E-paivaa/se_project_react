import "./RegisterModal.css";
import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({
    activeModal,
    handleRegistration,
    onLoginClick,
    onSignUpClick,
    onClose
}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const handleNameChange = (e) => {
        console.log(e.target.value);
        setName(e.target.value);
    };
    const handlePasswordChange = (e) => {
        console.log(e.target.value);
        setPassword(e.target.value);
    };
    const handleEmailChange = (e) => {
        console.log(e.target.value);
        setEmail(e.target.value);
    };
    const handleAvatarChange = (e) => {
        console.log(e.target.value);
        setAvatar(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegistration(name, email, password, avatar);
    };

    useEffect(() => {
        if (activeModal) {
          setName("");
          setAvatar("");
          setPassword("");
          setEmail("");
        }
      }, [activeModal]);

    return (
        <ModalWithForm
        title="Sign up"
        isOpen={activeModal === "signup"}
        onClose={onClose}
        onSubmit={handleSubmit}
        >
            <div className="modal__text-deco">
            <label>
                Email *
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
                Password *
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
            <label>
                Name * 
                <input 
                className ="modal__input"
                type="text"
                name="Name"
                minLength="1"
                maxLength="30"
                placeholder="Name"
                required
                value={name}
                onChange={handleNameChange}
                />
            </label>
            <label>
                Avatar URL *
                <input
                type="url"
                name="avatar"
                placeholder="Avatar URL"
                value={avatar}
                required
                onChange={handleAvatarChange}
                className="modal__input"
                />
            </label>
            <div className="modal__button-div">
            <button type="submit" className="modal__button-sign-up" onClick={onSignUpClick}>
                Sign Up
                {" "}
            </button>

            or
            
            <button type="submit" className="modal__button-log-in" onClick={onLoginClick}>
                {" "}
                 Log In
            </button>
            </div>
            </div>
        </ModalWithForm>
    );
};

export default RegisterModal;