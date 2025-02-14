import headerAvatar from "../../assets/avatar.png";
import "./SideBar.css";

function Sidebar({currentUser, onLogoutClick, OnEditClick}) {

  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={currentUser?.avatar || headerAvatar}
        alt="Default avatar"
        
      />
      <p className="sidebar__username">
        {currentUser?.name  || 'Placeholder'}
      </p>
      <div className="sidebar__log">
      <button className="sidebar__change" type="button" onClick={OnEditClick}>Change profile data</button>
      <button className="sidebar__logout" type="button" onClick={onLogoutClick}>Log Out</button>
      </div>
    </div>
  );
}

export default Sidebar;
