import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

/**
 * ProtectedRoute Component
 * Restricts access based on authentication and optional role
 *
 * @param {React.Component} element - Component to render if authorized
 * @param {string} requiredRole - Optional role required (e.g., 'admin', 'user')
 * @param {string} redirectTo - Path to redirect if not authorized (default: '/login')
 */
export default function ProtectedRoute({
  element: Element,
  requiredRole = null,
  redirectTo = '/login',
}) {
  const { isAuthenticated, user } = useAuthStore();

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Check if user has required role (RBAC)
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return Element;
}
