import "./App.css";
import logo from "./assets/images/Logo.png";
import { useNavigate } from "react-router";

function App() {
  const navigate = useNavigate();
  return (
    <main className="container">
      <div className="background-wrapper">
        <section className="background"></section>
      </div>
      <section className="content-wrapper">
        <img src={logo} alt="KYGA Technologies Logo" className="logo" />
        <h1 className="title">KYGA Technologies</h1>
        <p className="subtitle">
          Innovando el futuro con soluciones tecnológicas de vanguardia.
        </p>
        <button
          className="button"
          onClick={() => navigate({ pathname: "/login" })}
        >
          Ingresar
        </button>
      </section>
    </main>
  );
}

export default App;
