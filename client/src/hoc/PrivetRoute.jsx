import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const hasAccess = (userRole, allowedRoles) => {
  return allowedRoles.includes(userRole);
};

const PrivateRoute = ({ element, allowedRoles }) => {
  const { user, isAuth } = useSelector((state) => state.auth);
  const userRole = user?.role;

  if (!isAuth || (allowedRoles && !hasAccess(userRole, allowedRoles))) {
    return <Navigate to="/" />;
  }

  return element;
};

export default PrivateRoute;
