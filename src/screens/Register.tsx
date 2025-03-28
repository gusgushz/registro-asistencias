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
  const nameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const departmentRef = useRef<HTMLSelectElement>(null);

  const handleRegister = async (employee: NewEmployee) => {
    if (!employee || !employee.name || !employee.lastName || !employee.email || !employee.password || !employee.department) {
      alert("Por favor, completa todos los campos requeridos.");
    }
    const response = await postRegister(employee);
    if (response) {
      navigate({ pathname: "/home" }, { replace: true });
    } else {
      console.error("Error during registration");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
<<<<<<< HEAD
    const newEmployee = {
=======
    newEmploye = {
      userId: Date.now(), // Generate a unique ID for the user
>>>>>>> 3e90ab398930d2bc166d46631db9e88c56379e62
      name: nameRef.current?.value || "",
      lastName: lastnameRef.current?.value || "",
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
      rol: "EMPLEADO",
      department: departmentRef.current?.value || "",
    };
    console.log(JSON.stringify(newEmployee));
    const result = await handleRegister(newEmployee);
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
            <option value="VENTAS">Ventas</option>
            <option value="ADMINISTRACION">Administración</option>
            <option value="PRODUCCION">Producción</option>
          </select>
        </div>
        <button type="submit">Agregar empleado</button>
      </form>
    </div>
  );
};
