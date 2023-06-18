import React from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  if (sessionStorage.getItem("loggedUserId")) {
    return children;
  }
  return <Navigate to="/" />;
};

export default ProtectedRoute;
