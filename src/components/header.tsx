import React from "react";
import { useNavigate } from "react-router";
export const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    // Redirigir al usuario a la página de inicio de sesión
    navigate({ pathname: "/login" });
  };
  return (
    <header>
      <button onClick={handleLogout}>logout</button>
    </header>
  );
};
