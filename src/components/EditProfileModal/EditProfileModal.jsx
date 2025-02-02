import "./EditProfileModal.css";
import { useState, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../utils/contexts/CurrentUserContext";

const EditProfileModal =({
    isOpen,
    handleEdit,
    onClose
}) => {
    const [name, setName] = useState("");
    const { currentUser } = useContext(CurrentUserContext);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (isOpen) {
            setName(currentUser?.name);
            setImageUrl(currentUser?.avatar);
        }
    }, [isOpen]);

    const handleEditProfileSubmit = (e) => {
        e.preventDefault();
        handleEdit({name, avatar: imageUrl});
    };

    return (
        <ModalWithForm
        title="Change Profile Data"
        buttonText="Save Changes"
        isOpen={isOpen}
        onClose={onClose}
        >
            <label>
                Name * 
                <input
                    className="modal__input"
                    type="text"
                    name="name"
                    minLength="1"
                    maxLength="30"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label>
                Avatar URL *
                <input
                    className="modal__input"
                    type="url"
                    name="link"
                    minLength="1"
                    placeholder="Avatar URL"
                    required
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
            </label>
            <button type="button" className="modal__save-changes-button" onClick={handleEditProfileSubmit}>
                Save Changes
            </button>
        </ModalWithForm>
    );
};

export default EditProfileModal;