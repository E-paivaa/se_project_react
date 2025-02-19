import React from "react";

const CurrentUserContext = React.createContext({
  currentUser: null,
  setCurrentUser: () => {},
});

export default CurrentUserContext;

