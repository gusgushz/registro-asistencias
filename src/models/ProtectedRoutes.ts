export interface ProtectedRouteProps {
  isAllowed: boolean;
  redirectPath?: string;
  requiredRoles?: string[]; // Array de roles permitidos
  role?: string; // Rol del usuario actual
  children?: React.ReactElement;
}
