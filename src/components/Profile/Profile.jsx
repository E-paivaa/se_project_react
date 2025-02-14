import "./Profile.css";
import Sidebar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ onCardClick, clothingItem, handleAddClick, currentUser, onLogoutClick, OnEditClick, onClose, onCardLike }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar value={currentUser} onLogoutClick={onLogoutClick} OnEditClick={OnEditClick} onClose={onClose}/>
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItem={clothingItem}
          handleAddClick={handleAddClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
