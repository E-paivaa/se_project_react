import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";

export default function AddItemModal({
  isOpen,
  onClose,
  onAddItemModalSubmit,
}) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };
  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };
  const handleAddSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit({ name, imageUrl, weather });
  };
  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeather("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="New Garment"
      isOpen={isOpen}
      onClose={onClose}
    >
      <label htmlFor="name" className="modal__label">
        Name{""}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          minLength="1"
          maxLength="30"
          required
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{""}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          minLength="1"
          required
          onChange={handleImageUrlChange}
          value={imageUrl}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend"> Select Weather Type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="radio"
            value="hot"
            className="modal__radio-input"
            id="hot"
            onChange={handleWeatherChange}
            checked={weather === "hot"}
          />
          {""}Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="radio"
            value="warm"
            className="modal__radio-input"
            id="warm"
            onChange={handleWeatherChange}
            checked={weather === "warm"}
          />
          {""}Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="radio"
            value="cold"
            className="modal__radio-input"
            id="cold"
            onChange={handleWeatherChange}
            checked={weather === "cold"}
          />
          {""}Cold
        </label>
      </fieldset>
      <button type="submit" className="modal__submit" onClick={handleAddSubmit}> Add Garment </button>
    </ModalWithForm>
  );
}
