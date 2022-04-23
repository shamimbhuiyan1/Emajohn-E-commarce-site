import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../firebase.init";

const RequireAuth = ({ children }) => {
  //to get auth from react firebase hooks.
  const [user] = useAuthState(auth);
  const location = useLocation();

  //user thakle ei funtion er modde dukbe.na thakle null dekhave. r app.js e requieAuth er modde jake private korte cai take dechi othath "inventory "dewa hoiche.
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
  return children;
};

export default RequireAuth;
