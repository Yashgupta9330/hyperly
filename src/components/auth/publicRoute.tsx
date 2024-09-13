import React from 'react';
import { Navigate } from 'react-router-dom';


interface PrivateRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');
  console.log("entered")
  console.log("token", token)

  if (token === null) {
    return <>{children}</>;
  } else {
    return <Navigate to="/" />;
  }
};

export default PublicRoute;