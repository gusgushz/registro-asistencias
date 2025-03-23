import React from "react";
import { Navigate, Outlet } from "react-router";
import { ProtectedRouteProps } from "../models/ProtectedRoutes";

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAllowed,
  redirectPath = "/login",
  requiredRoles,
  role,
  children,
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  if (requiredRoles && !requiredRoles.includes(role!)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? children : <Outlet />;
};
