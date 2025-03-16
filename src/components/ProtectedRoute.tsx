import { Navigate, Outlet } from "react-router";

interface ProtectedRouteProps {
  isAllowed: boolean;
  redirectPath?: string;
  requiredRole?: string;
  role?: string;
  children?: React.ReactElement;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAllowed,
  redirectPath = "/login",
  requiredRole,
  role,
  children,
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? children : <Outlet />;
};
