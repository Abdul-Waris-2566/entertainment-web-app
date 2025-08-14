// ProtectedRoute.jsx
// This component checks if the user is authenticated (from Redux)
// If not, it redirects to /login. Otherwise, it renders the child route.
// Usage: Wrap any route element with <ProtectedRoute> to protect it.

import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  // Otherwise, render the child route
  return <Outlet />;
}

export default ProtectedRoute;
