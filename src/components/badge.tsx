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
  showDownloadButton?: boolean; // Optional prop to show/hide download button
}

export const Badge = ({ employee, width, height, showDownloadButton = true }: BadgeProps) => {
  const handleDownlad = () => {
    const badgeElement = document.getElementById("badge");

    if (badgeElement) {
      html2canvas(badgeElement).then((canvas) => {
        const image = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = image;
        link.download = `badge-${employee.userId}.png`;
        link.click();
      });
    }
  };

  return (
    <div
      className="badge"
      id="badge"
      style={{
        width: width || "auto", // Apply width if provided
        height: height || "auto", // Apply height if provided
      }}
    >
      <h1 className="badge-title">Tarjeta de Asistencias</h1>
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
      {showDownloadButton && <button onClick={handleDownlad}>Descargar Gafete</button>}
    </div>
  );
};
