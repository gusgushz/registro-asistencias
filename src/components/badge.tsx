// Badge.tsx
import React from "react";
import { Employee } from "../models/Employee";
import Barcode from "react-barcode";  // Necesitarás instalar una librería de código de barras, por ejemplo, react-barcode
import logo from "../assets/images/Logo.png";
import './bagde.css'

interface BadgeProps {
  employee: Employee;
}

export const Badge = ({employee}: BadgeProps) => {
  return (
    <div className="badge">
      <h1 className="badge-title">Tarjeta de Asistencias</h1>
      <div className="badge-body">
        <div className="badge-logo-container">
          <img src={logo} alt="Logo" className="badge-logo" />
        </div>
        <div className="badge-info">
        <p><strong>Nombre:</strong> {employee.name} {employee.lastname}</p>
          <p><strong>Rol:</strong> {employee.role}</p>
          <p><strong>Número de empleado:</strong> {employee.employeeId}</p>
          <p><strong>Departamento:</strong> {employee.department}</p>
        </div>
      </div>
      <div className="badge-footer">
        {/* Aquí puedes agregar el código de barras */}
        <Barcode value={employee.employeeId.toString()}  width={2} height={40} displayValue={false} />
      </div>
    </div>
  );
};
