import React from 'react';
import { useApp } from '../context/AppContext';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { state } = useApp();
  const { isAuthenticated, user, pinEntered } = state.auth;

  if (!pinEntered) {
    return <Navigate to="/pin" replace />;
  }

  if (!isAuthenticated) {
    // User is not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // User is authenticated but does not have the required role
    // Redirect to a default authenticated page or show an unauthorized message
    return <Navigate to="/pos" replace />;
  }

  return <Outlet />;
};
