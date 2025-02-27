import "./ItemModal.css";
import React from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ item, onClose, isOpen, handleDeleteItem }) {
  const { currentUser } = React.useContext(CurrentUserContext);

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content_type_image">
        <button type="button" className="modal__close" onClick={onClose}>
          X
        </button>
        <img src={item.imageUrl} alt={item.name} className="modal__image" />

        <div className="modal__footer">
          <h2 className="modal__description">{item.name}</h2>
          <p className="modal__weather"> Weather: {item.weather}</p>
          {currentUser ? (
            <button
              type="button"
              className="modal__delete-button"
              onClick={() => handleDeleteItem(item)}
            >
              Delete Item
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
