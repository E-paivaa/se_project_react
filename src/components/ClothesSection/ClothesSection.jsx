import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import React from "react";

function ClothesSection({
  onCardClick,
  clothingItem,
  handleAddClick,
  onCardLike,
}) {
  const { currentUser } = React.useContext(CurrentUserContext);
  const userItem =
    currentUser && currentUser._id
      ? clothingItem.filter((item) => item.owner === currentUser._id)
      : [];
  return (
    <div className="clothes-section">
      <div className="clothes__section-content">
        <p className="clothes__section-text">Your items</p>
        <button
          type="button"
          onClick={handleAddClick}
          className="clothes__section-add"
        >
          {" "}
          + Add new
        </button>
      </div>
      <ul className="cards__list">
        {userItem.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
