export interface ProtectedRouteProps {
  isAllowed: boolean;
  redirectPath?: string;
  requiredRoles?: string[]; // Array de roles permitidos
  rol?: string; // Rol del usuario actual
  children?: React.ReactElement;
}
