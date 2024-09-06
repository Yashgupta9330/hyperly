import { RootState } from '@/store/store';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


interface PrivateRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = useSelector((state: RootState) => state.token);

  if (token.token===null) {
    return <>{children}</>; 
  } else {
    return <Navigate to="/" />;
  }
};

export default PublicRoute;