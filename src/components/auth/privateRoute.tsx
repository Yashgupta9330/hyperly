import { RootState } from '@/store/store';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = useSelector((state: RootState) => state.token);
  const userData = useSelector((state: any) => state.user);
  console.log("entered")
  console.log("token",token)
  console.log("userdata",userData)
  if (token.token) {
    return <>{children}</>; 
  } else {
    console.log("token not found")
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
