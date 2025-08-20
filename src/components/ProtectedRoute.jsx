import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/auth.jsx";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
