// Badge.tsx
import React from "react";
import { Employee } from "../models/Employee";
import Barcode from "react-barcode";  // Necesitarás instalar una librería de código de barras, por ejemplo, react-barcode
import logo from "../assets/images/Logo.png";
import html2canvas from "html2canvas";
import './bagde.css'

interface BadgeProps {
  employee: Employee;
  width?: number; // Optional width prop
  height?: number; // Optional height prop
  // showDownloadButton?: boolean; // Optional prop to show/hide download button
}

export const Badge = ({ employee, width, height}: BadgeProps) => {
  return (
    <div
      className="badge"
      id="badge"
      style={{
        width: width || "300", // Apply width if provided
        height: height || "250", // Apply height if provided
      }}
    >
      <div className="badge-header">

      <h1 className="badge-title">Tarjeta de Asistencias</h1>
      </div>
      <div className="badge-body">
        <div className="badge-logo-container">
          <img src={logo} alt="Logo" className="badge-logo" />
        </div>
        <div className="badge-info">
          <p><strong>Número de empleado:</strong> {employee.userId}</p>
          <p><strong>Nombre:</strong> {employee.name} {employee.lastName}</p>
          <p><strong>Departamento:</strong> {employee.department}</p>
        </div>
      </div>
      <div className="badge-footer">
        {/* Aquí puedes agregar el código de barras */}
        <Barcode value={employee.userId.toString()} width={2} height={40} displayValue={false} />
      </div>
    </div>
  );
};
