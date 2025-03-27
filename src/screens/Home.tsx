import { useState } from "react";
import { Header, Asistencias, ProfileUserCard} from "../components/index";
import { Employee } from "../models/Employee";
import "./Home.css";

export const Home = () => {
  const [buttonId, setButtonId] = useState<number>(2);
  
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

  return (
    <div className="container">
      <Header employee={employee} buttonId={buttonId} setButtonId={setButtonId} />
      <section className="content">
        {employee.role === "admin" ? (
          <div className="admin-content">
            <h2>Administrador</h2>
            <p>
              Bienvenido {employee.name} {employee.lastname}
            </p>
          </div>
        ) : (
          <div className="employee-content">
            {buttonId == 2 ? (<Asistencias></Asistencias>) : (<ProfileUserCard></ProfileUserCard>)}
          </div>
        )}
      </section>
    </div>
  );
};
