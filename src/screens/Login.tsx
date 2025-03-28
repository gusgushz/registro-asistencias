import { useNavigate } from "react-router";
import "./Login.css";
import { Employee, EmployeeToLogin } from "../models/Employee";
import logo from "../assets/images/Logo.png";
import user from "../assets/images/person-outline.svg";
import password from "../assets/images/lock-closed-outline.svg";
import { postLogin } from "../components/postLogin";
import { useRef, useState } from "react";

export const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (employee: Employee) => {
    await localStorage.setItem("employee", JSON.stringify(employee));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const result = await postLogin({
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
    });
    if (!result) {
      return alert("Error en el login");
    } else {
      const employee: Employee = {
        employeeId: result.user.userId,
        name: result.user.name,
        lastName: result.user.lastName,
        rol: result.user.rol,
        token: result.token,
        department: result.user.department,
        email: result.user.email,
        assists: result.user.assists,
      };
      console.log(JSON.stringify(employee));
      setLoading(false);
      await handleLogin(employee);
      await navigate({ pathname: "/home" });
    }
  };

  return (
    <div className="container-login">
      <img src={logo} alt="KYGA Technologies Logo" className="logo" />
      <form className="form" onSubmit={handleSubmit}>
        <p>Iniciar Sesión</p>
        <div className="input-container">
          <img src={user} className="input-icon" alt="Empleado" />
          <input type="text" placeholder="Correo" ref={emailRef} />
        </div>
        <div className="input-container">
          <img src={password} className="input-icon" alt="Contraseña" />
          <input type="password" placeholder="Contraseña" ref={passwordRef} />
        </div>
        <button type="submit" disabled={loading}>
          Ingresar
        </button>
        <a className="password">Olvide mi contraseña</a>
      </form>
    </div>
  );
};
