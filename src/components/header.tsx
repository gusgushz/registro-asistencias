import { useNavigate } from "react-router";
import logo from "../assets/images/Logo.png";
import logout from "../assets/images/log-out-outline.svg";
import "./Header.css";
import { Employee } from "../models/Employee";

interface HomeProps {
  employee: Employee;
  buttonId: number;
  setButtonId: (buttonId:number) => void;
}
export const Header = (props: HomeProps) => {
  const { employee, buttonId, setButtonId } = props;
  const navigate = useNavigate();

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
