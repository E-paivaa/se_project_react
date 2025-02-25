import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import React from "react";

function ItemCard({ item, onCardClick, onCardLike }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const { currentUser } = React.useContext(CurrentUserContext);

  const isLiked = currentUser
    ? item.likes.some((id) => id === currentUser._id)
    : false;

  const handleLike = () => {
    const newLikes = [...item.likes];
    if (isLiked) {
      const index = newLikes.indexOf(currentUser._id);
      if (index !== -1) newLikes.splice(index, 1);
    } else {
      newLikes.push(currentUser._id);
    }
    onCardLike({ id: item._id, isLiked: isLiked }).catch((err) => {
      console.error("Error toggling like:", err);
    });
  };

  const itemLikeButtonClassName = isLiked
    ? "card__like card__like_active"
    : "card__like";

  return (
    <li className="card">
      <div className="card__container">
        <h2 className="card__name"> {item.name} </h2>
        {currentUser ? (
          <button
            className={itemLikeButtonClassName}
            onClick={handleLike}
            type="button"
          ></button>
        ) : (
          <></>
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
