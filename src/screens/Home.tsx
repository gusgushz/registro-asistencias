
import { useState } from "react";
import { Header, Asistencias, ProfileUserCard} from "../components/index";
import { Employee } from "../models/Employee";
import "./Home.css";

export const Home = () => {
  const [buttonId, setButtonId] = useState<number>(1);
  let employee: Employee = {
    name: "",
    lastName: "",
    employeeId: 0,
    token: "",
    rol: "",
    department: "",
    email: "",
    password: "",
  };

    if (localStorage.getItem("employee") !== null) {
      employee = JSON.parse(localStorage.getItem("employee")!);
    }
    console.log("Employee:", employee); 
  return (
    <div className="container">
      <Header employee={employee} buttonId={buttonId} setButtonId={setButtonId} />
      <section className="content">
        {employee.rol === "admin" ? (
          <div className="admin-content">
            {buttonId === 2 ? (
              <Assists></Assists>
            ) : buttonId === 3 ? (
              <></>
            ) : (
              <AdminComp></AdminComp>
            )}
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