import React from 'react';
import { Navigate } from 'react-router-dom';


interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');
  console.log("entered")
  console.log("token", token)
  if (token) {
    return <>{children}</>;
  } else {
    console.log("token not found")
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
