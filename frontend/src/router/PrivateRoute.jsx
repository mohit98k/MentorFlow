import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuth = !!localStorage.getItem("accessToken");

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
