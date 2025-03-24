import { useNavigate } from "react-router";
import "./Login.css";
import { Employee } from "../models/Employee";
import logo from "../assets/images/Logo.png";
import user from "../assets/images/person-outline.svg";
import password from "../assets/images/lock-closed-outline.svg";
import { Badge } from "../components/badge";

export const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (employee: Employee) => {
    localStorage.setItem("employee", JSON.stringify(employee));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const employee: Employee = {
      employeeId: 2,
      name: "Gustavo",
      lastname: "Hernandez",
      role: "employee",
      department: "TI",
      token: "Token para entrar",
    };
    const admin: Employee = {
      employeeId: 2,
      name: "Gustavo",
      lastname: "Hernandez",
      role: "admin",
      department: "TI",
      token: "Token para entrar",
    };
    await handleLogin(admin);
    navigate({ pathname: "/home" });
  };

  return (
    <div className="container-login">
      <img src={logo} alt="KYGA Technologies Logo" className="logo" />
      <form className="form" onSubmit={handleSubmit}>
        <p>Iniciar Sesión</p>
        <div className="input-container">
          <img src={user} className="input-icon" alt="Empleado" />
          <input type="text" placeholder="Correo" />
        </div>
        <div className="input-container">
          <img src={password} className="input-icon" alt="Contraseña" />
          <input type="password" placeholder="Contraseña" />
        </div>
        <button type="submit">Ingresar</button>
        <a className="password">Olvide mi contraseña</a>
      </form>
      {/* <Badge></Badge> */}
    </div>
  );
};
