import { useNavigate } from "react-router";
import logo from "../assets/images/Logo.png";
import logout from "../assets/images/log-out-outline.svg";
import "./Header.css";
import { Employee } from "../models/Employee";

interface HeaderProps {
  employee: Employee;
  buttonId: number;
  setButtonId: (id: number) => void;
}

export const Header = (props: HeaderProps) => {
  const { employee, buttonId, setButtonId } = props;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("employee");
    navigate({ pathname: "/login" });
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo-container">
          <img src={logo} alt="KYGA Technologies Logo" />
        </div>
        <div className="options-container">
          {employee.rol === "ADMIN" ? (
            <div>
              <button onClick={() => setButtonId(1)} className="logout-button">
                <a href="#AdminComp">Espacio de admin</a>
              </button>
              <button onClick={() => setButtonId(2)} className="logout-button">
                <a href="#Assists">Espacio de admin</a>
              </button>
            </div>
          ) : (
            <div>
              <button className="logout-button" onClick={() => setButtonId(2)}>
                Mis asistencias
              </button>

              <br></br>

              <button className="logout-button" onClick={() => setButtonId(1)}>
                Perfil
              </button>
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
