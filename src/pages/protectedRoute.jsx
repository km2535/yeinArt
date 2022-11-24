import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../components/context/AuthContext";

export default function ProtectedRoute({ children, requireAdmin }) {
  const { fbuser } = useAuthContext();
  if (!fbuser || (requireAdmin && !fbuser.isAdmin)) {
    return <Navigate to="/" replace />;
  }
  return children;
}
