import { Navigate } from "react-router-dom";

function ProtectRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
}

export default ProtectRoute;