import "./ItemModal.css";
import { CurrentUserContext } from "../../utils/contexts/CurrentUserContext";

function ItemModal({ item, onClose, isOpen, handleDeleteItem}) {
  const isOwn = item.owner === CurrentUserContext._id;
  const itemDeleteModal = (
    `modal__delete-button ${isOwn ? '' : 'modal__delete-button_hidden'}`
  );
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
          <button
            type="button"
            className={itemDeleteModal}
            onClick={() => handleDeleteItem(item._id)}
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
