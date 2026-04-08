import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userStr = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  if (!token || !userStr) {
    return <Navigate to="/" replace />;
  }

  let user;
  try {
    user = JSON.parse(userStr);
  } catch (e) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Determine where to redirect based on their actual role
    if (user.role === "admin") return <Navigate to="/admin" replace />;
    if (user.role === "teacher") return <Navigate to="/teacher/dashboard" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
