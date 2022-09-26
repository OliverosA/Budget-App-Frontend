import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/auth/auth-context";

const PrivateRoute = ({ children, ...rest }) => {
  const authCtx = useContext(AuthContext);

  if (authCtx.isLoggedIn) return children;

  return <Navigate to={"/login"} replace />;
};

export default PrivateRoute;
