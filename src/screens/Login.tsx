import React from "react";
import { useNavigate } from "react-router";

export const Login = () => {
  const navigate = useNavigate();
  const handleLogin = (token: string) => {
    localStorage.setItem("token", token);
    // Redirigir al usuario a la ruta protegida
    navigate({ pathname: "/home" });
  };
  return (
    <div>
      Login
      <button onClick={() => handleLogin("token para ingresar")}>login</button>
    </div>
  );
};
