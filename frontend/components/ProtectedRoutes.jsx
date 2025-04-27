import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "../slices/authSlice";
import { isTokenExpired } from "../utils/utils";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { token, isAuthenticated } = useSelector((state) => state.auth);

  // Local flag to know if user is allowed in
  const shouldRedirect = !token || isTokenExpired(token);

  useEffect(() => {
    if (shouldRedirect) {
      dispatch(logout());
    }
  }, [shouldRedirect, dispatch]);

  if (shouldRedirect) {
    return <Navigate to="/" />;
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
