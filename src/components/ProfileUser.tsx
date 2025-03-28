import React from "react";
import logo from "../assets/images/Logo.png";
import "./ProfileUser.css";
import { Employee } from "../models/Employee";

export interface User {
  userId: number;
  name: string;
  lastName: string;
  email: string;
  rol: string;
  department: string;
  assists: Array<{
    id: number;
    fecha: string;
    userId: number;
  }>;
}

export const ProfileUserCard = () => {
  const employee: Employee = JSON.parse(
    localStorage.getItem("employee") || "{}"
  );

  return (
    <div className="asistencia-card">
      <h1 className="card-title">Tarjeta de Asistencia</h1>

      <div className="employee-content">
        <img
          src={logo}
          alt="KYGA Technologies Logo"
          className="employee-logo"
        />
        <div className="employee-info">
          <div className="employee-field">
            <span className="field-label">No. empleado:</span>
            <span className="field-value">
              {employee.userId || "No disponible"}
            </span>
          </div>

          <div className="employee-field">
            <span className="field-label">Nombre:</span>
            <span className="field-value">
              {employee.name
                ? `${employee.name} ${employee.lastName}`
                : "No disponible"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
