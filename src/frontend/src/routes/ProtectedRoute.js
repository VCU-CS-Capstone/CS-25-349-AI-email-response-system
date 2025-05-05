import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// Protected Route component
const ProtectedRoute = ({ element: Component }) => {
  const isAuthenticated = localStorage.getItem("authToken");
  const location = useLocation(); // Get the current location for redirect

  return isAuthenticated ? (
    <Component />
  ) : (
    <Navigate to="/login" state={{ redirect: location.pathname }} />
  );
};

export default ProtectedRoute;
