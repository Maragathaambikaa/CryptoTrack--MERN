import React from "react";
import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const PrivateRoute = ({ element }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
