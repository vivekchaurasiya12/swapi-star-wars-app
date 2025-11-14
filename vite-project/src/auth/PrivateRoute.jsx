import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Spinner from "../components/Spinner";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, initialized } = useAuth();
  
  if (!initialized) {
    return <Spinner overlay />;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
