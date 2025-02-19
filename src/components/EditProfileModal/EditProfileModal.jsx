import "./EditProfileModal.css";
import React, { useState, useEffect} from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext  from "../../utils/contexts/CurrentUserContext";

const EditProfileModal =({
    isOpen,
    handleEdit,
    onClose
}) => {
    const [name, setName] = useState("");
    const currentUser = React.useContext(CurrentUserContext);
    const [imageUrl, setImageUrl] = useState('');
   
    const handleNameChange = (e) => {
        console.log(e.target.value);
        setName(e.target.value);
    };
    const handleImageUrlChange = (e) => {
        console.log(e.target.value);
        setImageUrl(e.target.value);
    };

    useEffect(() => {
        if (isOpen) {
          setName("");
          setImageUrl("");
        }
      }, [isOpen]);


      useEffect(() => {
        if (isOpen) {
          setName(currentUser?.name || '');
          setImageUrl(currentUser?.avatar || '');
        }
      }, [isOpen, currentUser]);

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
        onSubmit={handleEditProfileSubmit}
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
                    onChange={handleNameChange}
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
                    onChange={handleImageUrlChange}
                />
            </label>
            <button type="submit" className="modal__save-changes-button">
                Save Changes
            </button>
        </ModalWithForm>
    );
};

export default EditProfileModal;