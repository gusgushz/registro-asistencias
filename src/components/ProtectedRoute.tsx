import React from "react";
import { Navigate, Outlet } from "react-router";
import { ProtectedRouteProps } from "../models/ProtectedRoutes";

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAllowed,
  redirectPath = "/login",
  requiredRoles,
  rol,
  children,
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  if (requiredRoles && !requiredRoles.includes(rol!)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? children : <Outlet />;
};
