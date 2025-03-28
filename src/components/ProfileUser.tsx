import React from "react";
import './ProfileUser.css';
import { Employee } from '../models/Employee';
import { Badge } from './badge';
import html2canvas from "html2canvas";
import downloadIcon from "../assets/images/download-outline.svg";

export const ProfileUserCard = () => {
  const employee: Employee = JSON.parse(localStorage.getItem("employee") || "{}");


  const handleDownlad = () => {
      const badgeElement = document.getElementById("badge");
      const downloadButton = document.querySelector(".download-button")as HTMLElement; // Cast to HTMLElement
  
      if (badgeElement && downloadButton) {
        downloadButton.style.backgroundColor = "white"; // Hide the download button before capturing
        html2canvas(badgeElement).then((canvas) => {
          const image = canvas.toDataURL("image/png");
  
          downloadButton.style.backgroundColor = "";
  
          const link = document.createElement("a");
          link.href = image;
          link.download = `badge-${employee.userId}.png`;
          link.click();
        });
      }
    };
  
    
  return (
    <div className="asistencia-card">
      <div className="asistencia-card-header">
        <div 
          className="download-button" 
          onClick={handleDownlad} 
          style={{ cursor: "pointer", display: "inline-block" }}
        >
          <img 
            src={downloadIcon} 
            alt="Descargar" 
            style={{ width: "35px", height: "35px" }} 
          />
        </div>
      </div>
      <Badge employee={employee} width={700} height={300}></Badge>
    </div>
  );
};
