import { useRef } from "react";
import { useNavigate } from "react-router";
import "./Register.css";
import { NewEmployee } from "../models/Employee";
import logo from "../assets/images/Logo.png";
import user from "../assets/images/person-outline.svg";
import password from "../assets/images/lock-closed-outline.svg";
import { postRegister } from "../components/postRegister";

export const Register = () => {
  const navigate = useNavigate();
  let newEmploye: NewEmployee;
  const nameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const departmentRef = useRef<HTMLSelectElement>(null);

  const handleRegister = async (employee: NewEmployee) => {
    const response = await postRegister(employee);
    if (response) {
      localStorage.setItem("employee", JSON.stringify(response));
    } else {
      console.error("Error during registration");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    newEmploye = {
      name: nameRef.current?.value || "",
      lastName: lastnameRef.current?.value || "",
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
      rol: "EMPLEADO",
      department: departmentRef.current?.value || "",
    };
    console.log(JSON.stringify(newEmploye));
    const result = await handleRegister(newEmploye);
    if (result !== null) {
      navigate({ pathname: "/home" });
    } else {
      console.error("Error during registration");
    }
  };

  return (
    <div className="container-register">
      <img src={logo} alt="KYGA Technologies Logo" className="logo" />
      <form className="form-register" onSubmit={handleSubmit}>
        <p>Iniciar Sesión</p>
        <div className="input-container">
          <img src={user} className="input-icon" alt="Empleado" />
          <input type="text" placeholder="Correo" ref={emailRef} />
        </div>
        <div className="input-container">
          <img src={password} className="input-icon" alt="Contraseña" />
          <input type="password" placeholder="Contraseña" ref={passwordRef} />
        </div>
        <div className="input-container">
          <img src={user} className="input-icon" alt="Empleado" />
          <input type="text" placeholder="Nombre" ref={nameRef} />
        </div>
        <div className="input-container">
          <img src={user} className="input-icon" alt="Empleado" />
          <input type="text" placeholder="Apellido" ref={lastnameRef} />
        </div>
        <div className="input-container-options">
          <h3>Departamento</h3>
          <select name="Departamento" id="options" ref={departmentRef}>
            <option value="TI">TI</option>
            <option value="Ventas">Ventas</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>
        <button type="submit">Ingresar</button>
        <a className="password">Olvide mi contraseña</a>
      </form>
    </div>
  );
};
