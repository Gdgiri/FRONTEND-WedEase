import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthenticatedRoute = ({ element }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default AuthenticatedRoute;
