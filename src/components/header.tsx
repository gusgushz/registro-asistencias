import { useNavigate } from "react-router";
import logo from "../assets/images/Logo.png";
import logout from "../assets/images/log-out-outline.svg";
import "./Header.css";
import { Employee } from "../models/Employee";

export const Header = () => {
  const navigate = useNavigate();
  let employee: Employee = {
    name: "",
    lastname: "",
    employeeId: 0,
    token: "",
    role: "",
  };

  if (localStorage.getItem("employee") !== null) {
    employee = JSON.parse(localStorage.getItem("employee")!);
  }

  const handleLogout = () => {
    localStorage.removeItem("employee");
    // Redirigir al usuario a la página de inicio de sesión
    navigate({ pathname: "/login" });
  };
  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo-container">
          <img src={logo} alt="KYGA Technologies Logo" />
        </div>
        <div className="options-container">
          {employee.role === "admin" ? (
            <div>
              <button>Espacio de admin</button>
              <button>Espacio de admin</button>
              <button>Espacio de admin</button>
            </div>
          ) : (
            <div>
              <button>Espacio de employee</button>
              <button>Espacio de employee</button>
            </div>
          )}
        </div>
        <div className="logout-container">
          <button onClick={handleLogout} className="logout-button">
            <img src={logout} className="input-icon" alt="logout" />
            Cerrar sesión
          </button>
        </div>
      </nav>
    </header>
  );
};
