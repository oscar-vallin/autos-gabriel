import React from 'react';
import {  Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return  currentUser ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;
