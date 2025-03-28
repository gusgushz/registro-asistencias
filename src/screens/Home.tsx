import { useState } from "react";
import {
  Header,
  Asistencias,
  ProfileUserCard,
  Assists,
  AdminComp,
} from "../components/index";
import { Employee } from "../models/Employee";
import "./Home.css";
import { RegistrarEmpelado } from "../components/RegistrarEmpleado";


export const Home = () => {
  const [buttonId, setButtonId] = useState<number>(1);
  let employee: Employee = {
    name: "",
    lastName: "",
    userId: 0,
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
      <Header
        employee={employee}
        buttonId={buttonId}
        setButtonId={setButtonId}
      />
      <section className="content">
        {employee.rol === "ADMIN" ? (
          <div className="admin-content">
            {buttonId === 1 ? (
              <AdminComp></AdminComp> //adminComp.tsx, empleados 
            ) : buttonId === 2 ? (
              <></>
            ) : buttonId === 3 ? (
              <Assists></Assists> //assists.tsx, Historial de asistencias
            ) : (
              <RegistrarEmpelado></RegistrarEmpelado> //RegistrarEmpleado.tsx, registrar empleado
            )}
          </div>

        ) : (
          <div className="employee-content">
            {buttonId == 2 ? (
              <ProfileUserCard></ProfileUserCard>
            ) : (
              <Asistencias></Asistencias>
            )}
          </div>
        )}
      </section>
    </div>
  );
};
