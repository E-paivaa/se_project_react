import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const [isLiked, setIsLiked] = useState(
    item.likes.some((id) => id === currentUser?.user?._id)
  );

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked: isLiked })
      .then(() => {
        setIsLiked(!isLiked);
      })
      .catch((err) => {
        console.error("Error toggling like:", err);
      });
  };

  const itemLikeButtonClassName = isLiked
  ? "card__like card__like_active"
  : "card__like";

  return (
    <li className="card">
      <h2 className="card__name"> {item.name} </h2>
      {isLoggedIn ? (
          <button
            className={itemLikeButtonClassName}
            onClick={handleLike}
            type="button"
          ></button>
        ) : (
          <></>
        )}
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
