import { useNavigate } from "react-router";
const navigate = useNavigate();

export const handleLogin = (token: string) => {
  localStorage.setItem("token", token);
  // Redirigir al usuario a la ruta protegida
  navigate({ pathname: "/home" });
};

export const handleLogout = () => {
  localStorage.removeItem("token");
  // Redirigir al usuario a la página de inicio de sesión
  navigate({ pathname: "/login" });
};
