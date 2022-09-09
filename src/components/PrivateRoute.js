import React, { useEffect } from 'react';
import { Navigate, useNavigate, Outlet } from 'react-router-dom';
import { useUserDataContext } from '../context/userContext';

const PrivateRoute = ({ children, ...rest }) => {
  const { isLoggedIn } = useUserDataContext();

  if (!isLoggedIn) return <Navigate to={'/login'} replace />;

  return children;
};

export default PrivateRoute;
